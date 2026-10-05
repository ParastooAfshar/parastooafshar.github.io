(function () {
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const themeMeta = document.getElementById('theme-color-meta');
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const systemTheme = () => media.matches ? 'dark' : 'light';
    const savedTheme = () => localStorage.getItem('theme');
    const currentTheme = () => root.dataset.theme || savedTheme() || systemTheme();

    const applyTheme = (theme, persist) => {
        root.dataset.theme = theme;
        if (persist) localStorage.setItem('theme', theme);
        if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#111214' : '#ffffff');
        if (toggle) {
            const nextTheme = theme === 'dark' ? 'light' : 'dark';
            toggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
            toggle.setAttribute('title', `Switch to ${nextTheme} theme`);
        }
    };

    applyTheme(currentTheme(), false);

    if (toggle) {
        toggle.addEventListener('click', () => {
            const nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme, true);
        });
    }

    media.addEventListener('change', () => {
        if (!savedTheme()) applyTheme(systemTheme(), false);
    });
})();
