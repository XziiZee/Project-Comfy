import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {HashGet} from 'hashget'
import reportWebVitals from './reportWebVitals';
import StreamsContext from './context/streams-context'
import SearchForm from './components/SearchForm'
import LoginPage from './components/LoginPage'
import ChannelInfo from './components/ChannelInfo'
import Header from './components/Header'
require('dotenv').config()

const ProjectComfy = () => {
  const [userToSearch, setUserToSearch] = useState('')
  const [userInfo, setUserInfo] = useState()
  const [userID, setUserID] = useState('')
  const [userSearchError, setUserSearchError] = useState('')
  const [streams, setStreams] = useState()
  const [accessToken, setAccessToken] = useState()

  useEffect(() => {
    const hash = new HashGet()
    setAccessToken(hash.getValue('access_token'))
  }, [])

  return (
    <StreamsContext.Provider value={{ accessToken, userToSearch, setUserToSearch, userInfo, setUserInfo, userID, setUserID, userSearchError, setUserSearchError, streams, setStreams }}>
      <Header />
      {!accessToken ? (
        <LoginPage />
      ) : (
        <SearchForm />
      )}
      {streams && <ChannelInfo />}
    </StreamsContext.Provider>
  )
}

ReactDOM.render(<ProjectComfy />, document.getElementById('root'));

reportWebVitals();