import React, { ReactNode, createContext, useCallback, useContext, useState } from "react";
import { Session, SessionExercices } from "../type/session";
import { EXERCISES_ITEM } from "../type/exercise";

interface ExercisesTypeContextState {
    exercises: string[]
    setExercises: (v: string[]) => void
}

export const ExercicesTypeContext = createContext<ExercisesTypeContextState>({ exercises: [], setExercises: () => {}});


export function ExercisesTypeProvider ({children} : {children: ReactNode}) {
    const [exercises, setExercises] = useState<string[]>(() => {
        const exercisesFromStorage = localStorage.getItem(EXERCISES_ITEM)
        if(!exercisesFromStorage) {
            return []
        }
        return JSON.parse(exercisesFromStorage)
    })

    const handleSetExercices = (exercisesUpdated: string[]) => {
        localStorage.setItem(EXERCISES_ITEM, JSON.stringify(exercisesUpdated))
        setExercises(exercisesUpdated)
    }

    return <ExercicesTypeContext.Provider value={{exercises, setExercises: handleSetExercices}}>
        {children}
    </ExercicesTypeContext.Provider>
}

export function useExercicesType() {
    return useContext(ExercicesTypeContext)
}