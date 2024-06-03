document.getElementById('download-pdf').addEventListener('click', printPDF);

function printPDF() {
    window.print(); // This triggers the browser's print dialog
}

document.addEventListener('DOMContentLoaded', loadExcelFile);
document.getElementById('download-pdf').addEventListener('click', downloadPDF);

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
            document.getElementById('excel-table').innerHTML = tableHTML;
        })
        .catch(error => console.error('Error loading the Excel file:', error));
}

function downloadPDF() {
    const element = document.getElementById('content');
    html2pdf()
        .from(element)
        .set({
            margin: 1,
            filename: 'full-page.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save();
}
