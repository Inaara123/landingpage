// FacebookPixel.js

export const FB_PIXEL = {
    init: (pixelId) => {
        // Add Facebook Pixel Event Code
        const script = document.createElement('script');
        script.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
        `;
        document.head.appendChild(script);
    },

    pageView: () => {
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'PageView');
        }
    },

    track: (eventName, params = {}) => {
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', eventName, params);
        }
    }
};

export default FB_PIXEL;