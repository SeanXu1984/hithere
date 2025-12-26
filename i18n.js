// i18n system - loads translations from separate files
let currentTranslations = {};
let currentLang = 'ja'; // Default language is Japanese

// Translation files mapping
const translationFiles = {
    'ja': 'translations/ja.js',
    'en': 'translations/en.js',
    'zh-TW': 'translations/zh-TW.js',
    'de': 'translations/de.js',
    'ko': 'translations/ko.js'
};

// Map language codes to window variable names
const langVarMap = {
    'ja': 'translations_ja',
    'en': 'translations_en',
    'zh-TW': 'translations_zhTW',
    'de': 'translations_de',
    'ko': 'translations_ko'
};

// Load translation by creating a script tag
function loadTranslations(lang, callback) {
    const varName = langVarMap[lang];
    if (window[varName]) {
        // Translations already loaded
        currentTranslations = window[varName];
        currentLang = lang;
        if (callback) callback();
        return;
    }
    
    const script = document.createElement('script');
    script.src = translationFiles[lang];
    script.onload = () => {
        if (window[varName]) {
            currentTranslations = window[varName];
            currentLang = lang;
            if (callback) callback();
        }
    };
    script.onerror = () => {
        console.error(`Failed to load translations for ${lang}`);
        // Fallback to Japanese
        if (lang !== 'ja') {
            loadTranslations('ja', callback);
        }
    };
    document.head.appendChild(script);
}

// Get translation for a key
function t(key) {
    return currentTranslations[key] || key;
}

// Apply translations to all elements with data-i18n attribute
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else if (element.tagName === 'TITLE') {
                element.textContent = translation;
            } else {
                // Preserve HTML in links
                if (element.innerHTML.includes('<a')) {
                    const linkMatch = element.innerHTML.match(/<a[^>]*>([^<]*)<\/a>/);
                    if (linkMatch) {
                        element.innerHTML = translation.replace(linkMatch[1], linkMatch[0]);
                    } else {
                        element.textContent = translation;
                    }
                } else {
                    element.textContent = translation;
                }
            }
        }
    });
    
    // Update page title
    const titleElement = document.querySelector('title[data-i18n]');
    if (titleElement) {
        document.title = t(titleElement.getAttribute('data-i18n'));
    } else {
        // Try to find title in translations
        const pageTitleKey = document.querySelector('h1')?.getAttribute('data-i18n');
        if (pageTitleKey) {
            const title = t(pageTitleKey);
            if (title) document.title = title + ' - Hi There';
        }
    }
}

// Initialize i18n
function initI18n() {
    // Get language from localStorage or URL parameter or default to Japanese
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const storedLang = localStorage.getItem('preferredLanguage');
    const lang = langParam || storedLang || 'ja';
    
    loadTranslations(lang, () => {
        applyTranslations();
        
        // Update language selector
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.value = lang;
        }
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    });
}

// Change language
function changeLanguage(lang) {
    loadTranslations(lang, () => {
        applyTranslations();
        localStorage.setItem('preferredLanguage', lang);
        
        // Update language selector
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.value = lang;
        }
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update URL without reload (optional)
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);
    });
}

// Export for use in script.js
window.i18n = {
    init: initI18n,
    changeLanguage: changeLanguage,
    t: t
};
