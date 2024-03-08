import md5 from 'md5'

const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
const combinedString = `Valantis_${timestamp}`
export const md5Hash = md5(combinedString)
