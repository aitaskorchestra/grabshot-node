const https = require('https');
const http = require('http');

class GrabShot {
  /**
   * @param {string} apiKey - Your GrabShot API key from https://grabshot.dev/dashboard
   * @param {object} [options]
   * @param {string} [options.baseUrl] - API base URL (default: https://grabshot.dev)
   */
  constructor(apiKey, options = {}) {
    if (!apiKey) throw new Error('API key is required. Get one at https://grabshot.dev/dashboard');
    this.apiKey = apiKey;
    this.baseUrl = options.baseUrl || 'https://grabshot.dev';
  }

  /**
   * Take a screenshot of a URL
   * @param {string} url - URL to screenshot
   * @param {object} [options]
   * @param {number} [options.width=1280] - Viewport width (100-4000)
   * @param {number} [options.height] - Viewport height (100-4000)
   * @param {boolean} [options.fullPage=false] - Capture full page
   * @param {number} [options.delay=0] - Wait before capture (ms, 0-30000)
   * @param {string} [options.format='png'] - Image format: png, jpeg, webp
   * @param {number} [options.quality] - JPEG/WebP quality (1-100)
   * @param {string} [options.device] - Device emulation: mobile, tablet
   * @param {boolean} [options.darkMode=false] - Enable dark mode
   * @param {string} [options.selector] - CSS selector to capture
   * @param {boolean} [options.retina=false] - 2x resolution
   * @param {boolean} [options.blockAds=false] - Block ads
   * @param {string} [options.frame] - Add device frame: iphone, macbook, browser
   * @param {boolean} [options.cleanup=false] - AI cleanup (paid plans)
   * @returns {Promise<Buffer>} Screenshot image buffer
   */
  async screenshot(url, options = {}) {
    const params = new URLSearchParams({ url, ...this._cleanOptions(options) });
    const fullUrl = `${this.baseUrl}/v1/screenshot?${params}`;

    return new Promise((resolve, reject) => {
      const mod = fullUrl.startsWith('https') ? https : http;
      const req = mod.get(fullUrl, { headers: { 'X-API-Key': this.apiKey } }, (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const body = Buffer.concat(chunks);
          if (res.statusCode !== 200) {
            try {
              const err = JSON.parse(body.toString());
              reject(new Error(err.error || `HTTP ${res.statusCode}`));
            } catch {
              reject(new Error(`HTTP ${res.statusCode}`));
            }
            return;
          }
          resolve(body);
        });
      });
      req.on('error', reject);
    });
  }

  /**
   * Take a screenshot and save to file
   * @param {string} url - URL to screenshot
   * @param {string} filePath - Output file path
   * @param {object} [options] - Same as screenshot()
   * @returns {Promise<string>} File path
   */
  async screenshotToFile(url, filePath, options = {}) {
    const fs = require('fs');
    const buffer = await this.screenshot(url, options);
    fs.writeFileSync(filePath, buffer);
    return filePath;
  }

  _cleanOptions(opts) {
    const clean = {};
    for (const [k, v] of Object.entries(opts)) {
      if (v !== undefined && v !== null && v !== false) {
        clean[k] = v === true ? 'true' : String(v);
      }
    }
    return clean;
  }
}

module.exports = GrabShot;
module.exports.default = GrabShot;
module.exports.GrabShot = GrabShot;
