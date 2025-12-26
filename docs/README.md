# Hi There - GitHub Pages Website

This is the GitHub Pages website for the Hi There app, providing information about the app, privacy policy, and support.

## Features

- Multi-language support (Japanese, English, Traditional Chinese, German, Korean)
- Responsive design
- Privacy Policy page
- Support page with contact information

## Setup for GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Select the branch (usually `main` or `master`)
4. Select the folder (usually `/ (root)`)
5. Save

The website will be available at `https://yourusername.github.io/hithere/`

## File Structure

```
hithere/
├── index.html          # Home page
├── privacy.html        # Privacy policy page
├── support.html        # Support page
├── styles.css          # Main stylesheet
├── i18n.js             # Internationalization loader
├── script.js           # Main JavaScript
├── translations/       # Translation files
│   ├── ja.js          # Japanese (default)
│   ├── en.js          # English
│   ├── zh-TW.js       # Traditional Chinese
│   ├── de.js          # German
│   └── ko.js          # Korean
└── README.md
```

## Adding New Translations

1. Create a new file in `translations/` folder (e.g., `fr.js` for French)
2. Follow the same structure as existing translation files
3. Add the language option to the language selector in all HTML files
4. Update the `i18n.js` file if needed

## Contact Information

- Email: xuxiaolai@hotmail.com
- Phone: +86 180 8094 0108
- Contact Person: Sean Xu

