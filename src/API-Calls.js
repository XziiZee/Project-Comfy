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
const getDataArray = async (accessToken, userToSearch) => {
  let calls = 0
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
      calls++
      console.log(calls)
      if (data.data[90].viewer_count < 100) {
        console.log('Done at 100 viewers')
        break
      }
    }
  } while (data && data.pagination && data.pagination.cursor)
  console.log('Done')
  let indexOfSearchedStream = dataArray.findIndex((stream) => userToSearch.toLowerCase() === stream.user_name.toLowerCase())
  let highStreamsArray = []
  let searchedStream = dataArray[indexOfSearchedStream]
  let lowStreamsArray = []
  let lowEnd = indexOfSearchedStream + 5
  let highEnd = indexOfSearchedStream - 5
  if (highEnd < 0) {
    highEnd = 0
  }

  for (let i = highEnd; i < indexOfSearchedStream; i++) {
    highStreamsArray.push(dataArray[i])
  }
  for (let i = indexOfSearchedStream + 1; i <= lowEnd; i++) {
    lowStreamsArray.push(dataArray[i])
  }
  
  const returnData = { highStreamsArray, searchedStream, lowStreamsArray }
  return returnData
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

  export { getUserID, getDataArray, getStreamDataByID }