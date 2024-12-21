import { useCallback, useEffect, useState } from "react";
import style from "./perRecord.module.scss";
import { useGlobalState } from "../../contexts/globalState.context";
import { ExerciceWork, Session, SessionExercices, WORKITEM } from "../../type/session";
import { Indicator } from "./indicator/Indicator";

interface PerfRecordProps {
    exerciceType: string
    session: SessionExercices
    setSession: (session: SessionExercices) => void
}

export function PerfRecord(props: PerfRecordProps) {

    const [exercices, setExercices] = useState<ExerciceWork[]>([{
        position: 1,
    }])

    const { session, setSession } = props

    const [lastSessions, setLastSessions] = useState<Session[]>([])
    const [lastExeciseSession, setLastExerciseSessions] = useState<ExerciceWork[]>([])

    useEffect(() => {
        const sessionString = localStorage.getItem(WORKITEM)
        if (sessionString) {
            const rawSessions: any[] = JSON.parse(sessionString)
            const newSessions: Session[] = rawSessions.map(value => ({
                createdAt: new Date(value.createdAt),
                sessionExercice: value.sessionExercice
            }))
            setLastSessions(newSessions)
        }
    }, [])

    useEffect(() => {
        const ghostExercise = lastSessions.find((value) => value.sessionExercice[props.exerciceType])
        if (ghostExercise) {
            setLastExerciseSessions(ghostExercise.sessionExercice[props.exerciceType])
        } else {
            setLastExerciseSessions([])
        }
    }, [lastSessions, props.exerciceType])

    useEffect(() => {
        if (session[props.exerciceType]) {
            setExercices(session[props.exerciceType])
        } else {
            setExercices([{ position: 1 }])
        }
    }, [props.exerciceType])

    useEffect(() => {
        const newSession = { ...session }
        newSession[props.exerciceType] = exercices
        setSession(newSession)
    }, [exercices])

    const updateQuantityExercice = useCallback((position: number, quantity: number) => {
        const newExercice = [...exercices];
        newExercice[position - 1].quantity = quantity;
        setExercices(newExercice);
    }, [exercices, setExercices])

    const updateWeightExercice = useCallback((position: number, weight: number) => {
        const newExercice = [...exercices];
        newExercice[position - 1].weight = weight
        if (newExercice.length === position) {
            newExercice.push({ position: position + 1 })
        }
        setExercices(newExercice)
    }, [exercices, setExercices])



    return <div className={style.exerciceBox}>
        {
            exercices.map((item) => {
                const lastExercise = lastExeciseSession[item.position - 1]
                const quantityPlaceOlder = lastExercise?.quantity
                const weightPlaceOlder = lastExercise?.weight
                let indicatorStatus = 'EQUAL'
                if (item.weight && weightPlaceOlder && item.quantity && quantityPlaceOlder) {
                if(item.weight > weightPlaceOlder || item.weight === weightPlaceOlder && item.quantity > quantityPlaceOlder  ) {
                    indicatorStatus = 'UP'
                } else {
                    if(item.weight === weightPlaceOlder && item.quantity === quantityPlaceOlder ) {
                        indicatorStatus = 'EQUAL'
                    } else {
                        indicatorStatus = 'DOWN'
                    }
                }
                } else {
                    if(!weightPlaceOlder || !quantityPlaceOlder) {
                        indicatorStatus = 'NEW'
                    }
                }
            return <div className={style.item} key={item.position}>
                <div className={style.divider}>{item.position}</div>
                <div className={style.KGSection}>
                    <input type="number" pattern="[0-9]*" inputMode="numeric" value={item.weight || ""} onChange={(event) => { updateWeightExercice(item.position, event.target.valueAsNumber) }} placeholder={weightPlaceOlder?.toString()} />
                    <span>KG</span>
                </div>
                <div className={style.divider}>X</div>
                <input type="number" pattern="[0-9]*" inputMode="numeric" value={item.quantity || ""} onChange={(event) => { updateQuantityExercice(item.position, event.target.valueAsNumber) }} placeholder={quantityPlaceOlder?.toString()} />
                <div className={`${style.divider} ${style.Indicator}`}><Indicator status={indicatorStatus as 'UP' | 'DOWN' | 'EQUAL'}/></div>
            </div>
            })
        }
    </div>
}