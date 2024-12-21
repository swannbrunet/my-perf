export interface SessionExercices {
    [key: string] : ExerciceWork[]
}

export interface ExerciceWork {
    position: number
    weight?: number
    quantity?: number
}

export interface Session {
    createdAt: Date,
    sessionExercice: SessionExercices
}

export const WORKITEM = 'worksession'
