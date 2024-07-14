import { redirect as route } from 'next/navigation'

export const relog = () => {
  localStorage.removeItem('token')
  // route('/register')
  // TODO: Fix redirect to login/register page
}

export const handleResponse = ({ resp, valid, resolveDataMessage }) => {
  if (valid.includes(resp.kind)) {
    if (resolveDataMessage) {
      return {
        data: resp.message
      }
    }

    return {
      data: resp.data
    }
  }
  return {
    error: resp.message
  }
}

export const request = (method, endpoint, data) => {
  let body = null
  let qs = ''
  if (method === 'GET' && data) {
    // encode data into the querystring
    // eslint-disable-next-line prefer-template
    qs = '?' + Object.keys(data)
      .filter(k => data[k] !== undefined)
      .map(k => `${k}=${encodeURIComponent(data[k])}`)
      .join('&')
  } else {
    body = data
  }
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
  if (body) {
    headers['Content-Type'] = 'application/json'
  }
  return fetch(`${process.env.rctfApiBaseUrl}/api/v1${endpoint}${qs}`, {
    method,
    headers,
    body: body && JSON.stringify(body)
  })
    .then(resp => resp.json())
    .then(resp => {
      // if (resp.kind === 'badToken') return relog()
      if (resp.kind === 'badToken') {
        relog()
      }

      return resp
    })
    .catch(err => {
      console.debug(err)
    })
}
