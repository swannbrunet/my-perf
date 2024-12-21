import { useCallback, useState } from 'react'
import style from './session.module.scss'
import { PerfRecord } from '../perfRecord/perfRecord'
import { Timer } from '../timer/timer'
import { useGlobalState } from '../../contexts/globalState.context'
import ExerciceSelector from '../exerciceSelector/ExerciceSelector'

export default function Session() {

    const [exerciceType, setExerciceType] = useState<string>("")
    const { session, setSession } = useGlobalState()

    if(session) {

    return <div className={style.container}>
        <Timer/>
        <ExerciceSelector exerciceType={exerciceType} setExerciceType={setExerciceType} />
        {exerciceType !== "" && <PerfRecord exerciceType={exerciceType} session={session} setSession={setSession} />}
    </div>
    } else {
        return <div></div>
    }
}