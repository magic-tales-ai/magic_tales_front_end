import DOMPurify from 'dompurify';
import { marked } from 'marked';

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
    };
    reader.onerror = reject;
});

export const displayText = text => {
    const filteredText = text.replace(/【.*?】/g, '');
    const htmlContent = marked.parse(filteredText);
    const htmlContentSanitizado = DOMPurify.sanitize(htmlContent);
    return { __html: htmlContentSanitizado };
}