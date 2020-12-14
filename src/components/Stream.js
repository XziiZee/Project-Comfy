import React from 'react'

const Stream = ({ stream }) => {
    return (
        <div>
            <h3>{stream.user_name}</h3>
            <p>{stream.title}</p>
            <p>{stream.game_name}</p>
            <p>View Count: {stream.viewer_count}</p>
        </div>
    )
}

export { Stream as default }