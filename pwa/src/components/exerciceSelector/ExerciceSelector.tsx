import { useState } from "react"
import style from "./exerciceSelector.module.scss"
import { useExercicesType } from "../../contexts/exercicesType.context"

interface Props {
    setExerciceType: (value: string) => void
    exerciceType: string
}

export default function ExerciceSelector({exerciceType, setExerciceType}: Props) {

    const { exercises } = useExercicesType()

    return <div className={style.exerciceTypeBox}>
        <select id="exercice" className={style.select} value={exerciceType} onChange={(event) => { setExerciceType(event.target.value) }}>
            <option>Selectioner un exercice</option>
            {exercises.map(exerciceOption => <option value={exerciceOption} key={exerciceOption}>{exerciceOption}</option>)}
        </select>
    </div>
}