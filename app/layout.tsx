import './global.css'
// import GlobalStyle from "./GlobalStyle"
import { Metadata } from "next"
import Header from './(layouts)/header'
import styles from './layout.module.css'

export const metadata: Metadata = {
  title: {
    template: "%s | 4Q",
    default: "4Q",
  },
  description: '포토 큐알 자동 생성 서비스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        {/* <GlobalStyle /> */}
      <body className={styles.container}>
        <Header />
        <div className={styles.bodyContainer}>
        {children}
        </div>
        </body>
    </html>
  )
}
