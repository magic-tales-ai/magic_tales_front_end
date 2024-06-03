export function downloadPDF(URLpdf, name = getNameFromUrl(URLpdf)) {
    fetch(URLpdf)
        .then(response => response.blob())
        .then(blob => {
            const file = new Blob([blob], { type: 'application/pdf' });

            const fileURL = URL.createObjectURL(file);
            var link = document.createElement('a');
            link.href = fileURL;
            link.download = name + '.pdf';

            link.click();
        })
        .catch(error => console.error('Error al descargar el PDF:', error));
}

export function downloadPDFFromFile(pdf, name = getNameFromUrl(pdf)) {
    const file = new Blob(
        [pdf],
        { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    var link = document.createElement('a');
    link.href = fileURL;
    link.download = name + '.pdf'
    link.click();

    return fileURL;
}

export function getNameFromUrl(url) {
    const pathArray = new URL(url).pathname.split('/');
    const fileNameWithExtension = pathArray.pop();
    const fileNameWithoutExtension = fileNameWithExtension.split('.')[0];

    return fileNameWithoutExtension;
}