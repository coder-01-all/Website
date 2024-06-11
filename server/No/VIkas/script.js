
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

