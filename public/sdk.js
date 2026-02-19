(function () {
  const Kollect = {
    async init({ apiKey, endpoint }) {
      this.apiKey = apiKey;
      this.endpoint = endpoint;

      try {
        // Create DPoP key pair first for session authentication
        await this.createDpopKeyPair();
        console.info("[Kollect SDK] DPoP key pair created for secure authentication");
        // Initialize button styles and functionality
        this.initButtons();
      } catch (err) {
        console.error("[Kollect SDK] Network/auth error", err);
        alert("Unable to authenticate. Please check your network or contact support.");
      }
    },

    // ---- fetch with timeout / abort ----
    async fetchWithTimeout(resource, options = {}, timeoutMs = 12000) {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const res = await fetch(resource, { ...options, signal: controller.signal });
        return res;
      } finally {
        clearTimeout(id);
      }
    },

    initButtons() {
      // Inject CSS styles
      this.injectStyles();

      // Find and enhance all Kollect buttons
      const buttons = document.querySelectorAll('[data-kollect-button]');
      buttons.forEach(button => this.enhanceButton(button));
    },

    injectStyles() {
      if (document.getElementById('kollect-sdk-styles')) return;

      const style = document.createElement('style');
      style.id = 'kollect-sdk-styles';
      style.textContent = `
        /* Kollect Button Base Styles */
        [data-kollect-button] {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease-in-out;
          position: relative;
          overflow: hidden;
          width: 200px;
          height: 76px;
          padding: 15px 10px;
          font-size: 16px;
          min-width: 200px;
          min-height: 76px;
        }

        /* Enhanced React Button Styles */
        [data-kollect-button].kollect-btn-enhanced {
          width: 200px;
          height: 76px;
          padding: 15px 10px;
          min-width: 200px;
          min-height: 76px;
        }

        /* Loading state for images */
        [data-kollect-button] img {
          display: block;
          max-width: 100%;
          height: auto;
        }

        /* Ensure content doesn't collapse while loading */
        .kollect-btn-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 100%;
          min-height: 44px;
        }

        /* Loading placeholder for icons */
        .kollect-btn-icon,
        .kollect-btn-logo,
        .kollect-btn-logo-only,
        .kollect-btn-pay-text {
          min-width: 42px;
          min-height: 42px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Hide placeholder when image loads */
        .kollect-btn-icon[src],
        .kollect-btn-logo[src],
        .kollect-btn-logo-only[src],
        .kollect-btn-pay-text[src] {
          background: none;
        }

        [data-kollect-button]:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        [data-kollect-button]:not(:disabled):hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        [data-kollect-button]:not(:disabled):active {
          transform: translateY(0);
        }

        /* Type Variants */
        [data-kollect-button][data-type="pay-kollect"] {
          width: 300px;
          gap: 20px;
        }

        [data-kollect-button][data-type="kollect"] {
          width: 200px;
          gap: 20px;
        }

        /* Variant Styles */
        [data-kollect-button][data-variant="basic"] {
          background: linear-gradient(90deg, rgba(237, 8, 251, 0.5) 0%, rgba(1, 207, 255, 0.5) 100%);
          color: #333;
          border: 1px solid rgba(237, 8, 251, 0.3);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        [data-kollect-button][data-variant="light"] {
          background: #FFFFFF;
          color: #495057;
          border: 1px solid rgba(237, 8, 251, 0.15);
        }

        [data-kollect-button][data-variant="dark"] {
          background: #000000;
          color: #FFFFFF;
          border: 1px solid rgba(237, 8, 251, 0.4);
        }

        [data-kollect-button][data-type="kollect"] .kollect-btn-content {
          justify-content: space-around;
          gap: 12px;
        }

        .kollect-btn-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .kollect-btn-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .kollect-btn-icon {
          width: 42px;
          height: 42px;
          object-fit: contain;
        }

        .kollect-btn-logo {
          height: 42px;
          width: 42px;
          object-fit: contain;
        }

        .kollect-btn-logo-only {
          height: 42px;
          width: 42px;
          object-fit: contain;
        }

        .kollect-btn-text {
          font-weight: 600;
          white-space: nowrap;
          font-size: 35px;
          letter-spacing: 0.5px;
          color: black;
        }

        .kollect-btn-pay-text {
          height: 42px;
          width: 42px;
          object-fit: contain;
        }

        /* Dark variant specific adjustments */
        [data-kollect-button][data-variant="dark"] .kollect-btn-icon {
          filter: none;
        }

        [data-kollect-button][data-variant="dark"] .kollect-btn-pay-text {
          filter: brightness(0) invert(1);
        }

        [data-kollect-button][data-variant="dark"] .kollect-btn-text {
          background: linear-gradient(90deg, rgba(237, 8, 251, 1) 0%, rgba(1, 207, 255, 1) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          [data-kollect-button] {
            width: 100%;
            max-width: 300px;
          }

          [data-kollect-button][data-type="kollect"] {
            max-width: 200px;
          }
        }

        /* Focus styles for accessibility */
        [data-kollect-button]:focus {
          outline: 2px solid rgba(237, 8, 251, 0.5);
          outline-offset: 2px;
        }

        /* Modal Styles */
        .kollect-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .kollect-modal-overlay.show {
          opacity: 1;
          visibility: visible;
        }

        .kollect-modal-content {
          background: white;
          border-radius: 12px;
          padding: 32px;
          max-width: 400px;
          width: 90%;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          transform: scale(0.9);
          transition: transform 0.3s ease;
        }

        .kollect-modal-overlay.show .kollect-modal-content {
          transform: scale(1);
        }

        .kollect-modal-title {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin-bottom: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        .kollect-modal-message {
          font-size: 16px;
          color: #666;
          margin-bottom: 24px;
          line-height: 1.5;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        .kollect-loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #ed08fb;
          border-radius: 50%;
          animation: kollect-spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes kollect-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .kollect-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.2s ease;
        }

        .kollect-modal-close:hover {
          background-color: #f5f5f5;
          color: #333;
        }

        /* Dark theme support */
        @media (prefers-color-scheme: dark) {
          .kollect-modal-content {
            background: #1a1a1a;
            color: white;
          }
          
          .kollect-modal-title {
            color: white;
          }
          
          .kollect-modal-message {
            color: #ccc;
          }
          
          .kollect-modal-close {
            color: #ccc;
          }
          
          .kollect-modal-close:hover {
            background-color: #333;
            color: white;
          }
        }
      `;

      document.head.appendChild(style);
    },

    // Modal functionality
    showModal(title, message, showSpinner = true) {
      // Remove existing modal if any
      this.hideModal();

      const modalOverlay = document.createElement('div');
      modalOverlay.className = 'kollect-modal-overlay';
      modalOverlay.id = 'kollect-modal';

      const modalContent = document.createElement('div');
      modalContent.className = 'kollect-modal-content';

      const closeButton = document.createElement('button');
      closeButton.className = 'kollect-modal-close';
      closeButton.innerHTML = '×';
      closeButton.onclick = () => this.hideModal();

      const titleElement = document.createElement('h2');
      titleElement.className = 'kollect-modal-title';
      titleElement.textContent = title;

      const messageElement = document.createElement('p');
      messageElement.className = 'kollect-modal-message';
      messageElement.textContent = message;

      modalContent.appendChild(closeButton);
      modalContent.appendChild(titleElement);
      modalContent.appendChild(messageElement);

      if (showSpinner) {
        const spinner = document.createElement('div');
        spinner.className = 'kollect-loading-spinner';
        modalContent.insertBefore(spinner, messageElement);
      }

      modalOverlay.appendChild(modalContent);
      document.body.appendChild(modalOverlay);

      // Trigger animation
      setTimeout(() => {
        modalOverlay.classList.add('show');
      }, 10);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    },

    stopPolling() {
      this.isPolling = false;
      if (this.pollingTimeout) {
        clearTimeout(this.pollingTimeout);
        this.pollingTimeout = null;
      }
      console.info("[Kollect SDK] Polling stopped");
    },

    hideModal() {
      // Check if polling is active and user is manually closing
      if (this.isPolling) {
        this.stopPolling();
        this.updateModalContent(
          "Payment Declined",
          "You have cancelled the payment process.",
          false
        );
        // Auto-hide modal after 3 seconds
        setTimeout(() => {
          this.hideModal();
        }, 3000);
        return;
      }

      const modal = document.getElementById('kollect-modal');
      if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
          if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
          }
        }, 300);
      }
      // Restore body scroll
      document.body.style.overflow = '';
    },

    updateModalContent(title, message, showSpinner = true) {
      const modal = document.getElementById('kollect-modal');
      if (modal) {
        const titleElement = modal.querySelector('.kollect-modal-title');
        const messageElement = modal.querySelector('.kollect-modal-message');
        const spinner = modal.querySelector('.kollect-loading-spinner');

        if (titleElement) titleElement.textContent = title;
        if (messageElement) messageElement.textContent = message;

        if (showSpinner && !spinner) {
          const newSpinner = document.createElement('div');
          newSpinner.className = 'kollect-loading-spinner';
          modal.querySelector('.kollect-modal-content').insertBefore(newSpinner, messageElement);
        } else if (!showSpinner && spinner) {
          spinner.remove();
        }
      }
    },

    extractPaymentIdFromUrl(paymentUrl) {
      try {
        // Extract payment ID from URL like: https://kollect.kreatorverse.com/kollect/payment/f9166339-b039-4beb-b34e-f12a9639fba8
        const url = new URL(paymentUrl);
        const pathParts = url.pathname.split('/');
        const paymentId = pathParts[pathParts.length - 1];
        
        // Validate that it looks like a UUID
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(paymentId)) {
          return paymentId;
        }
        
        console.warn("[Kollect SDK] Invalid payment ID format:", paymentId);
        return null;
      } catch (error) {
        console.error("[Kollect SDK] Failed to extract payment ID from URL:", error);
        return null;
      }
    },

    async pollPaymentStatus(paymentId, maxAttempts = 60, intervalMs = 5000) {
      let attempts = 0;
      this.isPolling = true;
      
      const poll = async () => {
        // Check if polling was stopped (user closed modal)
        if (!this.isPolling) {
          console.info("[Kollect SDK] Polling stopped by user");
          return;
        }

        try {
          attempts++;
          
          // Update modal to show polling status
          this.updateModalContent(
            "Checking Payment Status",
            `Verifying payment completion... (${attempts}/${maxAttempts})`,
            true
          );

          // Create DPoP proof for status check
          const dpopProof = await this.createDpopProof('GET', `${this.endpoint}/sdk/status/${paymentId}`);

          const response = await this.fetchWithTimeout(`${this.endpoint}/sdk/status/${paymentId}`, {
            method: 'GET',
            headers: {
              'DPoP': dpopProof
            }
          }, 10000);

          if (!response.ok) {
            throw new Error(`Status check failed: ${response.status}`);
          }

          const statusData = await response.json();
          
          // Check if payment is completed (handle multiple possible status values)
          if (statusData.status === 'completed' || 
              statusData.status === 'paid' || 
              statusData.status === 'success' ||
              statusData.status === 'successful' ||
              statusData.paymentStatus === 'completed' ||
              statusData.paymentStatus === 'paid') {
            
            this.stopPolling();
            this.updateModalContent(
              "Payment Successful!",
              "Your payment has been processed successfully.",
              false
            );
            
            // Call success callback if available
            if (window.onKollectPaymentSuccess) {
              window.onKollectPaymentSuccess(statusData);
            }
            
            // Hide modal after 3 seconds
            setTimeout(() => this.hideModal(), 3000);
            return;
          }
          
          // Check if payment failed (handle multiple possible status values)
          if (statusData.status === 'failed' || 
              statusData.status === 'cancelled' || 
              statusData.status === 'canceled' ||
              statusData.status === 'declined' ||
              statusData.status === 'rejected' ||
              statusData.paymentStatus === 'failed' ||
              statusData.paymentStatus === 'cancelled') {
            
            this.stopPolling();
            this.updateModalContent(
              "Payment Failed",
              statusData.message || statusData.error || "Payment was not completed successfully.",
              false
            );
            
            // Hide modal after 5 seconds
            setTimeout(() => this.hideModal(), 5000);
            return;
          }
          
          // Check if payment is still pending/processing
          if (statusData.status === 'pending' || 
              statusData.status === 'processing' || 
              statusData.status === 'in_progress' ||
              statusData.status === 'waiting' ||
              statusData.paymentStatus === 'pending' ||
              statusData.paymentStatus === 'processing') {
            
            // Continue polling - don't change modal content, just continue
            if (attempts < maxAttempts && this.isPolling) {
              this.pollingTimeout = setTimeout(poll, intervalMs);
            } else {
              // Max attempts reached while still pending
              this.stopPolling();
              this.updateModalContent(
                "Payment Still Processing",
                "Payment is taking longer than expected. Please check your payment history or contact support.",
                false
              );
              
              // Keep modal open for manual checking
              // Don't auto-hide since payment might still be processing
            }
            return;
          }
          
          // Continue polling for any other status (unknown status)
          if (attempts < maxAttempts && this.isPolling) {
            this.pollingTimeout = setTimeout(poll, intervalMs);
          } else {
            // Max attempts reached with unknown status
            this.stopPolling();
            this.updateModalContent(
              "Payment Status Unknown",
              "Unable to verify payment status. Please check your payment history or contact support.",
              false
            );
            
            // Keep modal open for manual checking
            // Don't auto-hide since we don't know the final status
          }
          
        } catch (error) {
          console.error("[Kollect SDK] Payment status polling error:", error);
          
          if (attempts < maxAttempts && this.isPolling) {
            // Retry after a longer interval on error
            this.pollingTimeout = setTimeout(poll, intervalMs * 2);
          } else {
            this.stopPolling();
            this.updateModalContent(
              "Status Check Failed",
              "Unable to verify payment status. Please check your payment history or contact support.",
              false
            );
            
            // Hide modal after 5 seconds
            setTimeout(() => this.hideModal(), 5000);
          }
        }
      };

      // Start polling
      poll();
    },

    enhanceButton(button) {
      const type = button.getAttribute('data-type') || 'kollect';
      const variant = button.getAttribute('data-variant') || 'basic';

      // Set default attributes if not present
      if (!button.hasAttribute('data-type')) {
        button.setAttribute('data-type', type);
      }
      if (!button.hasAttribute('data-variant')) {
        button.setAttribute('data-variant', variant);
      }

      // Utilities to build DOM safely
      const img = (src, alt, cls) => {
        const i = document.createElement('img');
        i.src = src;
        i.alt = alt;
        i.className = cls;
        return i;
      };
      const spanText = (text, cls) => {
        const s = document.createElement('span');
        s.className = cls;
        s.textContent = text;
        return s;
      };
      const div = cls => {
        const d = document.createElement('div');
        if (cls) d.className = cls;
        return d;
      };

      const buildPayKollectContent = () => {
        const content = div('kollect-btn-content');
        const left = div('kollect-btn-left');
        const right = div('kollect-btn-right');

        const usdIconSrc =
          variant === 'dark'
            ? 'https://res.cloudinary.com/djncgl9p3/image/upload/v1759833344/fi_14446278_aasybn.svg'
            : 'https://res.cloudinary.com/djncgl9p3/image/upload/v1759833320/USD_Coin_USDC_sd1ivo.svg';

        left.appendChild(img(usdIconSrc, 'USD', 'kollect-btn-icon'));
        left.appendChild(img('https://res.cloudinary.com/djncgl9p3/image/upload/v1759833362/Pay_with_xeru6d.svg', 'Pay with', 'kollect-btn-pay-text'));

        const logoSrc =
          variant === 'black-and-white'
            ? 'https://res.cloudinary.com/djncgl9p3/image/upload/v1759906362/73AOXU_1_o2lnvf.svg'
            : 'https://res.cloudinary.com/djncgl9p3/image/upload/v1759833303/73AOXU_n3nt8j.svg';

        right.appendChild(img(logoSrc, 'Kollect', 'kollect-btn-logo'));
        right.appendChild(spanText('Kollect', 'kollect-btn-text'));

        content.appendChild(left);
        content.appendChild(right);
        return content;
      };

      const buildKollectOnlyContent = () => {
        const content = div('kollect-btn-content');
        const logoSrc =
          variant === 'black-and-white'
            ? 'https://res.cloudinary.com/djncgl9p3/image/upload/v1759906362/73AOXU_1_o2lnvf.svg'
            : 'https://res.cloudinary.com/djncgl9p3/image/upload/v1759833303/73AOXU_n3nt8j.svg';
        content.appendChild(img(logoSrc, 'Kollect', 'kollect-btn-logo-only'));
        content.appendChild(spanText('Kollect', 'kollect-btn-text'));
        return content;
      };

      // Check if button has payment data attribute (React button)
      const hasPaymentData = button.hasAttribute('data-payment-data');

      // Clear & rebuild content only when we are responsible for content
      const replaceContent = (newContent) => {
        while (button.firstChild) button.removeChild(button.firstChild);
        button.appendChild(newContent);
      };

      if (hasPaymentData) {
        // React button with payment data, enhance it
        button.classList.add('kollect-btn-enhanced');

        // Build content safely (no innerHTML)
        const content = (type === 'pay-kollect') ? buildPayKollectContent() : buildKollectOnlyContent();
        replaceContent(content);

        // Click handler using the payment data
        button.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleButtonClick(button);
        });

        return;
      }

      // Vanilla HTML button with its own content — only add classes/handler
      if (button.innerHTML.trim() !== '') {
        button.classList.add('kollect-btn-enhanced');
        button.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleButtonClick(button);
        });
        return;
      }

      // Empty vanilla button -> we provide the safe markup
      button.classList.add('kollect-btn-enhanced');
      const content = (type === 'pay-kollect') ? buildPayKollectContent() : buildKollectOnlyContent();
      replaceContent(content);

      // Click handler
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleButtonClick(button);
      });
    },

    handleButtonClick(button) {
      if (!this.dpopKeyPair) {
        alert("DPoP key pair not found. Please initialize the SDK first.");
        return;
      }

      // Get payment data from button attributes or global function
      const paymentData = this.getPaymentData(button);

      if (!paymentData) {
        alert("Payment data is required. Please provide payment information.");
        return;
      }

      // Validate required fields
      const requiredFields = ['clientEmail', 'clientName', 'clientWalletAddress', 'countryCode', 'countryName', 'currency', 'items'];
      const missingFields = requiredFields.filter(field => !paymentData[field]);

      if (missingFields.length > 0) {
        alert(`Missing required fields: ${missingFields.join(', ')}`);
        return;
      }

      if (!paymentData.items || paymentData.items.length === 0) {
        alert("At least one item is required for the invoice.");
        return;
      }

      // Show modal with loading state
      this.showModal(
        "Paying through Kollect",
        "Preparing your payment...",
        true
      );

      this.createInvoice(paymentData);
    },

    getPaymentData(button) {
      // Try to get data from button attributes
      const dataAttr = button.getAttribute('data-payment-data');
      if (dataAttr && dataAttr.trim() !== '') {
        try {
          return JSON.parse(dataAttr);
        } catch (e) {
          console.error('[Kollect SDK] Invalid payment data JSON:', e);
          console.error('[Kollect SDK] Raw data:', dataAttr);
        }
      }
    },

    async createInvoice(paymentData) {
      const payload = {
        clientEmail: paymentData.clientEmail,
        clientName: paymentData.clientName,
        dueDate: paymentData.dueDate || new Date().toISOString().split("T")[0],
        invoiceNumber: `INV-${Date.now()}`,
        clientWalletAddress: paymentData.clientWalletAddress,
        countryCode: paymentData.countryCode,
        countryName: paymentData.countryName,
        items: paymentData.items || [],
        paymentCurrency: paymentData.currency,
        invoiceCurrency: paymentData.currency,
        notes: paymentData.notes || "",
        source: encodeURIComponent(paymentData.source || window.location.origin),
        isSelfIncurredFee: "false",
      };

      try {
        // Update modal to show authentication step
        this.updateModalContent(
          "Paying through Kollect",
          "Authenticating with Kollect...",
          true
        );

        // Mint a session token for this payment
        const sessionToken = await this.mintSessionToken('invoice');

        // Update modal to show invoice creation step
        this.updateModalContent(
          "Paying through Kollect",
          "Creating your invoice...",
          true
        );

        // Create DPoP proof for invoice creation
        const dpopProof = await this.createDpopProof('POST', `${this.endpoint}/sdk/create/dPopProof/invoice`, sessionToken);

        // Generate idempotency key
        const idempotencyKey = crypto.randomUUID();

        const res = await this.fetchWithTimeout(`${this.endpoint}/sdk/invoice/invoiceWithPayment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionToken}`,
            "DPoP": dpopProof,
            "X-Idempotency-Key": idempotencyKey
          },
          body: JSON.stringify(payload),
        }, 15000);

        if (!res.ok) {
          const errorResponse = await res.text();
          console.error("[Kollect SDK] Invoice creation failed", res.status, errorResponse);
          this.updateModalContent(
            "Payment Failed",
            "Invoice creation failed. Please check the details and try again.",
            false
          );
          // Auto-hide modal after 3 seconds on error
          setTimeout(() => this.hideModal(), 3000);
          return;
        }

        const result = await res.json();

        if (result?.status && result?.data?.paymentUrl) {
          // Update modal to show redirect message
          this.updateModalContent(
            "Redirecting to Kollect",
            "Opening payment page in a new tab...",
            true
          );

          const redirectUrl = encodeURIComponent(paymentData.redirectUrl || window.location.origin);
          const fullUrl = `${result.data.paymentUrl}?redirect=${redirectUrl}`;

          // Reverse-tabnabbing + privacy
          const newWin = window.open(fullUrl, "_blank", "noopener,noreferrer");
          if (newWin) {
            newWin.opener = null;
          }

          // Extract payment ID from the payment URL
          const paymentId = this.extractPaymentIdFromUrl(result.data.paymentUrl);
          
          if (paymentId) {
            console.info("[Kollect SDK] Extracted payment ID:", paymentId);
            
            // Update modal to show waiting message
            this.updateModalContent(
              "Payment in Progress",
              "Please complete your payment in the new tab. We'll verify the status automatically...",
              true
            );

            // Start polling after 10 seconds
            setTimeout(() => {
              this.pollPaymentStatus(paymentId);
            }, 10000);
          } else {
            console.error("[Kollect SDK] Failed to extract payment ID from URL:", result.data.paymentUrl);
            this.updateModalContent(
              "Payment Error",
              "Unable to track payment status. Please complete your payment in the new tab.",
              false
            );
            
            // Keep modal open for manual completion
            // Don't auto-hide since we can't track status
          }
        } else {
          console.warn("[Kollect SDK] Unexpected response format", result);
          this.updateModalContent(
            "Payment Error",
            "Payment URL not returned. Please try again.",
            false
          );
          // Auto-hide modal after 3 seconds on error
          setTimeout(() => this.hideModal(), 3000);
        }
      } catch (e) {
        if (e?.name === 'AbortError') {
          this.updateModalContent(
            "Network Timeout",
            "Please check your connection and try again.",
            false
          );
        } else {
          console.error("[Kollect SDK] Payment processing error", e);
          this.updateModalContent(
            "Payment Error",
            "An error occurred while processing payment. Please try again.",
            false
          );
        }
        // Auto-hide modal after 3 seconds on error
        setTimeout(() => this.hideModal(), 3000);
      }
    },

    async createDpopKeyPair() {
      try {
        // Generate an ephemeral ECDSA key pair for DPoP
        const keyPair = await crypto.subtle.generateKey(
          {
            name: "ECDSA",
            namedCurve: "P-256", // P-256 is commonly used for DPoP
          },
          false, // NOT extractable (prevents export & exfiltration)
          ["sign", "verify"] // key usages
        );

        // Store the key pair for later use
        this.dpopKeyPair = keyPair;

        console.info("[Kollect SDK] DPoP key pair generated successfully");
        return keyPair;
      } catch (error) {
        console.error("[Kollect SDK] Failed to generate DPoP key pair:", error);
        throw new Error("Failed to generate DPoP key pair");
      }
    },

    async createDpopProof(method, url, accessToken = null) {
      if (!this.dpopKeyPair) {
        throw new Error("DPoP key pair not found. Call createDpopKeyPair() first.");
      }

      try {
        // Create the DPoP proof header
        const header = {
          typ: "dpop+jwt",
          alg: "ES256",
          jwk: await crypto.subtle.exportKey("jwk", this.dpopKeyPair.publicKey)
        };

        // Create the DPoP proof payload
        const now = Math.floor(Date.now() / 1000);
        const payload = {
          iat: now,
          jti: crypto.randomUUID(),
          htm: method.toUpperCase(),
          htu: url
        };

        // Add ath (access token hash) if access token is provided
        if (accessToken) {
          const tokenHash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(accessToken));
          payload.ath = this.arrayBufferToBase64Url(tokenHash);
        }

        // Create the JWT
        const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
        const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
        const unsignedToken = `${encodedHeader}.${encodedPayload}`;

        // Sign the JWT
        const signature = await crypto.subtle.sign(
          {
            name: "ECDSA",
            hash: "SHA-256"
          },
          this.dpopKeyPair.privateKey,
          new TextEncoder().encode(unsignedToken)
        );

        const encodedSignature = this.arrayBufferToBase64Url(signature);
        const dpopProof = `${unsignedToken}.${encodedSignature}`;

        console.info("[Kollect SDK] DPoP proof created successfully");
        return dpopProof;
      } catch (error) {
        console.error("[Kollect SDK] Failed to create DPoP proof:", error);
        throw new Error("Failed to create DPoP proof");
      }
    },

    arrayBufferToBase64Url(buffer) {
      const bytes = new Uint8Array(buffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    },

    base64UrlEncode(str) {
      return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    },

    async mintSessionToken(intent = 'invoice') {
      if (!this.dpopKeyPair) {
        throw new Error("DPoP key pair not found. Please initialize the SDK first.");
      }

      try {
        const sessionPayload = {
          apiKey: this.apiKey,
          origin: window.location.origin,
          intent: intent,
          timestamp: Date.now()
        };

        // Create DPoP proof for session creation
        const dpopProof = await this.createDpopProof('POST', `${this.endpoint}/sdk/create/dPopProof/session`);

        // Calling API to Create session token (with timeout)
        const response = await this.fetchWithTimeout(`${this.endpoint}/sdk/create/session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'DPoP': dpopProof
          },
          body: JSON.stringify(sessionPayload)
        }, 12000);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("[Kollect SDK] Session creation failed", response.status, errorText);
          throw new Error(`Session creation failed: ${response.status}`);
        }

        const result = await response.json();
        if (!result?.sessionToken) {
          throw new Error("Session token not found in response");
        }

        console.info("[Kollect SDK] Session token minted successfully");
        return result.sessionToken;
      } catch (error) {
        if (error?.name === 'AbortError') {
          console.error("[Kollect SDK] Session mint timeout");
        } else {
          console.error("[Kollect SDK] Failed to mint session token:", error);
        }
        throw error;
      }
    }
  };

  window.Kollect = Kollect;
})();
