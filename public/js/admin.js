let searchTimer;

function renderStudents(students) {
  const tbody = document.getElementById("studentsTable");
  document.getElementById("studentTotal").textContent = `${students.length} student${students.length === 1 ? "" : "s"} found`;
  if (!students.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-cell">No students found.</td></tr>';
    return;
  }
  tbody.innerHTML = students.map(student => `
    <tr>
      <td><strong>${escapeHTML(student.name)}</strong><small>${escapeHTML(student.email)}</small></td>
      <td>${escapeHTML(student.course || "—")}</td>
      <td>${(student.skills || []).length}</td>
      <td>${(student.projects || []).length}</td>
      <td>${student.createdAt ? new Date(student.createdAt).toLocaleDateString() : "—"}</td>
      <td><button class="remove-student" data-id="${escapeHTML(student._id)}">Delete</button></td>
    </tr>`).join("");
}

async function loadStudents(query = "") {
  const data = await apiRequest(`/api/admin/students?q=${encodeURIComponent(query)}`);
  renderStudents(data.students);
}

document.addEventListener("DOMContentLoaded", async () => {
  try { await loadStudents(); }
  catch (error) {
    document.getElementById("adminMessage").textContent = error.message;
    document.getElementById("adminMessage").className = "form-message error";
  }

  document.getElementById("searchStudents").addEventListener("input", event => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => loadStudents(event.target.value).catch(err => {
      document.getElementById("adminMessage").textContent = err.message;
    }), 250);
  });

  document.getElementById("studentsTable").addEventListener("click", async event => {
    const button = event.target.closest(".remove-student");
    if (!button) return;
    if (!confirm("Delete this student's account and portfolio? This cannot be undone.")) return;
    try {
      await apiRequest(`/api/admin/students/${encodeURIComponent(button.dataset.id)}`, { method: "DELETE" });
      document.getElementById("adminMessage").textContent = "Student deleted.";
      document.getElementById("adminMessage").className = "form-message success";
      await loadStudents(document.getElementById("searchStudents").value);
    } catch (error) {
      document.getElementById("adminMessage").textContent = error.message;
      document.getElementById("adminMessage").className = "form-message error";
    }
  });
});
