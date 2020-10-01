// The modules
import Head from 'next/head';
import Header from 'components/site/Header';
import Footer from 'components/site/Footer';

export default function Layout({
  className = '',
  headerClassName = '',
  preview = false,
  children
}) {
  return (
    <>
      <Head>
        <title>Urban Front</title>
        <link rel="icon" type="image/png" href="images/favicon.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="images/favicon.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="images/favicon.png" sizes="96x96" />
        <meta name="description" content="Urban Front is a transnational consultancy focused on helping progressive public and social sectors achieve their goals as they address the critical urban problems of the 21st century." />
        {/* Facebook */}
        <meta name="og:title" content="Urban Front" />
        <meta property="og:url" content="https://www.urban-front.com" />
        <meta property="og:description" content="Urban Front is a transnational consultancy focused on helping progressive public and social sectors achieve their goals as they address the critical urban problems of the 21st century." />
        <meta property="og:image" content="images/og.jpg" />
        <meta property="og:image:width" content="1500"/>
        <meta property="og:image:height" content="624" />
        <meta property="og:image:alt" content="Urban Front" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Urban Front" />
        <meta property="og:locale" content="en_US" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://twitter.com/front_urban" />
        <meta name="twitter:url" content="https://www.urban-front.com" />
        <meta name="twitter:title" content="Urban Front" />
        <meta name="twitter:description" content="Urban Front is a transnational consultancy focused on helping progressive public and social sectors achieve their goals as they address the critical urban problems of the 21st century." />
        <meta name="twitter:image" content="images/og.jpg" />
        <meta name="twitter:image:alt" content="Urban Front" />
        {/* Fonts */}
        <link rel="stylesheet" href="https://use.typekit.net/azm8zbm.css" />
      </Head>
      <div className={`Body ${className}`}>
        <Header preview={preview} className={headerClassName} />
        <main className="Main">
          {children}
        </main>
        <Footer />
      </div>
      {preview && (
        <div className="Preview-warning">
          <p>You are looking at the website in preview mode, which displays unpublished changes from Contentful.</p>
        </div>
      )}
    </>
  )
}
