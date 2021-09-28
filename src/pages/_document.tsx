import Document, { Html, Head, Main, NextScript } from "next/document"

function MyDocument() {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx)
  return { ...initialProps }
}

MyDocument.renderDocument = Document.renderDocument

export default MyDocument
