document.getElementById("saveGrade").addEventListener("click", () => {
    const studentName = document.getElementById("studentName").value;
    const subject = document.getElementById("subject").value;
    const grade = document.getElementById("grade").value;

    if (!studentName || !subject || !grade) {
        alert("Please complete all fields");
        return;
    }

    // FAKE SAVE to localStorage
    const gradeData = {
        studentName: studentName,
        subject: subject,
        grade: grade
    };

    localStorage.setItem("latestGrade", JSON.stringify(gradeData));
    alert("Grade saved! (Student can now view it)");
});
