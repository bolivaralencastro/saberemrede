document.addEventListener('DOMContentLoaded', function() {
    // Adiciona animação de entrada aos cards
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Adiciona efeito hover nos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Verifica se o usuário já completou o onboarding
    const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted');
    if (hasCompletedOnboarding) {
        // Redireciona para o dashboard se já completou
        window.location.href = 'index.html';
    }

    // Salva o progresso do onboarding
    function saveOnboardingProgress() {
        localStorage.setItem('onboardingCompleted', 'true');
    }

    // Adiciona eventos aos botões de ação
    const actionButtons = document.querySelectorAll('.btn-primary, .btn-outline-primary');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            saveOnboardingProgress();
        });
    });

    // Adiciona evento ao botão de pular
    const skipButton = document.querySelector('.btn-link');
    if (skipButton) {
        skipButton.addEventListener('click', function(e) {
            e.preventDefault();
            saveOnboardingProgress();
            window.location.href = 'index.html';
        });
    }
}); 