'use client';

import Script from 'next/script';

export default function TaboolaPixel() {
  return (
    <>
      <Script id="taboola-base" strategy="afterInteractive">
        {`
          window._tfa = window._tfa || [];
          window._tfa.push({ notify: 'event', name: 'page_view', id: 2018249 });
          
          (function (t, f, a, x) {
            if (!document.getElementById(x)) {
              t.async = 1;
              t.src = a;
              t.id = x;
              f.parentNode.insertBefore(t, f);
            }
          })(
            document.createElement('script'),
            document.getElementsByTagName('script')[0],
            '//cdn.taboola.com/libtrc/unip/2018249/tfa.js',
            'tb_tfa_script'
          );
        `}
      </Script>
    </>
  );
}