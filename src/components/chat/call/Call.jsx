
import { CallArea } from "./CallArea"
import { Header } from "./Header"
import { Ringing } from "./Ringing"


export const Call = ({ call, setCall, callAccepted }) => {

    const { receiveingCall, callEnded } = call

  return (
    <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg
        ${receiveingCall && !callAccepted ? "hidden" : ""}
        `}
    >
        {/* container */}
        <div>
            <div>
                {/* header */}
                <Header />

                <CallArea 
                    name='Jesus'
                />
            </div>
        </div>

        {/* ringing */}
        {
            receiveingCall && !callAccepted && (
                <Ringing call={ call } setCall={ setCall } />
            )
        }
    </div>
  )
}
