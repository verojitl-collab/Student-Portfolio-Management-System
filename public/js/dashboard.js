document.addEventListener("DOMContentLoaded", async () => {
  try {
    const { student } = await apiRequest("/api/portfolio");
    document.getElementById("welcomeTitle").textContent = `Welcome back, ${student.name.split(" ")[0]}!`;
    document.getElementById("headerName").textContent = student.name;
    document.getElementById("studentName").textContent = student.name;
    document.getElementById("studentEmail").textContent = student.email;
    document.getElementById("studentCourse").textContent = student.course || "Add your course or programme";
    document.getElementById("studentPhone").textContent = student.phone || "Phone not added";
    document.getElementById("studentBio").textContent = student.bio || "Add a short introduction to tell people about yourself.";
    document.getElementById("educationCount").textContent = (student.education || []).length;
    document.getElementById("skillCount").textContent = (student.skills || []).length;
    document.getElementById("projectCount").textContent = (student.projects || []).length;
    document.getElementById("certificateCount").textContent = (student.certificates || []).length;
    if (student.role === "admin") document.getElementById("adminShortcut").classList.remove("hidden");
  } catch (error) {
    console.error(error);
  }
});
