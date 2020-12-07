import React, { useContext } from 'react'
import StreamsContext from '../context/streams-context'
import { getUserID, getCursor, getStreamDataByID } from '../API-Calls'

const SearchForm = () => {
  const { accessToken, userToSearch, setUserToSearch, setUserInfo, setUserID, setUserSearchError, setStreams, streams } = useContext(StreamsContext)
    const pasteStreams = () => {
      console.log(streams)
      let index = streams.findIndex((stream) => userToSearch.toLowerCase() === stream.user_name.toLowerCase())
      console.log(streams[index])
    }
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault()
          getUserID(accessToken, userToSearch).then((data) => {
            getStreamDataByID(accessToken, data).then((data) => {
              setUserInfo(data)
              setUserID(data.broadcaster_id)
              getCursor(accessToken).then((data) => {
                setStreams(data)
              })
              
            }).catch((e) => {
              setUserSearchError(`Something went wrong, please check user "${userToSearch}" exists`)
            })
          }).catch()
        }}>
          <input value={userToSearch} onChange={(e) => setUserToSearch(e.target.value)} placeholder='Search User' />
          <button>Search</button>
        </form>
        <button onClick={pasteStreams}>paste streams</button>
      </div>
     
  )
}

export { SearchForm as default }