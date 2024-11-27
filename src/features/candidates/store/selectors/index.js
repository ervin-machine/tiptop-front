import { createSelector } from 'reselect'
import { get } from 'lodash'

const selectData = state => state.candidate

const selectQuestions = () => createSelector(selectData, selectData => get(selectData, 'questions'))

export { selectQuestions }
