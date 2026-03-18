import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import clientsData from '../SourceData/clients.json';
import { getServerUrl } from '../config/env';
import './Invoice.css';

const Invoice = () => {
  const [formData, setFormData] = useState({
    clientId: clientsData[0]?.clientId || '',
    invoiceNumber: '',
    dueDate: new Date().toISOString().split('T')[0],
    currency: 'fUSDC-sepolia',
    notes: '',
    items: [{ description: 'Misc', quantity: 1, price: 1 }]
  });

  const [selectedClient, setSelectedClient] = useState(clientsData[0] || null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [invoiceData, setInvoiceData] = useState(null);
  const [creatingInvoice, setCreatingInvoice] = useState(false);
  const [successAlert, setSuccessAlert] = useState({
    show: false,
    message: '',
    copyText: '',
    copied: false,
  });

  // Generate invoice number on component mount
  useEffect(() => {
    const invoiceNumber = `INV-${Date.now()}`;
    setFormData(prev => ({ ...prev, invoiceNumber }));
  }, []);

  // If this tab was opened by Kollect redirect after payment (?status=success), close it so the user stays on the original tab
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'success') {
      window.close();
    }
  }, []);

  useEffect(() => {
    if (typeof window.Kollect === 'undefined') return;
    const initKollect = async () => {
      try {
        const apiBase = getServerUrl();
        const configUrl = apiBase ? `${apiBase}/api/kollect/config` : '/api/kollect/config';
        const paymentEndpoint = apiBase ? `${apiBase}/api/kollect/create-payment` : '/api/kollect/create-payment';

        const r = await fetch(configUrl);
        if (!r.ok) throw new Error('Kollect config unavailable');
        const { kollectSdkUrl } = await r.json();
        if (!kollectSdkUrl) throw new Error('kollectSdkUrl missing');
        window.Kollect.init({
          endpoint: kollectSdkUrl,
          paymentEndpoint,
        });
      } catch (e) {
        console.warn('[Kollect] Init failed (backend needs KOLLECT_BACKEND_URL; set REACT_APP_API_URL when not using dev proxy):', e);
      }
    };
    initKollect();
  }, []);

  // Set up payment success callback
  useEffect(() => {
    window.onKollectPaymentSuccess = (result) => {
      console.log('Payment successful:', result);
      alert('Invoice created successfully! Payment URL opened in new tab.');
      resetForm();
    };
    
    return () => {
      window.onKollectPaymentSuccess = null;
    };
  }, []);

  // Update invoice data whenever form data or selected client changes
  useEffect(() => {
    if (selectedClient && formData.dueDate && formData.items.length > 0) {
      const paymentData = {
        clientEmail: selectedClient.clientEmail,
        clientName: selectedClient.clientName,
        clientWalletAddress: selectedClient.clientWalletAddress[0],
        countryCode: selectedClient.countryCode,
        countryName: selectedClient.countryName,
        dueDate: formData.dueDate,
        currency: formData.currency,
        items: formData.items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          price: item.price
        })),
        notes: formData.notes,
        redirectUrl: window.location.origin + window.location.pathname,
      };
      console.log('Setting invoice data:', paymentData);
      setInvoiceData(paymentData);
    } else {
      console.log('Clearing invoice data - missing required fields');
      setInvoiceData(null);
    }
  }, [selectedClient, formData]);

  // Handle client selection
  const handleClientChange = (clientId) => {
    const client = clientsData.find(c => c.clientId === clientId);
    setSelectedClient(client);
    setFormData(prev => ({ ...prev, clientId }));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle item changes
  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = field === 'quantity' || field === 'price' ? parseFloat(value) || 0 : value;
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  // Add new item
  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, price: 0 }]
    }));
  };

  // Remove item
  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, items: newItems }));
    }
  };

  // Calculate total
  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + (item.quantity * item.price), 0);
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

  const createInvoiceS2S = async () => {
    try {
      if (!selectedClient) {
        setAlertMessage('Please select a client.');
        setShowAlert(true);
        return;
      }
      if (!formData.invoiceNumber || !formData.dueDate) {
        setAlertMessage('Invoice number and due date are required.');
        setShowAlert(true);
        return;
      }
      if (!formData.items?.length) {
        setAlertMessage('At least one item is required.');
        setShowAlert(true);
        return;
      }

      setCreatingInvoice(true);
      setShowAlert(false);
      setAlertMessage('');
      setSuccessAlert({ show: false, message: '', copyText: '', copied: false });

      const apiBase = getServerUrl();
      const endpoint = apiBase
        ? `${apiBase}/api/kollect/s2s/create-payment`
        : '/api/kollect/s2s/create-payment';

      const payload = {
        clientEmail: selectedClient.clientEmail,
        clientName: selectedClient.clientName,
        clientWalletAddress: selectedClient.clientWalletAddress[0],
        countryCode: selectedClient.countryCode,
        countryName: selectedClient.countryName,
        items: formData.items.map((item) => ({
          description: item.description,
          quantity: Number(item.quantity),
          price: Number(item.price),
        })),
        paymentCurrency: formData.currency,
        invoiceCurrency: formData.currency,
        notes: formData.notes || '',
        source: 'merchant-backend',
        interface: 'kollect-server',
        dueDate: formData.dueDate,
        invoiceNumber: formData.invoiceNumber,
        isSelfIncurredFee: true,
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
          'Failed to create invoice';
        throw new Error(msg);
      }

      const paymentUrl =
        data?.response?.data?.paymentUrl ||
        data?.response?.data?.data?.paymentUrl ||
        data?.response?.data?.paymentUrl ||
        data?.data?.paymentUrl ||
        '';

      const copied = await copyToClipboard(paymentUrl);
      setSuccessAlert({
        show: true,
        message: copied
          ? 'Invoice created successfully. Payment URL copied to clipboard.'
          : 'Invoice created successfully.',
        copyText: paymentUrl,
        copied,
      });
      resetForm();
    } catch (e) {
      setAlertMessage(e.message || 'Failed to create invoice');
      setShowAlert(true);
    } finally {
      setCreatingInvoice(false);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      clientId: '',
      invoiceNumber: '',
      dueDate: '',
      currency: 'fUSDC-sepolia',
      notes: '',
      items: [{ description: '', quantity: 1, price: 0 }]
    });
    setSelectedClient(null);
    setShowAlert(false);
    setAlertMessage('');
    setInvoiceData(null);
  };


  return (
    <div className="invoice-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <Card className="invoice-card">
              <Card.Header className="invoice-header">
                <h2 className="mb-0">Create Invoice</h2>
              </Card.Header>
              <Card.Body>
                {successAlert.show && (
                  <Alert variant="success" onClose={() => setSuccessAlert((s) => ({ ...s, show: false }))} dismissible>
                    <div className="d-flex justify-content-between align-items-start gap-3">
                      <div>
                        <div>{successAlert.message}</div>
                        {successAlert.copyText ? (
                          <div className="mt-2">
                            <div className="small text-muted">Payment URL</div>
                            <div style={{ wordBreak: 'break-all' }}>{successAlert.copyText}</div>
                          </div>
                        ) : null}
                      </div>
                      {successAlert.copyText ? (
                        <Button
                          variant="outline-success"
                          size="sm"
                          type="button"
                          onClick={async () => {
                            const ok = await copyToClipboard(successAlert.copyText);
                            setSuccessAlert((s) => ({
                              ...s,
                              copied: ok,
                              message: ok
                                ? 'Invoice created successfully. Payment URL copied to clipboard.'
                                : 'Invoice created successfully. Copy failed — please copy manually.',
                            }));
                          }}
                        >
                          Copy to clipboard
                        </Button>
                      ) : null}
                    </div>
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
                        <Form.Label>Select Client *</Form.Label>
                        <Form.Select
                          name="clientId"
                          value={formData.clientId}
                          onChange={(e) => handleClientChange(e.target.value)}
                          required
                        >
                          <option value="">Choose a client...</option>
                          {clientsData.map((client) => (
                            <option key={client.clientId} value={client.clientId}>
                              {client.clientName} ({client.clientEmail})
                            </option>
                          ))}
                        </Form.Select>
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
                          placeholder="Enter invoice number"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Due Date *</Form.Label>
                        <Form.Control
                          type="date"
                          name="dueDate"
                          value={formData.dueDate}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Currency</Form.Label>
                        <Form.Select
                          name="currency"
                          value={formData.currency}
                          onChange={handleInputChange}
                        >
                          <option value="fUSDC-sepolia">fUSDC-sepolia</option>
                          <option value="USDT-mainnet">USDT-mainnet</option>
                          <option value="USDC-mainnet">USDC-mainnet</option>
                          <option value="USDCn-matic">USDCn-matic</option>
                          <option value="USDT-matic">USDT-matic</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Client Details Display */}
                  {selectedClient && (
                    <Card className="mb-4 client-info-card">
                      <Card.Header>
                        <h5 className="mb-0">Client Information</h5>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <p><strong>Name:</strong> {selectedClient.clientName}</p>
                            <p><strong>Email:</strong> {selectedClient.clientEmail}</p>
                          </Col>
                          <Col md={6}>
                            <p><strong>Country:</strong> {selectedClient.countryName}</p>
                            <p><strong>Wallet:</strong> {selectedClient.clientWalletAddress[0]}</p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  )}

                  {/* Items Section */}
                  <div className="items-section">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5>Invoice Items</h5>
                      <Button variant="outline-primary" size="sm" onClick={addItem}>
                        Add Item
                      </Button>
                    </div>

                    {formData.items.map((item, index) => (
                      <Card key={index} className="mb-3 item-card">
                        <Card.Body>
                          <Row>
                            <Col md={5}>
                              <Form.Group className="mb-2">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Item description"
                                  value={item.description}
                                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={2}>
                              <Form.Group className="mb-2">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group className="mb-2">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={item.price}
                                  onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={2}>
                              <Form.Group className="mb-2">
                                <Form.Label>Total</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={`${(item.quantity * item.price).toFixed(2)}`}
                                  readOnly
                                  className="bg-light"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          {formData.items.length > 1 && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeItem(index)}
                              className="mt-2"
                            >
                              Remove Item
                            </Button>
                          )}
                        </Card.Body>
                      </Card>
                    ))}
                  </div>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Additional notes for the invoice"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Card className="total-card">
                        <Card.Body>
                          <h5>Invoice Total</h5>
                          <h3 className="text-primary">${calculateTotal().toFixed(2)}</h3>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-between mt-4">
                    <Button variant="outline-secondary" onClick={() => window.history.back()}>
                      Cancel
                    </Button>
                    <div className="d-flex gap-2">
                      <Button
                        type="button"
                        variant="primary"
                        onClick={createInvoiceS2S}
                        disabled={creatingInvoice}
                      >
                        {creatingInvoice ? 'Creating…' : 'Create invoice'}
                      </Button>
                      <button
                        type="button"
                        data-kollect-button
                        data-type="pay-kollect"
                        data-variant="basic"
                        data-payment-data={invoiceData ? JSON.stringify(invoiceData) : ''}
                      />
                    </div>
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

export default Invoice;
