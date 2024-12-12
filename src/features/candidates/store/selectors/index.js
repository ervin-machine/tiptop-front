import { createSelector } from 'reselect'
import { get } from 'lodash'

const selectData = state => state.candidate

const selectQuestions = () => createSelector(selectData, selectData => get(selectData, 'questions'))
const selectTranscribe = () => createSelector(selectData, selectData => get(selectData, 'transcribe'))
const selectSummarization = () => createSelector(selectData, selectData => get(selectData, 'summarization'))
const selectAudioId = () => createSelector(selectData, selectData => get(selectData, 'audioID'))

export { selectQuestions, selectTranscribe, selectSummarization, selectAudioId }
