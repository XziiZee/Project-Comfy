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

// Thank you Zae
const getCursor = async (accessToken) => {
  let calls = 1
  let dataArray = []
  let data = false
  do {
    let query = 'https://api.twitch.tv/helix/streams?first=100'
    if (data && data.pagination && data.pagination.cursor) {
      query += `&after=${data.pagination.cursor}`
    }

    const response = await fetch(query, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-Id': process.env.REACT_APP_CLIENT_ID
      }
    })

    if (response.ok) {
      data = await response.json()
      dataArray = dataArray.concat(data.data)
      if (data.data[90].viewer_count < 100) {
        console.log('Done at 100 viewers')
        break
      }
      console.log(calls)
      calls++
    }
  } while (data && data.pagination && data.pagination.cursor)
  console.log('Done')
  return dataArray
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