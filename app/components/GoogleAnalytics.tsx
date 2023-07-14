"use client";

import Script from "next/script";

/**
 * Based on
 * https://stackoverflow.com/questions/75749102/how-to-implement-google-analytics-with-nextjs-13
 */
const GoogleAnalytics = () => {
    return (
        <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`} />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
                `}
            </Script>
        </>
    )
}

export { GoogleAnalytics }