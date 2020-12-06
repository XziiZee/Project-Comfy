import React, { useContext } from 'react'
import StreamsContext from '../context/streams-context'
import { getUserID, getCursor, getStreamDataByID } from '../API-Calls'

const SearchForm = () => {
  const { accessToken, userToSearch, setUserToSearch, setUserInfo, setUserID, setUserSearchError, setStreams } = useContext(StreamsContext)

    return (
      <form onSubmit={(e) => {
        e.preventDefault()
        getUserID(accessToken, userToSearch).then((data) => {
          getStreamDataByID(accessToken, data).then((data) => {
            setUserInfo(data)
            setUserID(data.broadcaster_id)
            const tempGameID = data.game_id
            getCursor(accessToken, tempGameID, userToSearch).then((data) => {
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
  )
}

export { SearchForm as default }