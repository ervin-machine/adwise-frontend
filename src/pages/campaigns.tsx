'use client';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CampaignRows from '@/features/Campaigns/components/CampaignRows';
import { getCampaigns } from '@/features/Campaigns/store/actions';
import { selectCampaigns } from '@/features/Campaigns/store/selectors';
import { getLoggedUser } from '@/features/Account/store/actions';
import { selectToken, selectUser } from '@/features/Account/store/selectors';

type Props = {
  campaigns: any,
  token: any,
  user: any,
  getCampaigns: (userId: any) => void,
  getLoggedUser: () => void
}

const Campaigns = (props: Props) => {
  const { campaigns, token, user, getCampaigns, getLoggedUser } = props;
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  useEffect(() => {
    getLoggedUser()
  }, [])

  useEffect(() => {
    if(token) getCampaigns(user._id)
  }, [token])

  const filteredCampaigns = campaigns?.filter((c: any) => {
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchType = typeFilter === 'All' || c.type === typeFilter;
    return matchStatus && matchType;
  });

  return (
    token && <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">AdWise Campaigns</h2>
        <div className="flex gap-2">
          <button className="btn-outline">Sync with Google</button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span>Status:</span>
          {['All', 'Active', 'Paused', 'Ended'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded border ${statusFilter === status ? 'bg-black text-white' : 'bg-white'}`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <span>Type:</span>
          {['All', 'Search', 'Display', 'Video'].map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1 rounded border ${typeFilter === type ? 'bg-black text-white' : 'bg-white'}`}
            >
              {type}
            </button>
          ))}
        </div>

        <input className="input ml-auto" placeholder="Search campaigns..." />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Campaign</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Budget</th>
              <th className="px-4 py-2 text-left">Start</th>
              <th className="px-4 py-2 text-left">End</th>
              <th className="px-4 py-2 text-left">Clicks</th>
              <th className="px-4 py-2 text-left">Impressions</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns?.map((c: any, i: any) => (
              <CampaignRows key={i} campaign={c} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  campaigns: selectCampaigns(),
  token: selectToken(),
  user: selectUser()
});

const mapDispatchToProps = (dispatch: any) => ({
  getCampaigns: (userId: any) => dispatch(getCampaigns(userId)),
  getLoggedUser: () => dispatch(getLoggedUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Campaigns);