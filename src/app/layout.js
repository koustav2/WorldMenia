'use client'
import ThemeContext, { ThemeProvider, useTheme } from '@/context/themeContext'
import './globals.css'
import Header from './components/Header'

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}

function LayoutContent({ children }) {
  const { theme } = useTheme();

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href={`styles/${theme}-theme.css`}
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}