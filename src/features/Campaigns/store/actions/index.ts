import { campaignCreate, campaignsGet } from '../../hooks';
import { types } from "../constants";
import { Dispatch } from 'redux';

// --- Define interfaces ---

interface Tokens {
  token: any;
  access: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

interface CampaignResponse {
  tokens: Tokens;
  user: User;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// --- Action creators ---

const campaignRequest = (type: string) => ({
  type,
});

const campaignSuccess = (type: string, data?: any) => ({
  type,
  payload: data,
});

const campaignFailure = (type: string, error: any) => ({
  type,
  payload: error,
});

// --- Thunks ---

export const createCampaign = (newCampaign: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(campaignRequest(types.CREATE_CAMPAIGN_REQUEST));
    try {
      const response = await campaignCreate(newCampaign) as { data: any };
      const { campaign } = response.data;

      dispatch(campaignSuccess(types.CREATE_CAMPAIGN_SUCCESS, { campaign }));
    } catch (err: any) {
      const match = err?.response?.data?.match(/Error: (.*?)<br>/);
      const errorMessage = match ? match[1] : "Creation campaign failed";
      dispatch(campaignFailure(types.CREATE_CAMPAIGN_FAILURE, errorMessage));
    }
  };
};

export const getCampaigns = (userId: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(campaignRequest(types.GET_CAMPAIGNS_REQUEST));
    try {
      const response = await campaignsGet(userId) as { data: any };
      console.log(response)
      const campaigns = response.data;

      dispatch(campaignSuccess(types.GET_CAMPAIGNS_SUCCESS, { campaigns }));
    } catch (err: any) {
      const match = err?.response?.data?.match(/Error: (.*?)<br>/);
      const errorMessage = match ? match[1] : "Get campaigns failed";
      dispatch(campaignFailure(types.GET_CAMPAIGNS_FAILURE, errorMessage));
    }
  };
};