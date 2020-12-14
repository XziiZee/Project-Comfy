import React, { useContext } from 'react'
import StreamsContext from '../context/streams-context'
import Stream from '../components/Stream'

const ChannelInfo = () => {
    const { streams } = useContext(StreamsContext)
    return (
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
    )
}

  export { ChannelInfo as default }