const getUserID = async (accessToken, userToSearch) => {
  const response = await fetch(`https://api.twitch.tv/helix/users?login=${userToSearch}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Client-Id' : process.env.REACT_APP_CLIENT_ID
    }
  })
  if (response.ok) {
    const data = await response.json()
    if (data.data[0]) {
      return data.data[0].id
    }
  }
}

// figure out how to loop over calls till we find who we're searching for
const getCursor = async (accessToken, tempGameID, userToSearch) => {
  const response = await fetch(`https://api.twitch.tv/helix/streams?first=100`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Client-Id' : process.env.REACT_APP_CLIENT_ID
    }
  })
  if (response.ok) {
    let data = await response.json()
    for (let i = 0; i < 20; i++) {
      let streams = data.data
      let index = streams.findIndex((stream) => userToSearch.toLowerCase() === stream.user_name.toLowerCase())
      console.log(index)
      if (index !== -1) {
        break
      } 
      testingGetData(accessToken, data.pagination.cursor)
    } 
  }
}

const testingGetData = (accessToken, cursor) => {
  const getData = async (accessToken, cursor) => {
    const response = await fetch(`https://api.twitch.tv/helix/streams?first=100&after=${cursor}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Client-Id' : process.env.REACT_APP_CLIENT_ID
        }
    })
    if (response.ok) {
      const data = await response.json()
      return data
    }
  }
  getData(accessToken, cursor).then((data) => {
    return data
  })
}

  
const getStreamDataByID = async (accessToken, userID) => {
  const response = await fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${userID}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Client-Id' : process.env.REACT_APP_CLIENT_ID
    }
  })
  if (response.ok) {
    const data = await response.json()
    return data.data[0]
  }
}

  export { getUserID, getCursor, getStreamDataByID }