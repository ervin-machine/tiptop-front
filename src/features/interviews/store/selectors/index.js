import { createSelector } from 'reselect'
import { get } from 'lodash'

const selectData = state => state.interview

const selectShortUrl = () => createSelector(selectData, selectData => get(selectData, 'shortUrl'))
const selectInterviews = () => createSelector(selectData, selectData => get(selectData, 'interviews'))

export { selectShortUrl, selectInterviews }

