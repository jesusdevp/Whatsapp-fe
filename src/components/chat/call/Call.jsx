
import { useState } from "react"
import { CallActions } from "./CallActions"
import { CallArea } from "./CallArea"
import { Header } from "./Header"
import { Ringing } from "./Ringing"


export const Call = ({ call, setCall, callAccepted, myVideo, userVideo, stream, answerCall, show, endCall, totalSecInCall, setTotalSecInCall }) => {

    const { name, picture, receiveingCall, callEnded } = call
    const [showActions, setShowActions] = useState(false)
    const [toggle, setToggle] = useState(false);

  return (
    <>
    <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg
        ${receiveingCall && !callAccepted ? "hidden" : ""}
        `}
        onMouseOver={() => setShowActions(true)}
        onMouseOut={() => setShowActions(false)}
    >
        {/* container */}
        <div>
            <div>
                {/* header */}
                <Header />

                <CallArea 
                    name={ name }
                    totalSecInCall={ totalSecInCall }
                    setTotalSecInCall={ setTotalSecInCall }
                    callAccepted={ callAccepted }
                />

                {
                    showActions ? <CallActions endCall={ endCall } /> : null
                }

            </div>

            {/* video stream */}
            {
                callAccepted && !callEnded ? (
                    <div>
                        <video 
                            ref={ userVideo }
                            playsInline
                            autoPlay
                            muted
                            className={toggle ? 'smallVideoCall' : 'largeVideoCall'}
                            onClick={() => setToggle((prev) => !prev)}
                        ></video>
                    </div>  
                ) : null
            }  

            {/* my video */}
            {
                stream ? (
                    <div>
                        <video
                            ref={ myVideo }
                            muted
                            playsInline
                            autoPlay
                            className={`${toggle ? 'largeVideoCall' : 'smallVideoCall'} ${
                                showActions ? 'moveVideoCall' : ''
                            }`}
                            onClick={() => setToggle((prev) => !prev)}
                        ></video>
                    </div>
                ) : null
            }
        </div>
    </div>
    {/* ringing */}
    {
        receiveingCall && !callAccepted ? (
            <Ringing call={ call } setCall={ setCall } answerCall={ answerCall } endCall={ endCall } />
        ) : null
    }

    {
        // calling ringtone
        !callAccepted && show ? (
            <audio src="../../../../audio/ringing.mp3" autoPlay loop></audio>
        ) : null
    }
    </>
  )
}
