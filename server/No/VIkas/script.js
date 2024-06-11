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
            const tableHTML = XLSX.utils.sheet_to_html(worksheet, { id: 'excel-table' });

            // Insert the table HTML into the container
            document.getElementById('excel-table-container').innerHTML = tableHTML;

            // Check if the table is inserted correctly
            console.log("Inserted HTML Table:", document.getElementById('excel-table-container').innerHTML);
        })
        .catch(error => console.error('Error loading the Excel file:', error));
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const table = document.querySelector('#excel-table-container table');

    if (!table) {
        console.error('Table not found!');
        return;
    }

    const rows = Array.from(table.querySelectorAll('tr')).map(tr =>
        Array.from(tr.querySelectorAll('th, td')).map(td => td.textContent.trim())
    );

    // Use autoTable to create the PDF with lines
    doc.autoTable({
        head: [rows[0]],
        body: rows.slice(1),
        theme: 'grid',
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
        },
        headStyles: {
            fillColor: [0, 251, 255],
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255],
        },
    });

    // Save the PDF
    doc.save('table.pdf');
}
