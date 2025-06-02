# AnyPost Vue 3 Application

A modern Vue 3 application for sharing content across multiple social media platforms.

## Features

- 🌐 **Multi-platform support**: Mastodon, Misskey, Twitter, Facebook, and more
- 🎨 **Modern UI**: Built with Vue 3 + Composition API and Tailwind CSS
- 🌍 **Internationalization**: Full i18n support (Japanese/English)
- 🍪 **Cookie Compliance**: GDPR-compliant cookie banner
- 📱 **Responsive**: Mobile-first responsive design
- ⚡ **Fast**: Optimized for performance
- 🔒 **Privacy-focused**: No data storage, privacy-first design

## Tech Stack

- **Frontend**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Styling**: Tailwind CSS
- **Internationalization**: Vue I18n
- **HTTP Client**: Axios
- **Build Tool**: Vue CLI

## Project Setup

### Prerequisites

- Node.js 16+ and npm/yarn
- Modern browser with ES6+ support

### Installation

```bash
# Clone the repository
git clone 
cd anypost-vue3

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Compile and hot-reload for development
npm run serve
# or
yarn serve
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### Production Build

```bash
# Compile and minify for production
npm run build
# or
yarn build
```

### Linting

```bash
# Lint and fix files
npm run lint
# or
yarn lint
```

## Project Structure

```
src/
├── assets/           # Static assets (CSS, images)
├── components/       # Reusable Vue components
├── locales/         # Internationalization files
├── router/          # Vue Router configuration
├── stores/          # Pinia stores
├── utils/           # Utility functions
├── views/           # Page components
├── App.vue          # Root component
└── main.js          # Application entry point
```

## Key Components

### Stores

- **instanceStore.js**: Manages social media instance detection and URL generation

### Components

- **CookieBanner.vue**: GDPR-compliant cookie consent banner
- **LanguageSwitcher.vue**: Language selection component

### Views

- **ShareApp.vue**: Main sharing interface
- **TopPage.vue**: Landing page
- **HowToPage.vue**: Usage instructions
- **PrivacyPage.vue**: Privacy policy

## API Integration

The application integrates with the AnyPost API:

```
GET https://anypost.dev/api/v1/instances/{server_name}
```

Returns instance type information for generating appropriate sharing URLs.

## Supported Platforms

- **Mastodon**: Standard ActivityPub platform
- **Misskey**: Japanese-origin federated platform
- **Pleroma**: Lightweight ActivityPub server
- **Twitter**: Traditional social media
- **Facebook**: Link sharing
- **And more**: Extensible architecture for additional platforms

## URL Parameters

The application supports URL parameters for pre-filling the sharing form:

- `i`: Instance name
- `t`: Text content
- `s`: URL to share
- `v`: Visibility setting
- `h`: Hashtag
- `a`: Auto-redirect flag

Example:
```
/share?i=mastodon.social&t=Hello%20World&s=https://example.com&v=public&a=1
```

## Internationalization

The application supports multiple languages through Vue I18n:

- **Japanese** (`ja`): Default for Japanese users
- **English** (`en`): Default for international users

Language is automatically detected from browser settings and can be manually switched.

## Privacy & Compliance

- **No data storage**: All processing happens client-side
- **Cookie compliance**: GDPR-compliant cookie banner
- **Privacy-first**: Minimal data collection
- **Transparent**: Open source and auditable

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[MIT License](LICENSE)

## Support

For questions or issues, please open an issue on the repository or contact the maintainers.