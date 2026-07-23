document.addEventListener('DOMContentLoaded', () => {
    const themeToggler = document.getElementById('themeToggler');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    const htmlElement = document.documentElement;

    themeToggler.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        
        if (currentTheme === 'dark') {
            htmlElement.setAttribute('data-bs-theme', 'light');
            themeIcon.className = 'bi bi-moon-stars-fill';
            themeText.textContent = 'Modo Oscuro';
        } else {
            htmlElement.setAttribute('data-bs-theme', 'dark');
            themeIcon.className = 'bi bi-sun-fill';
            themeText.textContent = 'Modo Claro';
        }
    });
});