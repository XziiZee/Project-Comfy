import React, { useContext } from 'react'
import StreamsContext from '../context/streams-context'

const ChannelInfo = () => {
    const { streams } = useContext(StreamsContext)

    return (
        <div>
            <div className="high-view">
                {streams.highStreamsArray.map((stream) => <p key={stream.user_name}>{stream.viewer_count}</p>)}
            </div>
            <div>
                {streams && <p>{streams.searchedStream.viewer_count}</p>}
            </div>
            <div className="low-view">
                {streams.lowStreamsArray.map((stream) => <p key={stream.user_name}>{stream.viewer_count}</p>)}
            </div>
        </div>
    )
}

  export { ChannelInfo as default }