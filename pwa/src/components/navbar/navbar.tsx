
import { Link, useLocation, useNavigate, useNavigation } from 'react-router'
import style from './navbar.module.scss'
import { useGlobalState } from '../../contexts/globalState.context'
import { useCallback } from 'react'

export function NavBar() {

    const { session, setSession, endSession } = useGlobalState()
    const navigate = useNavigate()
    const location = useLocation()

    const updateState = useCallback(() => {
        if (location.pathname !== "/") {
            navigate("/")
        } else {
            if (session) {
                if(window.confirm('Cloturer la séance ?')) {
                    endSession()
                }
            } else {
                if(window.confirm('Démarrer la séance ?')) {
                    setSession({})
                }
            }
        }
    }, [session, setSession, location])

    return <div className={style.navbar}>
        <Link to='/config' >Config</Link>
        <button className={style.startButton} onClick={updateState}>{session ? location.pathname !== "/" ? "Pause" : "Stop" :  "Start"}</button>
        <Link to='/stat'>Stat</Link>
    </div>
}