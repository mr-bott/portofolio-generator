import React from 'react'
import "./loading.css"

const Loading = () => {
    return (
        <div className='loading-container'>
            <div className="card-loader">
                <div className="loader-loader">
                    <p>loading</p>
                    <div className="words">
                        <span className="word">Template</span>
                        <span className="word">Info</span>
                        <span className="word">
                            Images
                        </span>
                        <span className="word">Styles</span>
                        <span className="word">Links</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading
