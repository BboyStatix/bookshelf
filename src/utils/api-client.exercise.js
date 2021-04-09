function client(endpoint, customConfig = {}) {
  const url = `${process.env.REACT_APP_API_URL}/${endpoint}`
  return window
    .fetch(url, {
      method: 'GET',
      ...customConfig,
    })
    .then(async res => {
      const data = await res.json()
      if (!res.ok) throw data
      return data
    })
}

export {client}
