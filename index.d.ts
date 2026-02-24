declare class GrabShot {
  constructor(apiKey: string, options?: { baseUrl?: string });
  screenshot(url: string, options?: {
    width?: number;
    height?: number;
    fullPage?: boolean;
    delay?: number;
    format?: 'png' | 'jpeg' | 'webp';
    quality?: number;
    device?: 'mobile' | 'tablet';
    darkMode?: boolean;
    selector?: string;
    retina?: boolean;
    blockAds?: boolean;
    frame?: 'iphone' | 'macbook' | 'browser';
    cleanup?: boolean;
  }): Promise<Buffer>;
  screenshotToFile(url: string, filePath: string, options?: Parameters<GrabShot['screenshot']>[1]): Promise<string>;
}

export = GrabShot;
export { GrabShot };
