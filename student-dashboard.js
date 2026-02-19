// Load student info
const student = JSON.parse(localStorage.getItem("loggedInStudent"));
const grades = JSON.parse(localStorage.getItem("studentGrades"));

const profileImage = student.profilePic && student.profilePic !== "" ? student.profilePic : "default-avatar.png";
document.getElementById("profilePic").src = profileImage;

// PROFILE
document.getElementById("studentName").textContent = student.fullName;
document.getElementById("studentLRN").textContent = student.lrn;
document.getElementById("studentSection").textContent = student.gradeSection;
document.getElementById("studentStrand").textContent = student.strand;
document.getElementById("schoolYear").textContent = student.schoolYear;
document.getElementById("adviser").textContent = student.adviser;

// SUBJECT LIST
const subjectList = document.getElementById("subjectList");
grades.forEach(g => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${g.subject}</span> <button onclick="viewSubject('${g.subject}')">View Grades</button>`;
    subjectList.appendChild(li);
});

// VIEW SUBJECT GRADES
function viewSubject(subject){
    const data = grades.find(g => g.subject === subject);
    document.getElementById("subjectTitle").textContent = subject + " Grades";

    const tbody = document.getElementById("subjectGrades");
    tbody.innerHTML = "";

    ["q1","q2","q3","q4"].forEach((q,index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>Quarter ${index+1}</td><td>${data[q] || "-"}</td>`;
        tbody.appendChild(tr);
    });
}

// GWA COMPUTATION
function computeGWA(){
    const quarters = ["q1","q2","q3","q4"];
    let quarterTotals = [0,0,0,0];

    grades.forEach(sub => {
        quarters.forEach((q,i) => { if(sub[q]) quarterTotals[i]+=sub[q]; });
    });

    const qAverages = quarterTotals.map(total => total / grades.length);
    const finalGWA = qAverages.reduce((a,b)=>a+b,0)/4;

    document.getElementById("gwaScore").textContent = finalGWA.toFixed(2);
    const statusElem = document.getElementById("gwaStatus");
    statusElem.textContent = finalGWA >= 75 ? "PASSED" : "AT RISK";
    statusElem.className = finalGWA >= 75 ? "status passed" : "status at-risk";

    // Fill quarter overview
    const quarterOverview = document.getElementById("quarterOverview");
    quarterOverview.innerHTML = "";
    qAverages.forEach((avg,i)=>{
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>Quarter ${i+1}</td><td>${avg.toFixed(2)}</td>`;
        quarterOverview.appendChild(tr);
    });
}

computeGWA();

// LOGOUT BUTTON
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", ()=>{
    localStorage.removeItem("loggedInStudent");
    localStorage.removeItem("studentGrades");
    window.location.href = "student.html";
});
