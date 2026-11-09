let currentStudent = null;

function makeField(label, value, name, placeholder = "") {
  return `<label>${label}<input name="${name}" value="${escapeHTML(value || "")}" placeholder="${placeholder}" maxlength="300"></label>`;
}

function renderEducation(items = []) {
  const list = document.getElementById("educationList");
  list.innerHTML = items.map((item, index) => `
    <div class="repeat-item" data-kind="education">
      <div class="repeat-title"><strong>Education ${index + 1}</strong><button type="button" class="remove-item">Remove</button></div>
      <div class="form-grid">
        ${makeField("Institution", item.institution, "institution", "College / university")}
        ${makeField("Qualification", item.qualification, "qualification", "Degree / course")}
        ${makeField("Year", item.year, "year", "2026")}
        ${makeField("Grade / result", item.grade, "grade", "CGPA / percentage")}
      </div>
    </div>`).join("");
}

function renderProjects(items = []) {
  document.getElementById("projectList").innerHTML = items.map((item, index) => `
    <div class="repeat-item" data-kind="project">
      <div class="repeat-title"><strong>Project ${index + 1}</strong><button type="button" class="remove-item">Remove</button></div>
      <div class="form-grid">
        ${makeField("Project title", item.title, "title", "Project name")}
        ${makeField("Project link", item.projectLink, "projectLink", "https://…")}
        <label class="full-width">Description<textarea name="description" rows="3" maxlength="1000">${escapeHTML(item.description || "")}</textarea></label>
        <label class="full-width">Technologies <span class="muted">(comma separated)</span><input name="technologies" value="${escapeHTML((item.technologies || []).join(", "))}" placeholder="HTML, CSS, Node.js"></label>
      </div>
    </div>`).join("");
}

function renderCertificates(items = []) {
  document.getElementById("certificateList").innerHTML = items.map((item, index) => `
    <div class="repeat-item" data-kind="certificate">
      <div class="repeat-title"><strong>Certificate ${index + 1}</strong><button type="button" class="remove-item">Remove</button></div>
      <div class="form-grid">
        ${makeField("Certificate title", item.title, "title", "Certificate name")}
        ${makeField("Issuing organisation", item.issuer, "issuer", "Organisation")}
        ${makeField("Year", item.year, "year", "2026")}
      </div>
    </div>`).join("");
}

function readItems(containerId, kind) {
  return [...document.querySelectorAll(`#${containerId} [data-kind="${kind}"]`)].map(card => {
    const value = name => card.querySelector(`[name="${name}"]`)?.value.trim() || "";
    if (kind === "education") return {
      institution: value("institution"), qualification: value("qualification"),
      year: value("year") ? Number(value("year")) : undefined, grade: value("grade")
    };
    if (kind === "project") return {
      title: value("title"), projectLink: value("projectLink"), description: value("description"),
      technologies: value("technologies").split(",").map(s => s.trim()).filter(Boolean)
    };
    return {
      title: value("title"), issuer: value("issuer"),
      year: value("year") ? Number(value("year")) : undefined
    };
  });
}

function addBlank(containerId, kind) {
  const current = readItems(containerId, kind);
  if (kind === "education") current.push({});
  if (kind === "project") current.push({ title: "", technologies: [] });
  if (kind === "certificate") current.push({ title: "" });
  if (kind === "education") renderEducation(current);
  if (kind === "project") renderProjects(current);
  if (kind === "certificate") renderCertificates(current);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const { student } = await apiRequest("/api/portfolio");
    currentStudent = student;
    document.getElementById("pName").value = student.name || "";
    document.getElementById("pEmail").value = student.email || "";
    document.getElementById("pCourse").value = student.course || "";
    document.getElementById("pPhone").value = student.phone || "";
    document.getElementById("pBio").value = student.bio || "";
    document.getElementById("pSkills").value = (student.skills || []).join(", ");
    renderEducation(student.education || []);
    renderProjects(student.projects || []);
    renderCertificates(student.certificates || []);
  } catch (error) {
    document.getElementById("saveMessage").textContent = error.message;
  }

  document.getElementById("addEducation").addEventListener("click", () => addBlank("educationList", "education"));
  document.getElementById("addProject").addEventListener("click", () => addBlank("projectList", "project"));
  document.getElementById("addCertificate").addEventListener("click", () => addBlank("certificateList", "certificate"));

  document.addEventListener("click", event => {
    if (event.target.classList.contains("remove-item")) event.target.closest(".repeat-item").remove();
  });

  document.getElementById("portfolioForm").addEventListener("submit", async event => {
    event.preventDefault();
    const message = document.getElementById("saveMessage");
    const button = document.getElementById("saveAllBtn");
    button.disabled = true;
    message.textContent = "Saving your portfolio…";
    message.className = "form-message";
    const payload = {
      name: document.getElementById("pName").value.trim(),
      course: document.getElementById("pCourse").value.trim(),
      phone: document.getElementById("pPhone").value.trim(),
      bio: document.getElementById("pBio").value.trim(),
      skills: document.getElementById("pSkills").value.split(",").map(s => s.trim()).filter(Boolean),
      education: readItems("educationList", "education"),
      projects: readItems("projectList", "project"),
      certificates: readItems("certificateList", "certificate")
    };
    try {
      const result = await apiRequest("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      currentStudent = result.student;
      message.textContent = result.message;
      message.className = "form-message success";
    } catch (error) {
      message.textContent = error.message;
      message.className = "form-message error";
    } finally {
      button.disabled = false;
    }
  });

  document.getElementById("saveAllBtn").addEventListener("click", () => {
    document.getElementById("portfolioForm").requestSubmit();
  });
});
