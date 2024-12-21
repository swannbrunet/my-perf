import { useState } from 'react'
import style from './app.module.scss'
import { SessionExercices } from '../type/session'
import { useGlobalState } from '../contexts/globalState.context'
import SessionPage from '../components/session'

export default function HomePage() {

    const {session} = useGlobalState()

    if(session !== undefined) {
        return <SessionPage/>
    } else {
        return <div className={style.layout}>
        <img src="/logo.svg" />

        <h2>Suivez vos performances sportive à la salle !</h2>
    </div>
    }
}