// DATA STORAGE (SIMULATION ONLY)

// STUDENTS
const students = [
  {
    username: "student1",
    password: "1234",
    name: "Juan Dela Cruz",
    lrn: "1234567890",
    section: "Grade 11 - A",
    strand: "STEM",
    schoolYear: "2025-2026",
    adviser: "Mr. Santos",
    profilePic: "https://via.placeholder.com/150"
  }
];

// TEACHERS
const teachers = [
  {
    username: "teacher1",
    password: "1234",
    name: "Mr. Teacher"
  }
];

// GRADES
let grades = JSON.parse(localStorage.getItem("grades")) || [];