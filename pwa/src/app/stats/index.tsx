import { useEffect, useState } from "react"
import ExerciceSelector from "../../components/exerciceSelector/ExerciceSelector"
import style from "./stats.module.scss"
import { ExerciceWork, Session, WORKITEM } from "../../type/session"

export function Stats() {

    const [exerciceType, setExerciceType] = useState("")

    const [sessions, setSessions] = useState<Session[]>([])

    useEffect(() => {
        const sessionString = localStorage.getItem(WORKITEM)
        if (sessionString) {
            const rawSessions: any[] = JSON.parse(sessionString)
            const newSessions: Session[] = rawSessions.map(value => ({
                createdAt: new Date(value.createdAt),
                sessionExercice: value.sessionExercice
            }))
            setSessions(newSessions)
        }
    }, [])

    const getMaxSessionSize = () : ExerciceWork[]  => {
        const sessionTmp = [...sessions].filter(value => value.sessionExercice[exerciceType])
        const biggerSession = sessionTmp.sort((a,b) => b.sessionExercice[exerciceType].length - a.sessionExercice[exerciceType].length)
        console.log(biggerSession[0])
        if(biggerSession[0]?.sessionExercice[exerciceType] !== undefined) {
            return biggerSession[0]?.sessionExercice[exerciceType]
        } else {
            return []
        }

    }

    return <div className={style.container}>
        <ExerciceSelector setExerciceType={setExerciceType} exerciceType={exerciceType} />
        <div className={style.tableContainer}>
        <table className={style.table}>
            <thead>
                <th></th>
                {getMaxSessionSize().map(value => <th>{value.position}</th>)}
            </thead>
        <tbody>
        { sessions && sessions.filter(value => value.sessionExercice[exerciceType] !== undefined).map(session => <tr>
            <th>{session.createdAt.toLocaleDateString()}</th>
            {session.sessionExercice[exerciceType].map(element => <td>{element.weight} X {element.quantity}</td>)}
        </tr>) }
        </tbody>
        </table>
        </div>
    </div>
}