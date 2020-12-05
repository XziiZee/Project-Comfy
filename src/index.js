import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {HashGet} from 'hashget'
import reportWebVitals from './reportWebVitals';
import { clientID, clientSecret, redirectURI } from './creds'

const hash = new HashGet()
const accessToken = hash.getValue('access_token')

const getUserID = async (userToSearch) => {
  const response = await fetch(`https://api.twitch.tv/helix/users?login=${userToSearch}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Client-Id' : clientID
    }
  })
  if (response.ok) {
    const data = await response.json()
    if (data.data[0]) {
      return data.data[0].id
    }
  }
}

const getStreamDataByID = async (userID) => {
  const response = await fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${userID}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Client-Id' : clientID
    }
  })
  if (response.ok) {
    const data = await response.json()
    return data.data[0]
  }
}

const ProjectComfy = () => {
  const [userToSearch, setUserToSearch] = useState('')
  const [userInfo, setUserInfo] = useState()
  const [userID, setUserID] = useState('')
  const [userSearchError, setUserSearchError] = useState('')

  return (
    <div>
      <h1>Project Comfy Testing Grounds</h1>
      <h2>Created by Xzii</h2>

      {!accessToken ? (
        <a href={`https://id.twitch.tv/oauth2/authorize?client_id=v1ebcps7rhe6668tb0cc5kqplevic4&redirect_uri=${redirectURI}&response_type=token&scope=user:read:email`}>login</a>
      ) : (
        <form onSubmit={(e) => {
        e.preventDefault()
        getUserID(userToSearch).then((data) => {
          getStreamDataByID(data).then((data) => {
            setUserInfo(data)
            setUserID(data.broadcaster_id)
          }).catch((e) => {
            setUserSearchError(`Something went wrong, please check user "${userToSearch}" exists`)
          })
        }).catch()
      }}>
        <input value={userToSearch} onChange={(e) => setUserToSearch(e.target.value)} placeholder='Search User' />
        <button>Search</button>
      </form>
      )}
      {userSearchError && <p>{userSearchError}</p>}
      {userInfo && <p>Name: {userInfo.broadcaster_name}</p>}
      {userInfo && <p>Title: {userInfo.title}</p>}
      {userInfo && <p>Game: {userInfo.game_name}</p>}
    </div>
  )
}

ReactDOM.render(
    <ProjectComfy />,
  document.getElementById('root')
);

reportWebVitals();