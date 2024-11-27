import { createSelector } from 'reselect'
import { get } from 'lodash'

const selectData = state => state.adminData

const selectToken = () => createSelector(selectData, selectData => get(selectData, 'token'))
const selectUser = () => createSelector(selectData, selectData => get(selectData, 'user'))

export { selectToken, selectUser }
