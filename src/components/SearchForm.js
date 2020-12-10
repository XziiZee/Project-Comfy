import React, { useContext } from 'react'
import StreamsContext from '../context/streams-context'
import { getUserID, getDataArray, getStreamDataByID } from '../API-Calls'

const SearchForm = () => {
  const { accessToken, userToSearch, setUserToSearch, setUserInfo, setUserID, setUserSearchError, setStreams } = useContext(StreamsContext)
    
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault()
          getUserID(accessToken, userToSearch).then((data) => {
            getStreamDataByID(accessToken, data).then((data) => {
              setUserInfo(data)
              setUserID(data.broadcaster_id)
              getDataArray(accessToken, userToSearch).then((data) => {
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
      </div>
  )
}

export { SearchForm as default }