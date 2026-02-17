document.querySelector(".save-btn").addEventListener("click", () => {
    const table = document.getElementById("gradeTable");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>Sample Student</td>
        <td>Science</td>
        <td>95</td>
    `;

    table.appendChild(row);
});
