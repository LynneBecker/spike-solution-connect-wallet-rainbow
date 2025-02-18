import { ConnectButton } from "@rainbow-me/rainbowkit"
import React from "react"
import "./header.css"

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-logo">
                MultiCall
            </div>
            <ConnectButton />
        </div>
    )
}

export default Header