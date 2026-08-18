export interface PixelConfig {
  facebookPixelId: string;
  tiktokPixelId: string;
  googleTagId: string;
  enabled: boolean;
}

const PIXEL_CONFIG_KEY = 'small_tracking_pixel_config';

export function getPixelConfig(): PixelConfig {
  try {
    const raw = localStorage.getItem(PIXEL_CONFIG_KEY);
    if (!raw) {
      return {
        facebookPixelId: '',
        tiktokPixelId: '',
        googleTagId: '',
        enabled: true,
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      facebookPixelId: '',
      tiktokPixelId: '',
      googleTagId: '',
      enabled: true,
    };
  }
}

export function savePixelConfig(config: PixelConfig) {
  localStorage.setItem(PIXEL_CONFIG_KEY, JSON.stringify(config));
  initTrackingPixels();
}

/**
 * Initialize Facebook Meta Pixel and other tracking pixels dynamically
 */
export function initTrackingPixels() {
  if (typeof window === 'undefined') return;

  const config = getPixelConfig();
  if (!config.enabled) return;

  // 1. Facebook Meta Pixel Init
  if (config.facebookPixelId && config.facebookPixelId.trim().length > 4) {
    const pixelId = config.facebookPixelId.trim();

    // Check if fbq script already exists
    if (!(window as any).fbq) {
      /* eslint-disable */
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
    }

    if ((window as any).fbq) {
      (window as any).fbq('init', pixelId);
      (window as any).fbq('track', 'PageView');
      console.log(`[Tracking] Facebook Pixel initialized: ${pixelId}`);
    }
  }

  // 2. TikTok Pixel Init
  if (config.tiktokPixelId && config.tiktokPixelId.trim().length > 4) {
    const ttId = config.tiktokPixelId.trim();
    if (!(window as any).ttq) {
      /* eslint-disable */
      (function (w: any, d: any, t: any) {
        w.TiktokAnalyticsObject = t;
        var ttq = (w[t] = w[t] || []);
        ttq.methods = [
          'page',
          'track',
          'identify',
          'instances',
          'debug',
          'on',
          'off',
          'once',
          'ready',
          'alias',
          'group',
          'enableCookie',
          'disableCookie',
        ];
        ttq.setAndDefer = function (t: any, e: any) {
          t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          };
        };
        for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
        ttq.instance = function (t: any) {
          for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)
            ttq.setAndDefer(e, ttq.methods[n]);
          return e;
        };
        ttq.load = function (e: any, n: any) {
          var i = 'https://analytics.tiktok.com/i18n/pixel/events.js';
          (ttq._i = ttq._i || {}),
            (ttq._i[e] = []),
            (ttq._i[e]._u = i),
            (ttq._t = ttq._t || {}),
            (ttq._t[e] = +new Date()),
            (ttq._o = ttq._o || {}),
            (ttq._o[e] = n || {});
          var o = document.createElement('script');
          (o.type = 'text/javascript'), (o.async = !0), (o.src = i + '?sdkid=' + e + '&lib=' + t);
          var a = document.getElementsByTagName('script')[0];
          a.parentNode?.insertBefore(o, a);
        };
      })(window, document, 'ttq');
      /* eslint-enable */
    }
    if ((window as any).ttq) {
      (window as any).ttq.load(ttId);
      (window as any).ttq.page();
      console.log(`[Tracking] TikTok Pixel initialized: ${ttId}`);
    }
  }
}

/**
 * Track Product View / Content View event
 */
export function trackViewContent(title: string, price: number) {
  if (typeof window === 'undefined') return;

  // Facebook
  if ((window as any).fbq) {
    (window as any).fbq('track', 'ViewContent', {
      content_name: title,
      content_category: 'Đệm Massage Toàn Thân',
      value: price,
      currency: 'VND',
    });
  }

  // TikTok
  if ((window as any).ttq) {
    (window as any).ttq.track('ViewContent', {
      content_name: title,
      value: price,
      currency: 'VND',
    });
  }
}

/**
 * Track Initiate Checkout (Khi khách chọn combo hoặc bắt đầu nhập form)
 */
export function trackInitiateCheckout(comboTitle: string, price: number) {
  if (typeof window === 'undefined') return;

  // Facebook
  if ((window as any).fbq) {
    (window as any).fbq('track', 'InitiateCheckout', {
      content_name: comboTitle,
      value: price,
      currency: 'VND',
      num_items: 1,
    });
  }

  // TikTok
  if ((window as any).ttq) {
    (window as any).ttq.track('InitiateCheckout', {
      content_name: comboTitle,
      value: price,
      currency: 'VND',
    });
  }
}

/**
 * Track Purchase / Conversion (Khi khách bấm Đặt hàng thành công)
 */
export function trackPurchase(orderCode: string, comboTitle: string, price: number, quantity: number = 1) {
  if (typeof window === 'undefined') return;

  // Facebook Purchase Event
  if ((window as any).fbq) {
    (window as any).fbq('track', 'Purchase', {
      content_type: 'product',
      content_name: comboTitle,
      content_ids: [orderCode],
      value: price,
      currency: 'VND',
      num_items: quantity,
    });
    console.log(`[Tracking] Facebook Purchase event fired: ${orderCode} - ${price} VND`);
  }

  // TikTok Complete Payment Event
  if ((window as any).ttq) {
    (window as any).ttq.track('CompletePayment', {
      content_name: comboTitle,
      content_id: orderCode,
      value: price,
      currency: 'VND',
      quantity,
    });
  }
}
