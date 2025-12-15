import React from 'react';
import { Helmet } from 'react-helmet-async';
import { APP_NAME } from '../constants';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    schema?: object; // Support for JSON-LD Structured Data
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    image,
    url,
    type = 'website',
    schema
}) => {
    const siteTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
    const metaDescription = description || 'เกมวงเหล้าออนไลน์ (Drinking Game) รวมเกมสนุกๆ ในวงเหล้า วงล้อเสี่ยงทาย หมุนขวด เกมไพ่ เล่นฟรีไม่ต้องโหลดแอป';
    const siteUrl = url || window.location.href;
    const metaImage = image || '/og-image.jpg'; // You should add a default OG image later

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={siteUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={siteUrl} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={metaImage} />

            {/* JSON-LD Structured Data for Rich Snippets */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
