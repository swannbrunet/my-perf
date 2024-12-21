import React, { ReactNode, createContext, useCallback, useContext, useState } from "react";
import { Session, SessionExercices, WORKITEM } from "../type/session";

interface GlobalState {
    session: SessionExercices | undefined,
    setSession: (value: SessionExercices | undefined) => void
    endSession: () => void
}

export const GlobalStateContext = createContext<GlobalState>({ session: undefined, setSession: () => {}, endSession: () => {}});


export function GlobalStateProvider ({children} : {children: ReactNode}) {
    const [session, setSession] = useState<SessionExercices>()

    const endSession = useCallback(() => {
        if(session) {
        const rawSessions = localStorage.getItem(WORKITEM)
        if(rawSessions) {
            const sessions: Session[] = JSON.parse(rawSessions)
            sessions.unshift({
                createdAt: new Date(),
                sessionExercice: session
            })
            localStorage.setItem(WORKITEM, JSON.stringify(sessions))
        } else {
            localStorage.setItem(WORKITEM, JSON.stringify([{
                createdAt: new Date(),
                sessionExercice: session
            }]))
        }
        setSession(undefined)
        }
    }, [session])

    return <GlobalStateContext.Provider value={{session, setSession, endSession}}>
        {children}
    </GlobalStateContext.Provider>
}

export function useGlobalState() {
    return useContext(GlobalStateContext)
}