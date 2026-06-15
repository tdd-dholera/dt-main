const options = {
    autoConfig: true,
    debug: false,
  };
  
  export const initFacebookPixel = (pixelId) => {
    if (typeof window !== 'undefined') {
      import('react-facebook-pixel').then((ReactPixel) => {
        ReactPixel.default.init(pixelId, {}, options);
      });
    }
  };
  
  export const trackPageView = () => {
    if (typeof window !== 'undefined') {
      import('react-facebook-pixel').then((ReactPixel) => {
        ReactPixel.default.pageView();
      });
    }
  };
  
  export const trackEvent = (event, data = {}) => {
    if (typeof window !== 'undefined') {
      import('react-facebook-pixel').then((ReactPixel) => {
        ReactPixel.default.track(event, data);
      });
    }
  };
