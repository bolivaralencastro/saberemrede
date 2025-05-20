function setActiveTab(tabId) {
    document.querySelectorAll('.main-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.header-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelectorAll('.mobile-sidebar .nav-item').forEach(item => {
        item.classList.remove('active');
    });

    document.getElementById(`page-${tabId}`).classList.add('active');
    document.getElementById(`header-nav-${tabId}`).classList.add('active');
    document.getElementById(`mobile-sidebar-item-${tabId}`).classList.add('active');

    closeMobileSidebar();
    closeUserMenu();

    window.scrollTo(0, 0);
}

function openRegulamento() { 
    window.open("https://sabemrede.com/regulamento", "_blank"); 
}

function closeModalById(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

function initShareModal() {
    const modal = document.getElementById('shareModal');
    const openBtn = document.getElementById('headerOpenShareModalBtn');
    const closeBtn = document.getElementById('closeShareModal');
    const copyBtn = document.getElementById('copyLinkFromModalBtn');
    const linkInput = document.getElementById('affiliateLinkModalInput');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeModalById('shareModal');
        });
    }

    if (copyBtn && linkInput) {
        copyBtn.addEventListener('click', () => {
            linkInput.select();
            document.execCommand('copy');
            copyBtn.innerHTML = '<span class="material-icons-sharp">check</span> Copiado!';
            setTimeout(() => {
                copyBtn.innerHTML = '<span class="material-icons-sharp">content_copy</span> Copiar Link';
            }, 2000);
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalById('shareModal');
        }
    });
}

function initPageShareActions() {
    const copyBtn = document.getElementById('mainCopyBtnPage');
    const linkInput = document.getElementById('affiliateLinkInputPage');

    if (copyBtn && linkInput) {
        copyBtn.addEventListener('click', () => {
            linkInput.select();
            document.execCommand('copy');
            copyBtn.innerHTML = '<span class="material-icons-sharp">check</span> Copiado!';
            setTimeout(() => {
                copyBtn.innerHTML = '<span class="material-icons-sharp">link</span> Copiar';
            }, 2000);
        });
    }
}

function initUserMenu() {
    const userMenuToggle = document.getElementById('userMenuToggle');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    const headerUserSection = document.querySelector('.header-user-section');

    if (headerUserSection && userDropdownMenu) {
        headerUserSection.addEventListener('click', (event) => {
            event.stopPropagation();
            userDropdownMenu.classList.toggle('active');
            if(userMenuToggle) userMenuToggle.setAttribute('aria-expanded', userDropdownMenu.classList.contains('active'));
        });

        document.addEventListener('click', (event) => {
            if (!userDropdownMenu.contains(event.target) && !headerUserSection.contains(event.target)) {
                closeUserMenu();
            }
        });
    }
}

function closeUserMenu() {
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    const userMenuToggle = document.getElementById('userMenuToggle');
    
    if (userDropdownMenu) {
        userDropdownMenu.classList.remove('active');
        if(userMenuToggle) userMenuToggle.setAttribute('aria-expanded', 'false');
    }
}

function initMobileSidebar() {
    const toggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('mobileSidebarOverlay');
    const closeBtn = document.getElementById('mobileSidebarClose');

    if (toggle && sidebar && overlay) {
        toggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', closeMobileSidebar);
        overlay.addEventListener('click', closeMobileSidebar);
    }
}

function closeMobileSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('mobileSidebarOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initWithdrawalModal() {
    const modal = document.getElementById('withdrawalModal');
    const openBtn = document.getElementById('openWithdrawalModalBtn');
    const closeBtn = document.getElementById('closeWithdrawalModal');

    if (openBtn) {
        openBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link
            closeUserMenu(); // Fecha o dropdown do perfil
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeModalById('withdrawalModal');
        });
    }

    if (modal) {
         modal.addEventListener('click', (e) => {
             if (e.target === modal) {
                 closeModalById('withdrawalModal');
             }
         });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initShareModal();
    initPageShareActions();
    initUserMenu();
    initMobileSidebar();
    initWithdrawalModal(); // Inicializa a modal de saque

    setActiveTab('indicacoes');

    const userBalanceHeader = document.getElementById('userBalanceHeader');
    if (userBalanceHeader) {
        userBalanceHeader.addEventListener('click', () => {
            setActiveTab('carteira');
            if (document.body.classList.contains('mobile-sidebar-open')) closeMobileSidebar();
            closeUserMenu();
        });
    }
}); 