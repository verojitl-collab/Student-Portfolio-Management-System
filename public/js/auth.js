const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

function showAuthMessage(message, isError = true) {
  const element = document.getElementById("formMessage");
  if (!element) return;
  element.textContent = message;
  element.className = `form-message ${isError ? "error" : "success"}`;
}

if (registerForm) {
  registerForm.addEventListener("submit", async event => {
    event.preventDefault();
    const button = registerForm.querySelector("button[type=submit]");
    button.disabled = true;
    showAuthMessage("Creating your account…", false);
    try {
      await apiRequest("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: document.getElementById("name").value.trim(),
          email: document.getElementById("email").value.trim(),
          password: document.getElementById("password").value
        })
      });
      location.href = "dashboard.html";
    } catch (error) {
      showAuthMessage(error.message);
      button.disabled = false;
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async event => {
    event.preventDefault();
    const button = loginForm.querySelector("button[type=submit]");
    button.disabled = true;
    showAuthMessage("Signing you in…", false);
    try {
      await apiRequest("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: document.getElementById("email").value.trim(),
          password: document.getElementById("password").value
        })
      });
      location.href = "dashboard.html";
    } catch (error) {
      showAuthMessage(error.message);
      button.disabled = false;
    }
  });
}
