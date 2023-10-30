import React, { ReactElement, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import logo from '../images/logo.png'

import LoggedInUser, { LoggedInUserSkeleton } from './LoggedInUser'

import { Heading, Detail } from 'aksel-server'

function Header(): ReactElement {
    return (
        <div>
            <header className="flex justify-between">
                <Link href="/" className="flex w-full p-4 text-grayalpha-900">
                    <Image className="object-contain" src={logo} alt="" aria-hidden height={48} />
                    <div className="pl-4">
                        <Heading size="large">Helsesjekk</Heading>
                        <Detail>En helsesjekk-bot for ditt autonome team</Detail>
                    </div>
                </Link>
                <div>
                    <Suspense fallback={<LoggedInUserSkeleton />}>
                        <LoggedInUser />
                    </Suspense>
                </div>
            </header>
            <div className="ml-20 mb-8 flex gap-4">
                <Link href="/">Mine team</Link>
                <Link href="/hva-er-helsesjekk">Hva er helsesjekk</Link>
                <Link href="/kom-i-gang">Kom i gang</Link>
                <Link href="/kom-i-gang/grupper">Mine grupper</Link>
            </div>
        </div>
    )
}

export default Header
