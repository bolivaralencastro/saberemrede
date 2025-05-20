document.addEventListener('DOMContentLoaded', () => {
        const indicacoesTabBtn = document.getElementById('header-nav-indicacoes-showcase');
        const carteiraTabBtn = document.getElementById('header-nav-carteira-showcase');
        const indicacoesPage = document.getElementById('page-indicacoes-showcase');
        const carteiraPage = document.getElementById('page-carteira-showcase');

        // Função para ativar uma aba
        function activateTab(tabId) {
            // Remover 'active' de todos os botões de aba
            indicacoesTabBtn.classList.remove('active');
            carteiraTabBtn.classList.remove('active');

            // Ocultar todas as páginas de conteúdo
            indicacoesPage.style.display = 'none';
            carteiraPage.style.display = 'none';

            // Ativar o botão e mostrar a página da aba selecionada
            if (tabId === 'indicacoes') {
                indicacoesTabBtn.classList.add('active');
                indicacoesPage.style.display = 'block'; // Usar 'block' ou 'flex' dependendo do layout principal
            } else if (tabId === 'carteira') {
                carteiraTabBtn.classList.add('active');
                carteiraPage.style.display = 'block'; // Usar 'block' ou 'flex' dependendo do layout principal
            }
        }

        // Adicionar event listeners aos botões das abas
        indicacoesTabBtn.addEventListener('click', () => {
            activateTab('indicacoes');
        });

        carteiraTabBtn.addEventListener('click', () => {
            activateTab('carteira');
        });

        // Ativar a aba inicial (Minhas Indicações)
        activateTab('indicacoes');

        // --- Funcionalidade para abrir e fechar o Modal de Indicação --- //
        const openModalHeaderBtn = document.getElementById('headerOpenShareModalBtn-showcase');
        const openModalIndicacoesBtn = document.getElementById('emptyStateIndicacoesCta-showcase');
        const openModalCarteiraBtn = document.getElementById('emptyStateCarteiraCta-showcase');
        const shareModal = document.getElementById('shareModal-showcase');
        const closeModalBtn = document.getElementById('closeShareModal-showcase');

        // Função para abrir o modal
        function openShareModal() {
            if (shareModal) {
                shareModal.style.display = 'flex'; // Garante que o overlay seja visível
                setTimeout(() => {
                    shareModal.classList.add('active'); // Adiciona a classe 'active' para a transição de opacidade e escala
                }, 10); // Pequeno delay para permitir que a mudança de display seja processada antes de adicionar a classe
            }
        }

        // Função para fechar o modal
        function closeShareModal() {
            if (shareModal) {
                shareModal.classList.remove('active'); // Remove a classe 'active' para a transição de volta
                setTimeout(() => {
                    shareModal.style.display = 'none'; // Oculta o overlay após a transição
                }, 300); // Oculta após a duração da transição (ajustar se a transição CSS for diferente de 0.3s)
            }
        }

        // Adicionar event listeners aos botões que abrem o modal
        if (openModalHeaderBtn) {
            openModalHeaderBtn.addEventListener('click', openShareModal);
        }
        if (openModalIndicacoesBtn) {
            openModalIndicacoesBtn.addEventListener('click', openShareModal);
        }
        if (openModalCarteiraBtn) {
            openModalCarteiraBtn.addEventListener('click', openShareModal);
        }

        // Adicionar event listener ao botão de fechar do modal
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeShareModal);
        }
        // Fechar modal ao clicar fora do conteúdo (overlay)
        if (shareModal) {
            shareModal.addEventListener('click', (e) => {
                if (e.target === shareModal) {
                    closeShareModal();
                }
            });
        }
        // -------------------------------------------------------------- //

        // --- Funcionalidade de Copiar Link no Modal --- //
        const copyLinkBtn = document.getElementById('copyLinkFromModalBtn-showcase');
        const affiliateLinkInput = document.getElementById('affiliateLinkModalInput-showcase');
        const copySuccessMessage = document.querySelector('.copy-success-message');

        if (copyLinkBtn && affiliateLinkInput && copySuccessMessage) {
            copyLinkBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(affiliateLinkInput.value);
                    // Exibir mensagem de sucesso
                    copySuccessMessage.style.display = 'inline'; // ou 'block' dependendo do display original
                    // Ocultar mensagem após alguns segundos
                    setTimeout(() => {
                        copySuccessMessage.style.display = 'none';
                    }, 3000);
                } catch (err) {
                    console.error('Falha ao copiar o link: ', err);
                    // Opcional: mostrar uma mensagem de erro para o usuário
                }
            });
        }
        // ---------------------------------------------- //

        // --- Funcionalidade para abrir e fechar o Dropdown do Usuário --- //
        const userMenuToggle = document.getElementById('userMenuToggle-showcase');
        const userDropdownMenu = document.getElementById('userDropdownMenu-showcase');

        // Função para fechar o menu dropdown do usuário
        function closeUserMenu() {
            if (userDropdownMenu) {
                userDropdownMenu.classList.remove('active');
                setTimeout(() => {
                    userDropdownMenu.style.display = 'none';
                    if (userMenuToggle) {
                        userMenuToggle.setAttribute('aria-expanded', 'false');
                    }
                }, 300); // Tempo deve ser igual ou maior que a transição CSS
            }
        }

        // Função para abrir o menu dropdown do usuário
        function openUserMenu() {
            if (userDropdownMenu) {
                userDropdownMenu.style.display = 'block'; // Use 'block' ou 'flex' dependendo do seu layout
                setTimeout(() => {
                     userDropdownMenu.classList.add('active');
                     if (userMenuToggle) {
                         userMenuToggle.setAttribute('aria-expanded', 'true');
                     }
                }, 10);
            }
        }

        // Adicionar event listener ao botão de toggle do menu
        if (userMenuToggle) {
            userMenuToggle.addEventListener('click', (event) => {
                event.stopPropagation(); // Impede que o clique no botão feche o menu imediatamente
                const isExpanded = userMenuToggle.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    closeUserMenu();
                } else {
                    openUserMenu();
                }
            });
        }

        // Fechar o menu se clicar fora dele
        document.addEventListener('click', (event) => {
            if (userDropdownMenu && userMenuToggle && !userDropdownMenu.contains(event.target) && !userMenuToggle.contains(event.target)) {
                closeUserMenu();
            }
        });

        // Fechar o menu ao redimensionar a janela (útil para mobile)
        window.addEventListener('resize', closeUserMenu);
        // ------------------------------------------------------------- //

    }); 