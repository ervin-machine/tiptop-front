import { createSelector } from 'reselect'
import { get } from 'lodash'

const selectData = state => state.adminData

const selectToken = () => createSelector(selectData, selectData => get(selectData, 'token'))
const selectAuth = () => createSelector(selectData, selectData => get(selectData, 'auth'))
const selectAvatar = () => createSelector(selectData, selectData => get(selectData, 'avatar'))

export { selectToken, selectAuth, selectAvatar }
