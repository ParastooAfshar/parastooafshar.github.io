(function () {
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const label = document.getElementById('theme-label');
    const symbol = document.getElementById('theme-symbol');
    const themeMeta = document.getElementById('theme-color-meta');
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const systemTheme = () => media.matches ? 'dark' : 'light';
    const savedTheme = () => localStorage.getItem('theme');
    const currentTheme = () => root.dataset.theme || savedTheme() || systemTheme();

    function render(theme, persist) {
        root.dataset.theme = theme;
        if (persist) localStorage.setItem('theme', theme);

        const dark = theme === 'dark';
        if (label) label.textContent = dark ? 'Light' : 'Dark';
        if (symbol) symbol.textContent = dark ? '☀' : '☾';
        if (toggle) {
            toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
            toggle.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
        }
        if (themeMeta) themeMeta.setAttribute('content', dark ? '#101114' : '#f7f5f1');
    }

    render(currentTheme(), false);

    if (toggle) {
        toggle.addEventListener('click', function () {
            render(currentTheme() === 'dark' ? 'light' : 'dark', true);
        });
    }

    media.addEventListener('change', function () {
        if (!savedTheme()) render(systemTheme(), false);
    });
})();
