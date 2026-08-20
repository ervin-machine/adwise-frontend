import api from "../../../utils/api";

export const campaignCreate = (newCampaign: any) => {
    return api.post('campaign/create', newCampaign);
}

export const campaignsGet = (userId: any) => {
    return api.get(`campaign/${userId}`);
}

export const campaignUpdate = (campaignId: any, updatedCampaign: any) => {
    return api.put(`campaign/${campaignId}`, updatedCampaign);
}

export const campaignDelete = (campaignId: any) => {
    return api.delete(`campaign/${campaignId}`);
}

export const campaignUpdateStatus = (campaignId: any, status: 'active' | 'paused') => {
    return api.patch(`campaign/${campaignId}/status`, { status });
}

export const campaignGenerateAd = (describeProduct: any, targetAudience: any) => {
    return api.post('campaign/generatead', {describeProduct, targetAudience});
}

export const generateCSV = (campaigns: any) => {
    return api.post('campaign/export-csv', campaigns, { responseType: 'blob' });
}

export const getCampaignMetrics = (days: number = 30) => {
    return api.get('campaign/metrics', { params: { days } });
}

export const syncCampaignMetrics = () => {
    return api.post('campaign/sync-metrics');
}