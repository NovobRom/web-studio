import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
import { Instrument_Serif, DM_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import { BASE_URL } from "@/config/constants";
import { LenisScroll } from "@/components/ui/LenisScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CookieConsent } from "@/components/ui/CookieConsent";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: "Roman Novobranets",
      type: "website",
      locale: locale,
      url: `${BASE_URL}/${locale}`,
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${BASE_URL}/og-image.jpg`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        "name": "Roman Novobranets",
        "url": BASE_URL,
        "jobTitle": "Web Developer",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Vilnius",
          "addressCountry": "LT",
        },
        "sameAs": [],
      },
      {
        "@type": "Service",
        "provider": { "@id": `${BASE_URL}/#person` },
        "name": "Landing Page Development",
        "description": "Fast, beautiful websites for service businesses. Go live from 2 days.",
        "areaServed": "LT",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": "350",
          "url": BASE_URL,
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does it take to create a website?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "On average, from 2 to 5 days, depending on the complexity of the project and the availability of your ready materials (texts, photos).",
            },
          },
          {
            "@type": "Question",
            "name": "What if I don't like the design?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Before the final launch, we approve the layout. I make iterations of edits so that you are completely satisfied with the result.",
            },
          },
          {
            "@type": "Question",
            "name": "How does the payment work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The payment is divided into two parts: a 50% advance payment before starting the work and the remaining 50% after the approval and launch of the site.",
            },
          },
          {
            "@type": "Question",
            "name": "Do I need to pay for website support later?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The 'Full Launch' package includes 1 month of support. After that, you can either administer the site yourself or request one-time paid assistance.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html
      lang={locale}
      className={`${instrumentSerif.variable} ${dmSans.variable}`}
    >
      <body>
        <style>{`@media (pointer: fine) { *, *::before, *::after { cursor: none !important; } }`}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                if (localStorage.getItem('cookie-consent') === 'accepted') {
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                }
              `}
            </Script>
          </>
        )}

        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              if (localStorage.getItem('cookie-consent') === 'accepted') {
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                fbq('track', 'PageView');
              }
            `}
          </Script>
        )}

        <NextIntlClientProvider messages={messages}>
          <CustomCursor />
          <LenisScroll>{children}</LenisScroll>
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
