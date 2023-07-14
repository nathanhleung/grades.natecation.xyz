"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

/**
 * Based on
 * https://stackoverflow.com/questions/75749102/how-to-implement-google-analytics-with-nextjs-13
 */
const GoogleAnalytics = () => {
    const pathname = usePathname();

    useEffect(() => {
        (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
            page_path: window.location.href,
        });
    }, [pathname]);

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