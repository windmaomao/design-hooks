const formatNumber = n => {
  if (typeof n !== 'number') return ''
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const toNumber = str => {
  if (!str) return null
  const s = str.replace(/[^0-9-]/g, '')
  if (!s) return null
  return parseInt(s, 10)
}

export { formatNumber, toNumber }
