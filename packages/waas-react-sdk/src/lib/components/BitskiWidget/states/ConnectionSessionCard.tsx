import {Connector} from "wagmi";
import pendingIcon from "../../../assets/pending.png";
import iconWalletConnect from "../../../assets/icon-walletconnect.svg";
import errorIcon from "../../../assets/connector-state-error.svg"
import {ConnectionState, ConnectionStateKind} from "../../../BitskiContext";
import {CONNECTOR_TYPE_BITSKI} from "../../../connectors/bitski";
import chevronLeftIcon from "../../../assets/chevron-left-small.svg";
import {LoginMethod} from "../constants";
import './ConnectionSessionCard.styles.css';

export function ConnectionSessionCard({connectionState, onBackClick}: {
    connectionState: ConnectionState,
    onBackClick: () => void
}) {
    const connectorDisplay = displayForConnector(connectionState)
    return (
        <div className="flex w-[350px] flex-col items-center gap-6 shadow-[0px_4px_12px_0px_color(display-p3_0_0_0_/_0.12)] p-8 rounded-3xl bg-white">
            <div className="relative w-full">
                <button
                    className="w-6 h-6 absolute"
                    onClick={onBackClick}>
                    <img src={chevronLeftIcon} alt="Back" />
                </button>
                <h5 className="w-full text-center text-[color:var(--Main-Black,color(display-p3_0.2_0.2_0.2))] text-lg font-bold leading-[23px] tracking-[-0.45px]">
                    {connectorDisplay.title}
                </h5>
            </div>
            <div className="relative">
                <div className={`absolute -top-2 -right-2 border-[color(display-p3_1_1_1)] ${connectorDisplay.stateBgColor} p-[3px] rounded-[99px] border-2 border-solid`}>
                    <img className={`w-[18px] h-[18px] ${connectorDisplay.stateAdditionalClass}`} src={connectorDisplay.stateIcon} alt={connectionState.kind}/>
                </div>
                <img className="w-[88px] h-[88px]" src={connectorDisplay.icon} alt={connectorDisplay.title}/>
            </div>
            <p className="w-56 text-[color:var(--Main-Grey,color(display-p3_0.5961_0.5922_0.6118))] text-center text-base font-normal leading-[22px] tracking-[-0.096px]">
                {connectorDisplay.text}
            </p>
        </div>
    )
}

interface ConnectorDisplay {
    title: string,
    icon?: string,
    stateIcon: string,
    stateBgColor: string
    stateAdditionalClass: string
    text: string
}

function displayForConnector(connectionState: ConnectionState): ConnectorDisplay {
    switch (connectionState.kind) {
        case ConnectionStateKind.Pending:
            const pendingConnector = connectionState.pendingConnector;
            let pendingText: string
            switch (pendingConnector.type) {
                case CONNECTOR_TYPE_BITSKI:
                    pendingText = pendingConnector.id == "email" ? "Use your device’s Touch ID or enter your password to continue" : "Use your social login to continue"
                    break
                default:
                    pendingText = "Accept the request in your wallet to connect to this app"
            }
            return {
                title: pendingConnector.name,
                icon: iconForConnector(pendingConnector),
                stateIcon: pendingIcon,
                stateBgColor: "bg-[#299EFF]",
                stateAdditionalClass: "rotate-infinite",
                text: pendingText
            }
        case ConnectionStateKind.Error:
            const errorConnector = connectionState.connector;
            let errorText: string
            switch (errorConnector.id) {
                case LoginMethod.Email:
                    errorText = "Passkey verification failed! Please try verifying again"
                    break
                default:
                    errorText = "Connection failed! Please try connecting again"
            }
            return {
                title: errorConnector.name,
                icon: iconForConnector(errorConnector),
                stateIcon: errorIcon,
                stateBgColor: "bg-[#FF4833]",
                stateAdditionalClass: "",
                text: errorText
            }
        case ConnectionStateKind.Connected:
            const connectedConnector = connectionState.connector;
            return {
                title: connectedConnector.name,
                icon: iconForConnector(connectedConnector),
                stateIcon: errorIcon,
                stateBgColor: "bg-[#1CC700]",
                stateAdditionalClass: "",
                text: "Wallet is connected! You can now use your wallet"
            }
        default:
            throw new Error(`Not a displayable state for ${connectionState.kind}`)
    }
}

function iconForConnector(connector: Connector): string | undefined {
    if (connector.icon) {
        return connector.icon;
    }
    switch (connector.id) {
        case 'walletConnect':
            return iconWalletConnect;
        default:
            return undefined;
    }
}