import { useReducer, useCallback } from 'react'
import { defaults } from '../lodash'
import reducer from './numberReducer'

const defaultProps = {
  value: null,
  displayValue: '',
  onChange: () => {}
}

const initialState = state => {
  return reducer(state, { type: 'init' })
}

/**
 * @memberof useNumber
 * @param {object} _                props
 * @param {object[]} _.value          initial value
 * @example
 *   const { value, displayValue } = useNumber({ value })
 */
const useNumber = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState(
    defaults(defaultProps, props)
  ))

  const change = useCallback(n => {
    dispatch({ type: 'change', payload: n })
  }, [])

  const input = useCallback((str, cb) => {
    dispatch({ type: 'input', payload: { str, cb } })
  }, [])

  return { ...state, change, input }
}

export default useNumber
