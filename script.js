// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize i18n
    await window.i18n.init();
    
    // Set up language selector
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', async (e) => {
            const selectedLang = e.target.value;
            await window.i18n.changeLanguage(selectedLang);
        });
    }
});

