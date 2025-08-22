const supabaseUrl = "https://vmcveofukestnfhmkbcr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtY3Zlb2Z1a2VzdG5maG1rYmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2ODgzNDMsImV4cCI6MjA2OTI2NDM0M30.MJ-cpe6IGG5wAG9lQleKb8jBKkB3CSNYp91L8B4NvfA";
const client = supabase.createClient(supabaseUrl, supabaseKey);

/***** Professional Alert System *****/
class ProfessionalAlert {
  static show(message, type = 'info', duration = 5000) {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.professional-alert');
    if (existingAlert) {
      existingAlert.remove();
    }

    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `professional-alert alert-${type}`;
    
    // Icon based on type
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    alertDiv.innerHTML = `
      <div class="alert-content">
        <span class="alert-icon">${icons[type] || icons.info}</span>
        <span class="alert-message">${message}</span>
        <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    // Add to body
    document.body.appendChild(alertDiv);

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        if (alertDiv && alertDiv.parentNode) {
          alertDiv.style.opacity = '0';
          setTimeout(() => alertDiv.remove(), 300);
        }
      }, duration);
    }
  }

  static success(message, duration = 5000) {
    this.show(message, 'success', duration);
  }

  static error(message, duration = 7000) {
    this.show(message, 'error', duration);
  }

  static warning(message, duration = 6000) {
    this.show(message, 'warning', duration);
  }

  static info(message, duration = 5000) {
    this.show(message, 'info', duration);
  }
}

/***** Loader Functions *****/
function showLoader(elementId, originalText = "") {
  const element = document.getElementById(elementId);
  if (element) {
    element.disabled = true;
    element.innerHTML = `
      <span class="loader-spinner"></span>
      Loading...
    `;
    element.style.opacity = "0.7";
    element.style.cursor = "not-allowed";
  }
}

function hideLoader(elementId, originalText = "Submit") {
  const element = document.getElementById(elementId);
  if (element) {
    element.disabled = false;
    element.innerHTML = originalText;
    element.style.opacity = "1";
    element.style.cursor = "pointer";
  }
}

function showTableLoader(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 20px;">
          <div class="table-loader">
            <span class="loader-spinner"></span>
            Loading data...
          </div>
        </td>
      </tr>
    `;
  }
}

// Add CSS for loaders and professional alerts
function addLoaderStyles() {
  if (!document.getElementById('loader-styles')) {
    const style = document.createElement('style');
    style.id = 'loader-styles';
    style.textContent = `
      .loader-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-right: 8px;
      }
      
      .table-loader {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #666;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      /* Professional Alert Styles */
      .professional-alert {
        position: fixed;
        top: 20px;
        right: 20px;
        min-width: 300px;
        max-width: 500px;
        z-index: 10000;
        opacity: 1;
        transition: all 0.3s ease;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        overflow: hidden;
        backdrop-filter: blur(10px);
      }

      .alert-content {
        display: flex;
        align-items: center;
        padding: 16px 20px;
        gap: 12px;
        position: relative;
      }

      .alert-icon {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
      }

      .alert-message {
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
        font-weight: 500;
      }

      .alert-close {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s ease;
      }

      .alert-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }

      /* Success Alert */
      .alert-success {
        background: linear-gradient(135deg, #4ade80, #22c55e);
        color: white;
      }

      .alert-success .alert-icon {
        background-color: rgba(255, 255, 255, 0.2);
      }

      /* Error Alert */
      .alert-error {
        background: linear-gradient(135deg, #f87171, #ef4444);
        color: white;
      }

      .alert-error .alert-icon {
        background-color: rgba(255, 255, 255, 0.2);
      }

      /* Warning Alert */
      .alert-warning {
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        color: white;
      }

      .alert-warning .alert-icon {
        background-color: rgba(255, 255, 255, 0.2);
      }

      /* Info Alert */
      .alert-info {
        background: linear-gradient(135deg, #60a5fa, #3b82f6);
        color: white;
      }

      .alert-info .alert-icon {
        background-color: rgba(255, 255, 255, 0.2);
      }

      /* Mobile Responsiveness */
      @media (max-width: 640px) {
        .professional-alert {
          top: 10px;
          right: 10px;
          left: 10px;
          min-width: auto;
          max-width: none;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize loader styles when page loads
document.addEventListener('DOMContentLoaded', addLoaderStyles);

/***** Helpers *****/
function uniqueKey(originalName = "file") {
  const hasUUID = typeof crypto !== "undefined" && crypto.randomUUID;
  const uid = hasUUID
    ? crypto.randomUUID()
    : Date.now() + "-" + Math.random().toString(36).slice(2);
  const clean = originalName.replace(/\s+/g, "-").toLowerCase();
  return `${uid}-${clean}`;
}

/***** Registration *****/
let registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
  registrationForm.addEventListener("click", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;
    const phone = document.getElementById("phone").value.trim();
    const image = document.getElementById("profileImage").files[0];

    // Basic validation
    if (phone.length !== 11) {
      ProfessionalAlert.warning("Phone number must be 11 digits");
      return;
    }
    if (password !== confirm) {
      ProfessionalAlert.error("Password and confirm password do not match");
      return;
    }
    if (!image) {
      ProfessionalAlert.warning("Please select a profile image");
      return;
    }

    // Show loader
    showLoader("registrationForm", "Register");

    try {
      // 1) Sign Up
      const { data: signData, error: signError } = await client.auth.signUp({
        email,
        password,
      });
      if (signError) {
        console.log("SignUp Error:", signError.message);
        ProfessionalAlert.error(signError.message);
        return;
      }

      // 2) Upload Image (independent of user.id to avoid confirmation issues)
      const filePath = `public/${uniqueKey(image.name)}`;
      const { data: upRes, error: upErr } = await client.storage
        .from("registration")
        .upload(filePath, image, {
          cacheControl: "3600",
          upsert: true,
        });
      if (upErr) {
        console.log("Upload Error:", upErr.message);
        ProfessionalAlert.error("Image upload failed. Please try again.");
        return;
      }

      const { data: urlRes } = client.storage
        .from("registration")
        .getPublicUrl(filePath);
      const profileUrl = urlRes?.publicUrl;

      // 3) Insert into registrationForm — only columns that surely exist
      const { error: insertErr } = await client.from("registrationForm").insert({
        firstName,
        lastName,
        email,
        profileImage: profileUrl,
      });
      if (insertErr) {
        console.log("DB Insert Error:", insertErr.message);
        ProfessionalAlert.error("Failed to save profile. Please try again.");
        return;
      }

      ProfessionalAlert.success("Account created successfully! Redirecting to login page...");
      setTimeout(() => {
        window.location.href = "login2.html";
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      ProfessionalAlert.error("Registration failed. Please try again.");
    } finally {
      // Hide loader
      hideLoader("registrationForm", "Register");
    }
  });
}

/***** User Login *****/
let loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Show loader
    showLoader("loginForm", "Login");

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.log("SignIn Error:", error.message);
        ProfessionalAlert.error("Invalid email or password");
        return;
      }

      ProfessionalAlert.success("Login successful! Redirecting to dashboard...");
      setTimeout(() => {
        window.location.href = "dashboard2.html";
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      ProfessionalAlert.error("Login failed. Please try again.");
    } finally {
      // Hide loader
      hideLoader("loginForm", "Login");
    }
  });
}

/***** Admin Login (static) *****/
let adminLogin = document.getElementById("adminLogin");
if (adminLogin) {
  adminLogin.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Show loader for admin login
    showLoader("adminLogin", "Admin Login");

    // Simulate small delay for better UX
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin123") {
        ProfessionalAlert.success("Admin login successful! Redirecting to dashboard...");
        setTimeout(() => {
          window.location.href = "admin_dashboard2.html";
        }, 1500);
      } else {
        ProfessionalAlert.error("Wrong email or password!");
        hideLoader("adminLogin", "Admin Login");
      }
    }, 500);
  });
}

/***** Admin: Render Table *****/
let show = document.getElementById("show");

async function render() {
  if (!show) return;

  // Show table loader
  showTableLoader("show");

  try {
    const { data, error } = await client
      .from("registrationForm")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log("Fetch Error:", error.message);
      show.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 20px; color: red;">
            Error loading data. Please try again.
          </td>
        </tr>
      `;
      return;
    }

    show.innerHTML = "";
    let approvedCount = 0;

    (data || []).forEach((ele) => {
      if (ele.status === "Approved") approvedCount++;

      show.innerHTML += `
        <tr>
          <td>${ele.firstName || ""}</td>
          <td>${ele.lastName || ""}</td>
          <td>${ele.email || ""}</td>
          <td><img src="${
            ele.profileImage || ""
          }" width="70" height="50" style="object-fit:cover;border-radius:6px" alt=""></td>
          <td>
            <select class="select" onchange="statusVa(this.value, ${ele.id})">
              <option disabled ${!ele.status ? "selected" : ""}>Select</option>
              <option ${
                ele.status === "Pending" ? "selected" : ""
              }>Pending</option>
              <option ${
                ele.status === "Approved" ? "selected" : ""
              }>Approved</option>
              <option ${
                ele.status === "Rejected" ? "selected" : ""
              }>Rejected</option>
            </select>
          </td>
        </tr>`;
    });

    // Show "No data" message if empty
    if (!data || data.length === 0) {
      show.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 20px; color: #666;">
            No registrations found.
          </td>
        </tr>
      `;
    }

    // (Optional) simple stats if elements exist
    const totalEl = document.getElementById("statTotal");
    const weekEl = document.getElementById("statWeek");
    const rateEl = document.getElementById("statRate");
    if (totalEl) totalEl.textContent = (data || []).length;
    if (weekEl) weekEl.textContent = (data || []).length; // placeholder
    if (rateEl) {
      const rate =
        data && data.length ? Math.round((approvedCount / data.length) * 100) : 0;
      rateEl.textContent = rate + "%";
    }
  } catch (error) {
    console.error("Render error:", error);
    show.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 20px; color: red;">
          Error loading data. Please refresh the page.
        </td>
      </tr>
    `;
  }
}
render();

/***** Admin: Update Status *****/
async function statusVa(stdValue, stID) {
  // Find the select element and show loading state
  const selectElement = event.target;
  const originalHTML = selectElement.innerHTML;
  selectElement.disabled = true;
  selectElement.innerHTML = '<option selected>Updating...</option>';

  try {
    const { error } = await client
      .from("registrationForm")
      .update({ status: stdValue })
      .eq("id", stID);
    
    if (error) {
      console.log("Status Update Error:", error.message);
      ProfessionalAlert.error("Failed to update status. Please try again.");
      // Restore original options
      selectElement.innerHTML = originalHTML;
      selectElement.disabled = false;
      return;
    }
    
    ProfessionalAlert.success("Status updated successfully!");
    render(); // This will refresh the entire table
  } catch (error) {
    console.error("Status update error:", error);
    ProfessionalAlert.error("Failed to update status. Please try again.");
    // Restore original options
    selectElement.innerHTML = originalHTML;
    selectElement.disabled = false;
  }
}
window.statusVa = statusVa;

/***** Public: Check Status by Email *****/
async function check() {
  const email = document.getElementById("checkStatus").value.trim();
  const statusContainer = document.getElementById("statusContainer");
  const checkButton = document.getElementById("checkStatusButton");

  if (!email) {
    ProfessionalAlert.warning("Please enter your email address");
    return;
  }

  // Show loader for check button if it exists
  if (checkButton) {
    showLoader("checkStatusButton", "Check Status");
  }

  // Show table loader
  showTableLoader("statusContainer");

  try {
    const { data, error } = await client
      .from("registrationForm")
      .select("firstName,lastName,email,profileImage,status")
      .eq("email", email);

    if (error) {
      console.log("Status Fetch Error:", error.message);
      ProfessionalAlert.error("Something went wrong while checking status");
      statusContainer.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 20px; color: red;">
            Error fetching status. Please try again.
          </td>
        </tr>
      `;
      return;
    }

    statusContainer.innerHTML = "";
    if (!data || !data.length) {
      ProfessionalAlert.info("No record found for this email address");
      statusContainer.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 20px; color: #666;">
            No record found for this email address.
          </td>
        </tr>
      `;
      return;
    }

    const s = data[0];
    statusContainer.innerHTML = `
      <tr>
        <td>${s.firstName || ""}</td>
        <td>${s.lastName || ""}</td>
        <td>${s.email || ""}</td>
        <td><img src="${
          s.profileImage || ""
        }" width="70" height="50" style="object-fit:cover;border-radius:6px" alt=""></td>
        <td>
          <span class="status-badge status-${(s.status || 'pending').toLowerCase()}">
            ${s.status || "Pending"}
          </span>
        </td>
      </tr>
    `;
    
    ProfessionalAlert.success("Status retrieved successfully!");
  } catch (error) {
    console.error("Check status error:", error);
    ProfessionalAlert.error("Something went wrong while checking status");
    statusContainer.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 20px; color: red;">
          Error checking status. Please try again.
        </td>
      </tr>
    `;
  } finally {
    // Hide loader for check button
    if (checkButton) {
      hideLoader("checkStatusButton", "Check Status");
    }
  }
}
window.check = check;

// Add status badge styles
document.addEventListener('DOMContentLoaded', () => {
  addLoaderStyles();
  
  // Add status badge styles
  if (!document.getElementById('status-styles')) {
    const style = document.createElement('style');
    style.id = 'status-styles';
    style.textContent = `
      .status-badge {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
      }
      
      .status-pending {
        background-color: #fff3cd;
        color: #856404;
        border: 1px solid #ffeaa7;
      }
      
      .status-approved {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      }
      
      .status-rejected {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
      }
    `;
    document.head.appendChild(style);
  }
});