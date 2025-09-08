
function tocarSom(tipo) {
    let arquivo = '';
    switch (tipo) {
        case 'sucesso':
            arquivo = 'sounds/sucesso.mp3';
            break;
        case 'erro':
            arquivo = 'sounds/erro.mp3';
            break;
        case 'alerta':
            arquivo = 'sounds/alerta.mp3';
            break;
        default:
            return;
    }
    const audio = new Audio(arquivo);
    audio.play();
}

function mostrarToast(mensagem, tipo = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast', 'show');

    switch (tipo) {
        case 'erro':
            toast.style.backgroundColor = '#f44336';
            break;
        case 'sucesso':
            toast.style.backgroundColor = '#4CAF50';
            break;
        case 'alerta':
            toast.style.backgroundColor = '#ff9800';
            break;
        default:
            toast.style.backgroundColor = '#0066cc';
    }

    toast.innerHTML = `
        ${mensagem}
        <span class="close" onclick="fecharToast(this)">&times;</span>
    `;

    container.appendChild(toast);

    tocarSom(tipo);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => container.removeChild(toast), 500);
    }, 5000);
}

function fecharToast(element) {
    const toast = element.parentElement;
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
}
