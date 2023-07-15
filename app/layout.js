import {Head, Main, NextScript} from "next/document"
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `APP - %s - ${siteMetadata.title}`
  },
  description: siteMetadata.description,
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({children}) {
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </Head>
      <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
      APP FOLDER layout.js
      {children}
      {/*<Main />*/}
      {/*<NextScript />*/}
      </body>
    </html>
  )
}
