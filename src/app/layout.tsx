import './global.css'

import { PropsWithChildren, ReactElement } from 'react'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { validateWonderwallToken } from '../auth/authentication'

export default async function RootLayout({ children }: PropsWithChildren): Promise<ReactElement> {
    await validateWonderwallToken('/')

    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <Header />
                <main className="container p-4 sm:p-16 sm:pt-4 min-h-fit grow">
                    <NuqsAdapter>{children}</NuqsAdapter>
                </main>
                <Footer />
            </body>
        </html>
    )
}
