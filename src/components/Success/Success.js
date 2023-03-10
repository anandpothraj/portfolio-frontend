import React from 'react';
import TypeWriterEffect from 'react-typewriter-effect';

const Success = (props) => {

    const thankyouText = [ props.thankyouText ];
    const subText = props.subText;

  return (
    <div className='m-auto text-center w-100'>
        <div className="successDiv">
            <h1 className='successText'>Success</h1>
            <div className="main-container">
                <div className="check-container">
                    <div className="check-background">
                        <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 25L27.3077 44L58.5 7" stroke="white" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="check-shadow">
                    </div>
                </div>
            </div>
            <div className="bg-black p-4 rounded-3">
                <div className="d-inline m-auto">
                <TypeWriterEffect
                    startDelay={0}
                    cursorColor="#fffff"
                    multiText={thankyouText}
                    multiTextDelay={0}
                    typeSpeed={60}
                    className="textSmall"
                />
                </div>
                <p className='my-3 textLeft'>{subText}</p>
            </div>
        </div>
    </div>
  )
}

export default Success;