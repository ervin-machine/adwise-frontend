import { createSelector } from 'reselect'
import { get } from 'lodash'

const selectData = (state: any) => state.campaign

const selectCampaigns = () => createSelector(selectData, selectData => get(selectData, 'campaigns'))
const selectUser = () => createSelector(selectData, selectData => get(selectData, 'user'))
const selectIsLoading = () => createSelector(selectData, selectData => get(selectData, 'isLoading'))
const selectError = () => createSelector(selectData, selectData => get(selectData, 'error'))

export { selectCampaigns, selectUser, selectIsLoading, selectError }
