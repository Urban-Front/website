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
        <link rel="icon" type="image/png" href="" sizes="16x16" />
        <link rel="icon" type="image/png" href="" sizes="32x32" />
        <link rel="icon" type="image/png" href="" sizes="96x96" />
        <meta name="description" content="" />
        {/* Facebook */}
        <meta name="og:title" content="" />
        <meta property="og:url" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />
        <meta property="og:image:width" content=""/>
        <meta property="og:image:height" content="" />
        <meta property="og:image:alt" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="" />
        <meta property="og:locale" content="en_US" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:url" content="" />
        <meta name="twitter:title" content="" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:image:alt" content="" />
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
