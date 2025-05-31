import { produce } from 'immer'
import { types } from '../constants'

export const initialState = {
    isLoading: false,
    error: null,
    campaigns: [],
    campaign: null,
}

const campaignReducer = (state = initialState, action: any) => 
    produce(state, draft => {
        switch(action.type) {
            case types.CREATE_CAMPAIGN_REQUEST:
                draft.isLoading = true;
                break;
            case types.CREATE_CAMPAIGN_SUCCESS:
                draft.isLoading = false;
                draft.campaign = action.payload.campaign
                draft.error = null;
                break;
            case types.CREATE_CAMPAIGN_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload;
                break;
            case types.GET_CAMPAIGN_REQUEST:
                draft.isLoading = true;
                break;
            case types.GET_CAMPAIGN_SUCCESS:
                draft.isLoading = false;
                draft.campaign = action.payload.campaign
                draft.error = null;
                break;
            case types.GET_CAMPAIGN_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload;
                break;
            case types.GET_CAMPAIGNS_REQUEST:
                draft.isLoading = true;
                break;
            case types.GET_CAMPAIGNS_SUCCESS:
                draft.isLoading = false;
                console.log(action.payload)
                draft.campaigns = action.payload.campaigns
                draft.error = null;
                break;
            case types.GET_CAMPAIGNS_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload;
                break;
            default:
                break;
        }
    });

export default campaignReducer