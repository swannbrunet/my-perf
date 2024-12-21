import { useEffect, useState } from "react"
import style from "./timer.module.scss"
import { Session } from "../../type/session";
import { useGlobalState } from "../../contexts/globalState.context";


export function Timer() {
    const { session } = useGlobalState()
    const [start, setStart] = useState<Date>()
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        setStart(new Date())
    }, [session])

    useEffect(() => {
        
        const interval = setInterval(() => {
            if(start) {
                const interval = new Date(Date.now() - start.getTime())
                setMinutes(interval.getMinutes())
                setSeconds(interval.getSeconds())
            }
        }, 1000);
        return () => clearInterval(interval);
      }, [start]);


    return <div>
        <div className={style.Timer}> {minutes}:{seconds}</div>
    </div>
}