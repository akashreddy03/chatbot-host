if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme')) && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.add('scrollbar-thumb-slate-600');
    localStorage.setItem('theme', 'dark');
}