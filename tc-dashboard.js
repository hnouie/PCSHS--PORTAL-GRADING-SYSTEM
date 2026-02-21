document.addEventListener("DOMContentLoaded", function() {

    // LOGOUT
    document.querySelector(".logout-btn").addEventListener("click", function(){
        localStorage.removeItem("currentTeacher");
        window.location.href = "login.html";
    });

    // LOAD DATA
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let grades = JSON.parse(localStorage.getItem("grades")) || [];

    const addStudentBtn = document.getElementById("addStudentBtn");
    const saveGradeBtn = document.getElementById("saveGrade");
    const notifyBtn = document.getElementById("notifyStudent");
    const gradeTable = document.getElementById("gradeTable");
    const studentSelect = document.getElementById("studentSelect");

    // Populate student dropdown
    function populateStudentDropdown(){
        studentSelect.innerHTML = '<option value="">--Choose Student--</option>';
        students.forEach((s, idx)=>{
            studentSelect.innerHTML += `<option value="${idx}">${s.name}</option>`;
        });
    }
    populateStudentDropdown();

    // Display selected student info
    studentSelect.addEventListener("change", function(){
        const idx = this.value;
        if(idx !== ""){
            const s = students[idx];
            document.getElementById("studentNameDisplay").innerText = s.name;
            document.getElementById("studentLRN").innerText = s.lrn;
            document.getElementById("studentGradeSec").innerText = s.gradeSec;
            document.getElementById("studentStrand").innerText = s.strand;
            document.getElementById("studentSY").innerText = s.sy;
            document.getElementById("studentAdviser").innerText = "Ms. Bonabel G. Bontoyan";
            document.getElementById("studentPhoto").src = s.photo || "juan.jpg";
        } else {
            document.getElementById("studentNameDisplay").innerText = "-";
            document.getElementById("studentLRN").innerText = "-";
            document.getElementById("studentGradeSec").innerText = "-";
            document.getElementById("studentStrand").innerText = "-";
            document.getElementById("studentSY").innerText = "-";
            document.getElementById("studentAdviser").innerText = "-";
            document.getElementById("studentPhoto").src = "juan.jpg";
        }
    });

    // Render grades table
    function renderGrades(){
        gradeTable.innerHTML = "";
        grades.forEach(g=>{
            const row = gradeTable.insertRow();
            row.insertCell(0).innerText = g.studentName;
            row.insertCell(1).innerText = g.subject;
            row.insertCell(2).innerText = g.grade;
            row.insertCell(3).innerText = g.quarter;
        });
    }
    renderGrades();

    // ADD STUDENT
    addStudentBtn.addEventListener("click", function(){
        const name = document.getElementById("newStudentName").value;
        const lrn = document.getElementById("newStudentLRN").value;
        const gradeSec = document.getElementById("newStudentGradeSec").value;
        const strand = document.getElementById("newStudentStrand").value;
        const sy = document.getElementById("newStudentSY").value;
        const photo = document.getElementById("newStudentPhoto").value || "juan.jpg";

        if(!name || !lrn || !gradeSec || !strand || !sy){
            alert("Please complete all fields for new student");
            return;
        }

        students.push({name, lrn, gradeSec, strand, sy, photo});
        localStorage.setItem("students", JSON.stringify(students));
        alert("Student added successfully");

        // Clear form
        document.getElementById("newStudentName").value="";
        document.getElementById("newStudentLRN").value="";
        document.getElementById("newStudentGradeSec").value="";
        document.getElementById("newStudentStrand").value="";
        document.getElementById("newStudentSY").value="";
        document.getElementById("newStudentPhoto").value="";

        populateStudentDropdown();
    });

    // SAVE GRADE
    saveGradeBtn.addEventListener("click", function(){
        const idx = studentSelect.value;
        const subject = document.getElementById("subject").value;
        const grade = document.getElementById("grade").value;
        const quarter = document.getElementById("quarter").value;

        if(idx === "" || !subject || !grade){
            alert("Please complete all fields");
            return;
        }

        const s = students[idx];
        grades.push({studentName: s.name, subject, grade, quarter});
        localStorage.setItem("grades", JSON.stringify(grades));
        renderGrades();

        document.getElementById("subject").value="";
        document.getElementById("grade").value="";
        alert("Grade saved!");
    });

    // Dummy email
    notifyBtn.addEventListener("click", function(){
        alert("Email function not implemented yet");
    });

});
