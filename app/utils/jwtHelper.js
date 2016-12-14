import decode from 'jwt-decode'

export function getTokenExpirationDate(token = false) {
  console.log('Token: ', token)
  if (!token) return 'none'
  const decoded = decode(token)
  if (!decoded.exp) return null

  const date = new Date(0)
  date.setUTCSeconds(decoded.exp)
  return date
}

export function isTokenExpired(token = false) {
  console.log('Token: ', token)
  if (!token) return true
  const date = getTokenExpirationDate(token)
  const offsetSeconds = 0
  if (date === null) {
    return false
  } else if (date == 'none') {
    return true
  }
  return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
}
