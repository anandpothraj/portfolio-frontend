import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { getServerUrl } from '../config/env';
import './Invoice.css';

const TARGET_CURRENCIES = ['USD', 'INR', 'EUR', 'GBP', 'PHP', 'BRL', 'MXN', 'NGN', 'GHS', 'KES'];

const defaultDueDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split('T')[0];
};

const FiatSettlement = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    dueDate: defaultDueDate(),
    amount: 1,
    targetCurrency: 'USD',
    senderWalletAddress: '',
    notes: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [creating, setCreating] = useState(false);
  const [successAlert, setSuccessAlert] = useState({
    show: false,
    message: '',
    paymentUrl: '',
    qrCode: '',
    copied: false,
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, invoiceNumber: `KFS-${Date.now()}` }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = async (text) => {
    if (!text) return false;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) {
      // fall back below
    }
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      return ok;
    } catch (e) {
      return false;
    }
  };

  const resetForm = () => {
    setFormData({
      invoiceNumber: `KFS-${Date.now()}`,
      dueDate: defaultDueDate(),
      amount: 1,
      targetCurrency: 'USD',
      senderWalletAddress: '',
      notes: '',
    });
  };

  const createFiatSettlement = async () => {
    try {
      if (!formData.senderWalletAddress || !/^0x[a-fA-F0-9]{40}$/.test(formData.senderWalletAddress)) {
        setAlertMessage('A valid sender wallet address (0x...) is required.');
        setShowAlert(true);
        return;
      }
      if (!formData.amount || Number(formData.amount) <= 0) {
        setAlertMessage('Amount must be greater than 0.');
        setShowAlert(true);
        return;
      }

      setCreating(true);
      setShowAlert(false);
      setAlertMessage('');
      setSuccessAlert({ show: false, message: '', paymentUrl: '', qrCode: '', copied: false });

      const apiBase = getServerUrl();
      const endpoint = apiBase
        ? `${apiBase}/api/kollect/fiat-settlement/s2s/create-invoice`
        : '/api/kollect/fiat-settlement/s2s/create-invoice';

      const payload = {
        amount: Number(formData.amount),
        targetCurrency: formData.targetCurrency,
        senderWalletAddress: formData.senderWalletAddress,
        invoiceNumber: formData.invoiceNumber,
        dueDate: formData.dueDate,
        notes: formData.notes || '',
      };

      const r = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok || data?.ok === false) {
        const msg =
          data?.data?.error?.message ||
          data?.data?.error?.code ||
          data?.message ||
          'Failed to create fiat settlement';
        throw new Error(msg);
      }

      const paymentUrl =
        data?.response?.data?.paymentUrl ||
        data?.response?.data?.data?.paymentUrl ||
        data?.data?.paymentUrl ||
        '';
      const qrCode =
        data?.response?.data?.qrCode ||
        data?.response?.data?.data?.qrCode ||
        data?.data?.qrCode ||
        '';

      const copied = await copyToClipboard(paymentUrl);
      setSuccessAlert({
        show: true,
        message: copied
          ? 'Fiat settlement created. Payment URL copied to clipboard.'
          : 'Fiat settlement created.',
        paymentUrl,
        qrCode,
        copied,
      });
      resetForm();
    } catch (e) {
      setAlertMessage(e.message || 'Failed to create fiat settlement');
      setShowAlert(true);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="invoice-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <Card className="invoice-card">
              <Card.Header className="invoice-header">
                <h2 className="mb-0">Create Fiat Settlement</h2>
              </Card.Header>
              <Card.Body>
                <Alert variant="warning">
                  The sender wallet must already be <strong>KYC-approved with Mesta</strong> before a
                  settlement can complete — Kollect only looks senders up by wallet address, it cannot
                  register new ones. This form will still create the settlement record, but it will
                  stall (or fail) if the sender isn&apos;t already approved.
                </Alert>

                {successAlert.show && (
                  <Alert variant="success" onClose={() => setSuccessAlert((s) => ({ ...s, show: false }))} dismissible>
                    <div>{successAlert.message}</div>
                    {successAlert.paymentUrl ? (
                      <div className="mt-2">
                        <div className="small text-muted">Payment URL</div>
                        <div style={{ wordBreak: 'break-all' }}>{successAlert.paymentUrl}</div>
                      </div>
                    ) : null}
                    {successAlert.qrCode ? (
                      <div className="mt-3">
                        <img
                          alt="Settlement deposit QR code"
                          style={{ maxWidth: 200 }}
                          src={
                            successAlert.qrCode.startsWith('data:')
                              ? successAlert.qrCode
                              : `data:image/png;base64,${successAlert.qrCode}`
                          }
                        />
                      </div>
                    ) : null}
                    {successAlert.paymentUrl ? (
                      <Button
                        className="mt-2"
                        variant="outline-success"
                        size="sm"
                        type="button"
                        onClick={async () => {
                          const ok = await copyToClipboard(successAlert.paymentUrl);
                          setSuccessAlert((s) => ({
                            ...s,
                            copied: ok,
                            message: ok
                              ? 'Fiat settlement created. Payment URL copied to clipboard.'
                              : 'Fiat settlement created. Copy failed — please copy manually.',
                          }));
                        }}
                      >
                        Copy to clipboard
                      </Button>
                    ) : null}
                  </Alert>
                )}
                {showAlert && (
                  <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                  </Alert>
                )}

                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Sender Wallet Address *</Form.Label>
                        <Form.Control
                          type="text"
                          name="senderWalletAddress"
                          value={formData.senderWalletAddress}
                          onChange={handleInputChange}
                          placeholder="0x..."
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Invoice Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="invoiceNumber"
                          value={formData.invoiceNumber}
                          onChange={handleInputChange}
                          placeholder="Auto-generated if left blank"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Amount (stablecoin) *</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          step="0.01"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Target Currency</Form.Label>
                        <Form.Select
                          name="targetCurrency"
                          value={formData.targetCurrency}
                          onChange={handleInputChange}
                        >
                          {TARGET_CURRENCIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="dueDate"
                          value={formData.dueDate}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Additional notes for this settlement"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-between mt-4">
                    <Button variant="outline-secondary" onClick={() => window.history.back()}>
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={createFiatSettlement}
                      disabled={creating}
                    >
                      {creating ? 'Creating…' : 'Create fiat settlement'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiatSettlement;
