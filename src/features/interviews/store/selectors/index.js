import { createSelector } from 'reselect'
import { get } from 'lodash'

const selectData = state => state.interview

const selectShortUrl = () => createSelector(selectData, selectData => get(selectData, 'shortUrl'))
const selectInterviews = () => createSelector(selectData, selectData => get(selectData, 'interviews'))
const selectInterviewTemplates = () => createSelector(selectData, selectData => get(selectData, 'interviewTemplates'))
const selectInterview = () => createSelector(selectData, selectData => get(selectData, 'interview'))
const selectisInterviewExist = () => createSelector(selectData, selectData => get(selectData, 'isInterviewExist'))

export { selectShortUrl, selectInterviews, selectInterviewTemplates, selectInterview, selectisInterviewExist }

