/**
 * Override default object with other sources.
 * @function defaults
 * @param  {object} object        default object
 * @param  {object[]} sources     source objects
 * @return {object}               output object
 */
function defaults(object, ...sources) {
  const obj = { ...object }

  sources.forEach(src => {
    if (src) {
      Object.keys(src).forEach(key => {
        obj[key] = src[key]
      })
    }
  })

  return obj
}

export default defaults
