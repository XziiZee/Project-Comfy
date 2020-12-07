import React, { useContext } from 'react'
import StreamsContext from '../context/streams-context'

const RenderInfoOfStream = () => {
    const { streams, userSearchError, userInfo } = useContext(StreamsContext)

    return (
        <div>
            {userSearchError && <p>{userSearchError}</p>}
            {userInfo && <p>Name: {userInfo.broadcaster_name}</p>}
            {userInfo && <p>Title: {userInfo.title}</p>}
            {userInfo && <p>Game: {userInfo.game_name}</p>}
        </div>
    ) 
}

export {RenderInfoOfStream as default }