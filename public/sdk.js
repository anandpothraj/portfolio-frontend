(function () {
    const Kollect = {
      async init({ apiKey, secretKey }) {
        this.apiKey = apiKey;
        this.secretKey = secretKey;
        this.endpoint = "https://zapnow-backend-npzgd.ondigitalocean.app";
  
        try {
          const tokenRes = await fetch(`${this.endpoint}/firebase/auth/getCustomToken`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey, secretKey }),
          });
  
          if (!tokenRes.ok) {
            const errorText = await tokenRes.text();
            let errorMsg = `[Kollect SDK] Server responded with status ${tokenRes.status}`;
  
            switch (tokenRes.status) {
              case 401:
                errorMsg += " – Unauthorized. Invalid API key or secret.";
                break;
              case 403:
                errorMsg += " – Forbidden. You do not have access.";
                break;
              case 400:
                errorMsg += " – Bad Request. Please check input fields.";
                break;
              case 500:
                errorMsg += " – Server error. Try again later.";
                break;
              default:
                errorMsg += " – Unexpected error.";
            }
  
            console.error(errorMsg, errorText);
            alert("Authentication failed. Please verify your API credentials.");
            return;
          }
  
          const json = await tokenRes.json();
          if (!json?.data?.token) {
            console.error("[Kollect SDK] Missing token in response", json);
            alert("Authentication failed. Server response did not contain a token.");
            return;
          }
  
          this.authToken = json.data.token;
          console.info("[Kollect SDK] Authentication successful");
          
          // Initialize button styles and functionality
          this.initButtons();
  
        } catch (err) {
          console.error("[Kollect SDK] Network/auth error", err);
          alert("Unable to authenticate. Please check your network or contact support.");
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
        `;
        
        document.head.appendChild(style);
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
        
        // Check if button has payment data attribute (React button)
        const hasPaymentData = button.hasAttribute('data-payment-data');
        
        if (hasPaymentData) {
          // This is a React button with payment data, enhance it
          button.classList.add('kollect-btn-enhanced');
          
          // Clear existing content and add Kollect content
          button.innerHTML = '';
          
          // Create button content based on type
          if (type === 'pay-kollect') {
            button.innerHTML = `
              <div class="kollect-btn-content">
                <div class="kollect-btn-left">
                  <img 
                    src="${variant === 'dark' 
                      ? 'https://res.cloudinary.com/djncgl9p3/image/upload/v1759833344/fi_14446278_aasybn.svg'
                      : 'https://res.cloudinary.com/djncgl9p3/image/upload/v1759833320/USD_Coin_USDC_sd1ivo.svg'
                    }" 
                    alt="USD" 
                    class="kollect-btn-icon"
                  />
                  <img 
                    src="https://res.cloudinary.com/djncgl9p3/image/upload/v1759833362/Pay_with_xeru6d.svg" 
                    alt="Pay with" 
                    class="kollect-btn-pay-text"
                  />
                </div>
                <div class="kollect-btn-right">
                  <img 
                    src="https://res.cloudinary.com/djncgl9p3/image/upload/v1759833303/73AOXU_n3nt8j.svg" 
                    alt="Kollect" 
                    class="kollect-btn-logo"
                  />
                  <span class="kollect-btn-text">Kollect</span>
                </div>
              </div>
            `;
          } else if (type === 'kollect') {
            button.innerHTML = `
              <div class="kollect-btn-content">
                <img 
                  src="https://res.cloudinary.com/djncgl9p3/image/upload/v1759833303/73AOXU_n3nt8j.svg" 
                  alt="Kollect" 
                  class="kollect-btn-logo-only"
                />
                <span class="kollect-btn-text">Kollect</span>
              </div>
            `;
          }
          
          // Add click handler that uses the payment data
          button.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleButtonClick(button);
          });
          
          return;
        }
        
        // Check if button already has content (vanilla HTML button)
        if (button.innerHTML.trim() !== '') {
          // This is a vanilla button, just add styling classes
          button.classList.add('kollect-btn-enhanced');
          return;
        }
        
        // Clear existing content
        button.innerHTML = '';
        
        // Create button content based on type
        if (type === 'pay-kollect') {
          button.innerHTML = `
            <div class="kollect-btn-content">
              <div class="kollect-btn-left">
                <img 
                  src="${variant === 'dark' 
                    ? 'https://res.cloudinary.com/djncgl9p3/image/upload/v1759833344/fi_14446278_aasybn.svg'
                    : 'https://res.cloudinary.com/djncgl9p3/image/upload/v1759833320/USD_Coin_USDC_sd1ivo.svg'
                  }" 
                  alt="USD" 
                  class="kollect-btn-icon"
                />
                <img 
                  src="https://res.cloudinary.com/djncgl9p3/image/upload/v1759833362/Pay_with_xeru6d.svg" 
                  alt="Pay with" 
                  class="kollect-btn-pay-text"
                />
              </div>
              <div class="kollect-btn-right">
                <img 
                  src="https://res.cloudinary.com/djncgl9p3/image/upload/v1759833303/73AOXU_n3nt8j.svg" 
                  alt="Kollect" 
                  class="kollect-btn-logo"
                />
                <span class="kollect-btn-text">Kollect</span>
              </div>
            </div>
          `;
        } else if (type === 'kollect') {
          button.innerHTML = `
            <div class="kollect-btn-content">
              <img 
                src="https://res.cloudinary.com/djncgl9p3/image/upload/v1759833303/73AOXU_n3nt8j.svg" 
                alt="Kollect" 
                class="kollect-btn-logo-only"
              />
              <span class="kollect-btn-text">Kollect</span>
            </div>
          `;
        }
        
        // Add click handler for vanilla HTML buttons
        button.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleButtonClick(button);
        });
      },

      handleButtonClick(button) {
        if (!this.authToken) {
          alert("You are not authenticated. Please try again later.");
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

        // Try to get data from global function
        if (window.getKollectPaymentData && typeof window.getKollectPaymentData === 'function') {
          return window.getKollectPaymentData();
        }

        // Try to get data from updatePaymentData function
        if (window.Kollect && window.Kollect.updatePaymentData) {
          return null; // Let the existing function handle it
        }

        return null;
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
          const res = await fetch(`${this.endpoint}/invoice/invoiceWithPayment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.authToken}`,
            },
            body: JSON.stringify(payload),
          });

          if (!res.ok) {
            const errorResponse = await res.text();
            console.error("[Kollect SDK] Invoice creation failed", res.status, errorResponse);
            alert("Invoice creation failed. Please check the details and try again.");
            return;
          }

          const result = await res.json();

          if (result?.status && result?.data?.paymentUrl) {
            const redirectUrl = encodeURIComponent(paymentData.redirectUrl || window.location.origin);
            const fullUrl = `${result.data.paymentUrl}?redirect=${redirectUrl}`;
            window.open(fullUrl, "_blank");
            
            // Call success callback if available
            if (window.onKollectPaymentSuccess) {
              window.onKollectPaymentSuccess(result);
            }
          } else {
            console.warn("[Kollect SDK] Unexpected response format", result);
            alert("Payment URL not returned. Please try again.");
          }

        } catch (e) {
          console.error("[Kollect SDK] Payment processing error", e);
          alert("An error occurred while processing payment. Please try again.");
        }
      },
  
      async attachPayButton({ selector, data, dataFunction }) {
        const btn = document.querySelector(selector);
        if (!btn) {
          console.warn("[Kollect SDK] Payment button not found for selector:", selector);
          return;
        }

        btn.addEventListener("click", async () => {
          if (!this.authToken) {
            alert("You are not authenticated. Please try again later.");
            return;
          }

          // Get data dynamically if dataFunction is provided, otherwise use static data
          const paymentData = dataFunction ? dataFunction() : data;
          
          console.log("[Kollect SDK] Payment data received:", paymentData);
          console.log("[Kollect SDK] DataFunction exists:", !!dataFunction);
          console.log("[Kollect SDK] Static data exists:", !!data);
          
          if (!paymentData) {
            console.error("[Kollect SDK] No payment data provided");
            console.error("[Kollect SDK] DataFunction result:", dataFunction ? dataFunction() : "No dataFunction");
            alert("Payment data is required. Please provide payment information.");
            return;
          }

          // Validate required fields
          const requiredFields = ['clientEmail', 'clientName', 'clientWalletAddress', 'countryCode', 'countryName', 'currency', 'items'];
          const missingFields = requiredFields.filter(field => !paymentData[field]);
          
          if (missingFields.length > 0) {
            console.error("[Kollect SDK] Missing required fields:", missingFields);
            alert(`Missing required fields: ${missingFields.join(', ')}`);
            return;
          }

          if (!paymentData.items || paymentData.items.length === 0) {
            console.error("[Kollect SDK] Items array is empty or missing");
            alert("At least one item is required for the invoice.");
            return;
          }

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
            const res = await fetch(`${this.endpoint}/invoice/invoiceWithPayment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.authToken}`,
              },
              body: JSON.stringify(payload),
            });
  
            if (!res.ok) {
              const errorResponse = await res.text();
              console.error("[Kollect SDK] Invoice creation failed", res.status, errorResponse);
              alert("Invoice creation failed. Please check the details and try again.");
              return;
            }
  
            const result = await res.json();
  
            if (result?.status && result?.data?.paymentUrl) {
              const redirectUrl = encodeURIComponent(paymentData.redirectUrl || window.location.origin);
              const fullUrl = `${result.data.paymentUrl}?redirect=${redirectUrl}`;
              window.open(fullUrl, "_blank");
              
              // Call success callback if available
              if (window.onKollectPaymentSuccess) {
                window.onKollectPaymentSuccess(result);
              }
            } else {
              console.warn("[Kollect SDK] Unexpected response format", result);
              alert("Payment URL not returned. Please try again.");
            }
  
          } catch (e) {
            console.error("[Kollect SDK] Payment processing error", e);
            alert("An error occurred while processing payment. Please try again.");
          }
        });
      }
    };
  
    window.Kollect = Kollect;
  })();
  