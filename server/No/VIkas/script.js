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
            document.getElementById('excel-table-container').innerHTML = tableHTML;
        })
        .catch(error => console.error('Error loading the Excel file:', error));
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const autoTable = doc.autoTable;

    const table = document.querySelector('#excel-table-container table');
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

    // Use autoTable to create the PDF with lines
    doc.autoTable({
        head: [headers],
        body: rows,
        theme: 'grid', // Ensures lines are added in the table
        styles: {
            lineColor: [0, 0, 0], // Black color for lines
            lineWidth: 0.1, // Line width
        },
        headStyles: {
            fillColor: [211, 211, 211], // Light grey background for headers
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255], // White background for alternate rows
        },
    });

    doc.save('table.pdf');
}
