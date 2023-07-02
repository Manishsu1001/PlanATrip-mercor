import React from 'react'

function Loader() {
    return (
        <div className='loader'>
            <p>Loading...</p>
            <div className="dots">
                <div className="dot-continer">
                    <div className="dot" id="dot1"></div>
                </div>
                <div className="dot-continer">
                    <div className="dot" id="dot2"></div>
                </div>
                <div className="dot-continer">
                    <div className="dot" id="dot3"></div>
                </div>
            </div>
        </div>
    )
}

export default Loader