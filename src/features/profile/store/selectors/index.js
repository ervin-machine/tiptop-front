import { createSelector } from 'reselect'
import { get } from 'lodash'

const selectData = state => state.user

const selectUser = () => createSelector(selectData, selectData => get(selectData, 'user'))

export { selectUser }
