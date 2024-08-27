let encryptionMap = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

let decryptionMap = {
    'enter': 'e',
    'imes': 'i',
    'ai': 'a',
    'ober': 'o',
    'ufat': 'u'
};

function processText(action) {
    let textarea = document.querySelector('.texto-encriptar');
    let textoDesencriptado = document.querySelector('.texto-desencriptado');
    let inputText = textarea.value.trim();

    if (inputText === '') {
        textoDesencriptado.innerHTML = `
            <p class="not-found">Ningún mensaje fue encontrado</p>
            <p class="text-alter">Ingresa el texto que desees encriptar o desencriptar.</p>
        `;
        textoDesencriptado.style.justifyContent = 'center';
        textoDesencriptado.style.alignItems = 'center';
        textoDesencriptado.classList.add('not-found');
        return;
    }

    if (!validateText(inputText) ) {
        alert('Solo se permiten letras minúsculas sin acentos.');
        return;
    }
    
    let outputText;
    if (action === 'encrypt') {
        outputText = encryptText(inputText);
    } else if (action === 'decrypt') {
        outputText = decryptText(inputText);
    }
    textoDesencriptado.style.justifyContent = 'start';
    textoDesencriptado.style.alignItems = 'start';
    textoDesencriptado.innerHTML = `<p>${outputText}</p>`;
    textoDesencriptado.classList.remove('not-found');
}

function encryptText(text) {
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        encryptedText += encryptionMap[char] || char;
    }
    return encryptedText;
}

function decryptText(text) {
    let decryptedText = text;
    for (let key in decryptionMap) {
        if (decryptionMap.hasOwnProperty(key)) {
            let value = decryptionMap[key];
            let regex = new RegExp(key, 'g');
            decryptedText = decryptedText.replace(regex, value);
        }
    }
    return decryptedText;
}

function copyText() {
    let textoDesencriptado = document.querySelector('.texto-desencriptado');
    let textToCopy = textoDesencriptado.querySelector('p:not(.not-found)');

    if (textToCopy) {
        let text = textToCopy.textContent;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Texto copiado al portapapeles!');
            }).catch(err => {
                alert('Error al copiar el texto.');
                console.error('Error al copiar el texto: ', err);
            });
        }
    } 
}

function validateText(text) {
    return /^[a-z\s]+$/.test(text);
}

