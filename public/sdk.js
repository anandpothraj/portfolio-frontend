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
  
        } catch (err) {
          console.error("[Kollect SDK] Network/auth error", err);
          alert("Unable to authenticate. Please check your network or contact support.");
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
  