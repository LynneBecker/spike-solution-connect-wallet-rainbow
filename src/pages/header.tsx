import { ConnectButton } from "@rainbow-me/rainbowkit"
import React from "react"


const Header : React.FC = () => {

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: 12,
            }}
        >
            <ConnectButton />
        </div>
    )
}

export default Header