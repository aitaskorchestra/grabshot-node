# grabshot

Take website screenshots with one line of code. No browser, no Puppeteer, no infrastructure.

## Install

```bash
npm install grabshot
```

## Quick Start

```js
const GrabShot = require('grabshot');
const client = new GrabShot('your-api-key');

// Get screenshot as Buffer
const image = await client.screenshot('https://github.com');

// Save to file
await client.screenshotToFile('https://github.com', 'github.png');
```

Get your free API key at [grabshot.dev/dashboard](https://grabshot.dev/dashboard) (25 screenshots/month free).

## Options

```js
await client.screenshot('https://example.com', {
  width: 1440,        // Viewport width (100-4000)
  height: 900,        // Viewport height (100-4000)
  fullPage: true,     // Capture entire page
  delay: 2000,        // Wait 2s before capture
  format: 'jpeg',     // png, jpeg, or webp
  quality: 85,        // JPEG/WebP quality (1-100)
  device: 'mobile',   // mobile or tablet emulation
  darkMode: true,     // Dark mode
  selector: '#hero',  // Capture specific element
  retina: true,       // 2x resolution
  blockAds: true,     // Block ads
  frame: 'macbook',   // Device frame: iphone, macbook, browser
  cleanup: true,      // AI-powered popup/cookie cleanup (paid)
});
```

## Plans

| Plan | Screenshots/mo | Price |
|------|---------------|-------|
| Free | 25 | $0 |
| Starter | 1,000 | $9/mo |
| Pro | 10,000 | $29/mo |
| Business | 50,000 | $79/mo |

## Links

- [Dashboard](https://grabshot.dev/dashboard) - Get your API key
- [API Docs](https://grabshot.dev/docs) - Full API reference
- [Website](https://grabshot.dev) - Learn more

## License

MIT
