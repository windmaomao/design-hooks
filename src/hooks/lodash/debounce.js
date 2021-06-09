import defaults from './defaults'

const defaultOptions = {
  leading: false,
  trailing: true
}

/**
 * Debounce a function.<br>
 * Debounce provides the behavior of an elevator door
 * holding the door till no more entry.
 * @function debounce
 * @param  {func} fn        original function
 * @param  {number} delay   time allowance for holding
 * @param  {object} options debounce options
 * @param  {bool} options.trailing=true Trailing behavior
 * @param  {bool} options.leading=false Leading behavior
 * @return {func}           debounced function
 */
export default function debounce(fn, delay, options) {
  let bounceTimer = null
  let result = null
  const ops = defaults(defaultOptions, options)
  const clearBounceTime = () => {
    clearTimeout(bounceTimer)
    bounceTimer = null
  }

  function debounced(...args) {
    const canCloseDoor = () => !bounceTimer
    const closeDoor = () => {
      result = fn.apply(this, args)
    }
    const holdDoor = () => {
      clearBounceTime()
      bounceTimer = setTimeout(() => {
        if (ops.trailing) closeDoor()
        clearBounceTime()
      }, delay)
    }

    if (ops.leading && canCloseDoor()) closeDoor()
    holdDoor()
    return result
  }

  debounced.cancel = clearBounceTime
  return debounced
}
