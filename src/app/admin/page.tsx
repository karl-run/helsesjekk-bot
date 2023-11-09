import * as R from 'remeda'
import React, { ReactElement } from 'react'
import { notFound } from 'next/navigation'

import { Heading, Detail, BodyShort } from 'aksel-server'

import { userHasAdGroup, validateWonderwallToken } from '../../auth/authentication'
import { adminGetTeamsWithAsked } from '../../db/admin'
import { isLocal } from '../../utils/env'
import BackLink from '../../components/core/BackLink'
import { dayIndexToDay } from '../../utils/date'
import { InactiveDot, PingDot } from '../../components/core/Dots'
import { questionsFromJsonb } from '../../questions/jsonb-utils'

async function Page(): Promise<ReactElement> {
    await validateWonderwallToken('/admin')

    if (!(await userHasAdGroup(getAdminGroupId()))) {
        return notFound()
    }

    const teams = await adminGetTeamsWithAsked()
    const sortedTeams = R.pipe(teams, R.sortBy([(team) => team.active, 'desc'], [(team) => team.Asked.length, 'desc']))

    return (
        <div>
            <BackLink href="/" />
            <Heading size="large">Alle team</Heading>
            <div className="flex gap-3 flex-wrap">
                {sortedTeams.map((team) => (
                    <div key={team.id} className="bg-bg-subtle p-4 rounded">
                        <Heading level="2" size="medium" className="flex items-center gap-2 mb-2">
                            {team.active ? <PingDot /> : <InactiveDot />}
                            {team.name}
                        </Heading>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <TeamDetail
                                text="Spør"
                                detail={`${dayIndexToDay(team.postDay)}, kl. ${team.postHour}:00`}
                            />
                            <TeamDetail
                                text="Viser"
                                detail={`${dayIndexToDay(team.revealDay)}, kl. ${team.revealDay}:00`}
                            />
                            <TeamDetail text="Frekvens" detail={`${team.frequency}`} />
                            <TeamDetail text="Ukesjustering" detail={`+${team.weekSkew}`} />
                            <TeamDetail text="Spørringer" detail={`${team.Asked.length}`} />
                            <TeamDetail
                                text="Uten svar"
                                detail={`${team.Asked.filter((it) => it._count.answers === 0).length}`}
                            />
                            <TeamDetail text="Spørsmål" detail={`${questionsFromJsonb(team.questions).length}`} />
                            <TeamDetail
                                text="Egne spørsmål"
                                detail={`${questionsFromJsonb(team.questions).filter((it) => it.custom).length}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function TeamDetail({ text, detail }: { text: string; detail: string }): ReactElement {
    return (
        <div className="bg-white p-2 rounded">
            <BodyShort>{text}</BodyShort>
            <Detail>{detail}</Detail>
        </div>
    )
}

function getAdminGroupId(): string {
    if (isLocal) return 'fake-group'

    return '14f8fff0-dfad-4eb6-b67e-d0faad6a5263'
}

export default Page
