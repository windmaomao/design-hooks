import { defaults } from '../lodash'
import { formatNumber, toNumber } from './numberUtils'

const defaultState = {
  value: null,
  displayValue: '',
}

const defaultAction = {
  type: 'init'
}

const changeNumber = (state, n) => {
  const isNumber = typeof n === 'number'
  return {
    ...state,
    value: isNumber ? n : null,
    displayValue: isNumber ? formatNumber(n) : ''
  }
}

const inputNumber = (state, payload) => {
  const { str, cb } = payload
  const n = toNumber(str)
  const state2 = changeNumber(state, n)
  if (cb) cb(state2.value)
  return state2
}

const initNumber = state => {
  return changeNumber(state, state.value)
}

/**
 * Number reducer,
 * @class numberReducer
 * @memberof useNumber
 * @param {object} state                previous state
 * @param {number} state.value          number
 * @param {string} state.displayValue   ndisplayed number
 * @param {object} action                 action type and payload
 * @returns {object} current state { value, displayValue }
 */
const baseReducer = (st, action = defaultAction) => {
  let state = defaults(defaultState, st)

  switch (action.type) {
    case 'change':
      state = changeNumber(state, action.payload)
      break
    case 'input':
      state = inputNumber(state, action.payload)
      break
    case 'init':
    default:
      state = {
        ...initNumber({
          ...state,
          ...action.payload
        })
      }
      break
  }

  return state
}

export default baseReducer
