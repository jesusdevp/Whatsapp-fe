import { useEffect, useState } from "react";
import { CloseIcon } from "../../../svg"
import ValidIcon from "../../../svg/Valid"


export const Ringing = ({ call, setCall }) => {

    const [timer, setTimer] = useState(0);
    const { receiveingCall, callEnded } = call
    
    let interval

    const handleTimer = () => {
        interval = setInterval(() => {
        setTimer((prev) => prev + 1);
        }, 1000);
    };

    useEffect(() => {
        if (timer <= 30) {
          handleTimer();
        } else {
          setCall({ ...call, receiveingCall: false });
        }
        return () => clearInterval(interval);
      }, [timer]);

  return (
    <div className='dark:bg-dark_bg_1 rounded-lg fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30' >
        {/* container */}
        <div className='p-4 flex items-center justify-between gap-x-8' >

            {/* call info */}
            <div className='flex items-center gap-x-2' >
                <img
                    src={`https://elcomercio.pe/resizer/SslpKkpxKFsrc-RY0ADR1-N2avo=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/CIE2IRCYRZC3BGDX5Z2ATL7GMA.png`}
                    alt={`caller profile picture`}
                    className="w-28 h-28 rounded-full"
                />
                <div>
                    <h1 className='dark:text-white' >
                        <b>Rick</b>
                    </h1>
                    <span className='dark:text-dark_text_2' >Whatsapp video...</span>
                </div>
            </div>

            {/* actions */}
            <ul className='flex items-center gap-x-2' >
                <li>
                    <button className='w-10 h-10 flex items-center justify-center rounded-full bg-red-500' >
                        <CloseIcon className='fill-white w-5' />
                    </button>
                </li>
                <li>
                    <button className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-500' >
                        <ValidIcon className='fill-white w-6 mt-2' />
                    </button>
                </li>
            </ul>
        </div>
        {/* ringtone */}
        <audio src="../../../../audio/ringtone.mp3" autoPlay loop></audio>
    </div>
  )
}
