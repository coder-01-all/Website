document.addEventListener('DOMContentLoaded', () => {
    loadExcelFile();
    document.getElementById('download-pdf').addEventListener('click', downloadPDF);
});

function loadExcelFile() {
    const url = 'vikas.xlsx'; // Ensure this path is correct

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.arrayBuffer();
        })
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const tableHTML = XLSX.utils.sheet_to_html(worksheet);
            document.getElementById('excel-table').innerHTML = tableHTML;
        })
        .catch(error => console.error('Error loading the Excel file:', error));
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add autoTable plugin
    const autoTable = doc.autoTable;

    const table = document.getElementById('excel-table');
    const rows = [];
    const headers = [];

    // Get headers
    const headerCells = table.querySelectorAll('thead tr th');
    headerCells.forEach(headerCell => {
        headers.push(headerCell.innerText);
    });

    // Get rows
    const rowCells = table.querySelectorAll('tbody tr');
    rowCells.forEach(rowCell => {
        const row = [];
        const cells = rowCell.querySelectorAll('td');
        cells.forEach(cell => {
            row.push(cell.innerText);
        });
        rows.push(row);
    });

    // Use autoTable to create the PDF
    doc.autoTable({
        head: [headers],
        body: rows,
    });

    doc.save('table.pdf');
}
