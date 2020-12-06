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
  
  const getCursor = async (accessToken, tempGameID, userToSearch) => {
    const response = await fetch(`https://api.twitch.tv/helix/streams?game_id=${tempGameID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-Id' : process.env.REACT_APP_CLIENT_ID
      }
    })
    if (response.ok) {
      const data = await response.json()
      const streams = data.data
      return streams
      // const indexOfStream = streams.findIndex((stream) => stream.user_name.toLowerCase() === userToSearch.toLowerCase())
      // console.log(indexOfStream)
    }
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