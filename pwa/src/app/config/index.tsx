
import { useCallback, useState } from 'react'
import { useExercicesType } from '../../contexts/exercicesType.context'
import style from './config.module.scss'

export function ConfigPage() {

    const { exercises, setExercises } = useExercicesType()
    const [newExercise, setNewExercise ] = useState("")

    const handleNewExercise = () => {
        if(newExercise !== "") {
            setExercises([newExercise, ...exercises])
            setNewExercise("")
        }
    }

    return <div className={style.container}>
        <h1>Mes exercices</h1>
        <div className={style.typeZone}>
            <input value={newExercise} onChange={(e) => {setNewExercise(e.target.value)}}/><button onClick={handleNewExercise}>Ajouter</button>
        </div>
        {
            exercises.map((exercise) => <div className={style.exerciceSaved}>
                {exercise}
            </div> )
        }
        </div>
}