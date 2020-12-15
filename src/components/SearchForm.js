import React, { useContext, useState } from 'react'
import StreamsContext from '../context/streams-context'
import { getUserID, getDataArray, getStreamDataByID } from '../API-Calls'

const SearchForm = () => {
  const { accessToken, userToSearch, setUserToSearch, setUserInfo, setUserID, userSearchError, setUserSearchError, setStreams } = useContext(StreamsContext)
  const [loading, setLoading] = useState(false)
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault()
          setStreams()
          setUserSearchError('')
          getUserID(accessToken, userToSearch).then((data) => {
            getStreamDataByID(accessToken, data).then((data) => {
              setUserInfo(data)
              setUserID(data.broadcaster_id)
              setLoading(true)
              getDataArray(accessToken, userToSearch).then((data) => {
                setStreams(data)
                setLoading(false)
              })
              
            }).catch((e) => {
              setUserSearchError(`Something went wrong, please check user "${userToSearch}" exists`)
            })
          }).catch((e) => {
            setUserSearchError(`Something went wrong, please check user "${userToSearch}" exists`)
          })
        }}>
          <input value={userToSearch} onChange={(e) => setUserToSearch(e.target.value)} placeholder='Search User' />
          <button>Search</button>
        </form>
        {userSearchError && <p>{userSearchError}</p>}
        {loading && <p>Loading data...</p>}
      </div>
  )
}

export { SearchForm as default }