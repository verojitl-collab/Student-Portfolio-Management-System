async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    ...options,
    headers: { ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && !location.pathname.endsWith("login.html") && !location.pathname.endsWith("register.html")) {
      location.href = "login.html";
    }
    throw new Error(data.message || "Something went wrong.");
  }
  return data;
}

async function logout() {
  try { await apiRequest("/api/auth/logout", { method: "POST" }); }
  finally { location.href = "login.html"; }
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("logoutBtn");
  if (button) button.addEventListener("click", logout);
});

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}
