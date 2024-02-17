export function convertString(string) {
    const khongDau = string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    const resultWithoutSpecialChars = khongDau.replace(/[,"?]/g, '');

    const result = resultWithoutSpecialChars.replace(/\s+/g, '-').toLowerCase();

    if (result.length >= 200) {
        let slicedText = result.substring(0, 200);
        return slicedText;
    }

    return result;
}

