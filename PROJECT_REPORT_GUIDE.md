# Project Report Guide — Student Portfolio Management System

Use the college's supplied Mini Webpage Template.docx for the official front matter, declaration, certificate and formatting. Replace placeholders with your own details and obtain guide/department approval. Do not claim work or approvals that have not happened.

## Suggested project title
STUDENT PORTFOLIO MANAGEMENT SYSTEM

## Synopsis
The Student Portfolio Management System is a web-based application developed to help students maintain their academic and professional information in a centralised digital portfolio. Students can register and log in, manage their personal profiles, record educational qualifications, list skills, showcase projects and maintain certificates and achievements. An administrator can search registered student accounts and manage student records. The frontend is developed using HTML, CSS and JavaScript, the backend uses Node.js and Express, and MongoDB stores the application data. The application uses password hashing and session-based authentication to protect student accounts.

## 1.0 Introduction
Explain the need for a centralised student portfolio, project objectives, scope and intended users.

### 1.1 Modules in the Project
1.1.1 User Registration and Login — allows students to create accounts and authenticate.
1.1.2 Student Profile Management — allows students to update name, course, phone and biography.
1.1.3 Education Management — stores institution, qualification, year and grade.
1.1.4 Skills Management — stores technical and soft skills.
1.1.5 Projects and Certificates — stores project descriptions, technologies, links and certificate details.
1.1.6 Admin Management — allows an authorised administrator to search and delete student accounts.

## 2.0 System Configuration
### 2.1 Hardware Requirements
- Computer with a modern dual-core processor or better
- Minimum 4 GB RAM recommended
- Sufficient free disk space for Node.js, MongoDB and project files

### 2.2 Software Requirements
- Windows, macOS or Linux
- Visual Studio Code or another code editor
- Node.js and npm
- MongoDB Community Server
- MongoDB Compass (optional)
- Modern web browser

## 3.0 Details of Software
### 3.1 Overview of Front-End
HTML structures pages, CSS styles responsive layouts and JavaScript handles form submission and API communication.

### 3.2 Overview of Back-End
Node.js runs the server. Express provides API routes. Mongoose defines and accesses MongoDB documents. bcrypt hashes passwords and express-session manages login sessions.

## 4.0 Module Implementation
For each module, include the relevant HTML, CSS, frontend JavaScript and Node.js route/model code. Add screenshots captured from your running application. Explain the purpose of each important function.

## 5.0 Database
Database: `studentPortfolioDB`
Collection: `students` (Mongoose also creates the sessions collection for stored sessions).
Student fields include name, email, hashed password, role, phone, course, bio, education, skills, projects and certificates.
Include screenshots from MongoDB Compass showing actual records. Do not include real passwords or private student data in the report.

## 6.0 Validation
Frontend: required fields, email input type, minimum password length and input limits.
Backend: name/email/password checks, duplicate email handling, portfolio field allow-list, array-size checks and project URL protocol validation.
Include screenshots of successful and unsuccessful validation.

## 7.0 Conclusion
The system provides a centralised platform for students to organise and present academic and professional achievements. It demonstrates frontend development, server-side programming, database integration, authentication and CRUD operations. Future improvements may include public shareable portfolio links, profile photographs, PDF export and internship tracking.

## 8.0 References
- HTML: https://developer.mozilla.org/en-US/docs/Web/HTML
- CSS: https://developer.mozilla.org/en-US/docs/Web/CSS
- JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- Node.js: https://nodejs.org/docs
- Express: https://expressjs.com/
- MongoDB: https://www.mongodb.com/docs/
- Mongoose: https://mongoosejs.com/docs/
