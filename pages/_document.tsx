import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en" className="scrollbar-styles">
      <Head />
      <body>
        <Script src='/initializeTheme.js' strategy='beforeInteractive'/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
