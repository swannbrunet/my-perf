import React from "react"
import { NavBar } from "../components/navbar/navbar"

interface DefaultLayoutProps {
    children: React.ReactNode
}

export default function DefaultLayout(props : DefaultLayoutProps) {
    return <div>
        {props.children}
        <NavBar/>
    </div>
}