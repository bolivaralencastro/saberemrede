// Funções de navegação
function openRegulamento() {
    window.open("https://sabemrede.com/regulamento", "_blank");
}

function openPolitica() {
    window.open("https://sabemrede.com/politica-privacidade", "_blank");
}

function showLoginForm() {
    // Implementar lógica para mostrar formulário de login
    console.log("Mostrar formulário de login");
}

// Validação de formulário
function validateForm() {
    const form = document.getElementById('loginForm');
    let isValid = true;

    // Limpar erros anteriores
    clearErrors();

    // Validar campos obrigatórios
    const requiredFields = ['nome', 'sobrenome', 'email', 'telefone', 'senha', 'confirmarSenha'];
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            showError(input, 'Este campo é obrigatório');
            isValid = false;
        }
    });

    // Validar email
    const email = document.getElementById('email');
    if (email.value && !isValidEmail(email.value)) {
        showError(email, 'E-mail inválido');
        isValid = false;
    }

    // Validar senha
    const senha = document.getElementById('senha');
    if (senha.value && senha.value.length < 8) {
        showError(senha, 'A senha deve ter pelo menos 8 caracteres');
        isValid = false;
    }

    // Validar confirmação de senha
    const confirmarSenha = document.getElementById('confirmarSenha');
    if (confirmarSenha.value && confirmarSenha.value !== senha.value) {
        showError(confirmarSenha, 'As senhas não coincidem');
        isValid = false;
    }

    // Validar termos
    const termos = document.getElementById('termos');
    if (!termos.checked) {
        showError(termos, 'Você precisa aceitar os termos para continuar');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    formGroup.appendChild(errorDiv);
}

function clearErrors() {
    document.querySelectorAll('.form-group.error').forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm()) {
                // Simular envio do formulário
                console.log('Formulário válido, enviando...');
                
                // Mostrar mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'alert-box alert-success';
                successMessage.innerHTML = `
                    <span class="material-icons-sharp">check_circle</span>
                    <div>Cadastro realizado com sucesso! Bem-vindo(a), ${document.getElementById('nome').value}!</div>
                `;
                
                form.innerHTML = '';
                form.appendChild(successMessage);
                
                // Redirecionar para onboarding após 2 segundos
                setTimeout(() => {
                    window.location.href = 'onboarding.html';
                }, 2000);
            }
        });
    }

    // Máscara para telefone
    const telefone = document.getElementById('telefone');
    if (telefone) {
        telefone.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                e.target.value = value;
            }
        });
    }
}); 