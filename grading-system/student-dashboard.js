/* ==============================
   STUDENT DATA (FROM TEACHER DASHBOARD LATER)
   ============================== */

const student = {
    name: "Juan Dela Cruz",
    lrn: "1234567890",
    section: "Grade 11 - A",
    strand: "TechPro",
    schoolYear: "2025–2026",
    adviser: "Mrs. Santos",
    photo: "default-avatar.png"
};

/* ==============================
   SUBJECTS (8 BASE SUBJECTS)
   ============================== */

const subjects = [
    "Math",
    "English",
    "Science",
    "Filipino",
    "PE",
    "Research",
    "Programming",
    "Networking"
];

/* ==============================
   GRADES INPUT (TEACHER INPUT SOURCE)
   ============================== */

const gradesBySubject = {
    Math: { Q1: 93, Q2: 97, Q3: null, Q4: null },
    English: { Q1: 90, Q2: 92, Q3: null, Q4: null },
    Science: { Q1: 89, Q2: 91, Q3: null, Q4: null },
    Filipino: { Q1: 94, Q2: null, Q3: null, Q4: null },
    PE: { Q1: 96, Q2: 98, Q3: null, Q4: null },
    Research: { Q1: 88, Q2: 90, Q3: null, Q4: null },
    Programming: { Q1: 95, Q2: 99, Q3: null, Q4: null },
    Networking: { Q1: 92, Q2: 94, Q3: null, Q4: null }
};

/* ==============================
   LOAD STUDENT OVERVIEW
   ============================== */

document.getElementById("studentName").textContent = student.name;
document.getElementById("studentLRN").textContent = student.lrn;
document.getElementById("studentSection").textContent = student.section;
document.getElementById("studentStrand").textContent = student.strand;
document.getElementById("schoolYear").textContent = student.schoolYear;
document.getElementById("adviser").textContent = student.adviser;
document.getElementById("profilePic").src = student.photo;

/* ==============================
   SUBJECT LIST RENDER
   ============================== */

const subjectList = document.getElementById("subjectList");

subjects.forEach(sub => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${sub}</span>
        <button onclick="viewSubject('${sub}')">View Grades</button>
    `;
    subjectList.appendChild(li);
});

/* ==============================
   VIEW SUBJECT (PER QUARTER)
   ============================== */

function viewSubject(subject) {
    document.getElementById("subjectTitle").textContent = subject + " Grades";
    const tbody = document.getElementById("subjectGrades");
    tbody.innerHTML = "";

    const data = gradesBySubject[subject];

    ["Q1", "Q2", "Q3", "Q4"].forEach((q, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>Quarter ${index + 1}</td>
            <td>${data[q] ?? "-"}</td>
        `;
        tbody.appendChild(tr);
    });
}

/* ==============================
   GWA CALCULATION (FIXED ÷ 4)
   ============================== */

function computeGWA() {
    let quarterTotals = [0, 0, 0, 0];

    subjects.forEach(sub => {
        const g = gradesBySubject[sub];
        if (g.Q1) quarterTotals[0] += g.Q1;
        if (g.Q2) quarterTotals[1] += g.Q2;
        if (g.Q3) quarterTotals[2] += g.Q3;
        if (g.Q4) quarterTotals[3] += g.Q4;
    });

    // average per quarter
    const qAverages = quarterTotals.map(total => total / subjects.length || 0);

    // FINAL GWA always divided by 4
    const finalGWA =
        (qAverages[0] + qAverages[1] + qAverages[2] + qAverages[3]) / 4;

    document.getElementById("gwaScore").textContent = finalGWA.toFixed(2);
    document.getElementById("gwaStatus").textContent =
        finalGWA >= 75 ? "PASSED" : "AT RISK";
}

computeGWA();
