import React, { useContext } from 'react'
import StreamsContext from '../context/streams-context'
import Stream from '../components/Stream'

const ChannelInfo = () => {
    const { streams, userToSearch } = useContext(StreamsContext)
    return (
        <>
            {streams.highStreamsArray[0] ? (
                <div>
                    <div className="high-view">
                        {streams.highStreamsArray.map((stream) => <Stream key={stream.user_name} stream={stream}/>)}
                    </div>
                    <div className="searched-stream">
                        <Stream stream={streams.searchedStream} />
                    </div>
                    <div className="low-view">
                        {streams.lowStreamsArray.map((stream) => <Stream key={stream.user_name} stream={stream}/>)}
                    </div>
                </div>
            ) : (
                <p><span>{userToSearch}</span> is not online</p>
            )}
            
        </>
    )
}

  export { ChannelInfo as default }