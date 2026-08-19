'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CampaignRows from '@/features/Campaigns/components/CampaignRows';
import { getCampaigns } from '@/features/Campaigns/store/actions';
import { syncCampaignMetrics } from '@/features/Campaigns/hooks';
import { selectCampaigns, selectIsLoading } from '@/features/Campaigns/store/selectors';
import { getLoggedUser } from '@/features/Account/store/actions';
import { selectToken, selectUser } from '@/features/Account/store/selectors';
import Button from '@/components/Button';
import { Input } from '@/components/Input';
import EmptyState from '@/components/EmptyState';
import { TableRowsSkeleton } from '@/components/Skeleton';

type Props = {
  campaigns: any,
  isLoading: boolean,
  token: any,
  user: any,
  getCampaigns: (userId: any) => void,
  getLoggedUser: () => Promise<any>
}

const STATUS_OPTIONS = ['All', 'Active', 'Paused', 'Ended'];
const TYPE_OPTIONS = ['All', 'Search', 'Display', 'Video'];
const COLUMN_COUNT = 9;

const chipClass = (isActive: boolean) =>
  `px-3 py-1 rounded-full border text-sm transition-colors ${
    isActive ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
  }`;

const Campaigns = (props: Props) => {
  const router = useRouter();
  const { campaigns, isLoading, token, user, getCampaigns, getLoggedUser } = props;
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getLoggedUser().then(() => {
      if (!cancelled) setCheckingAuth(false);
    });
    return () => { cancelled = true; };
  }, [])

  useEffect(() => {
    if (checkingAuth) return;
    if (!token) router.push('/login');
  }, [checkingAuth, token])

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const res = await syncCampaignMetrics();
      setSyncMessage(`Synced ${res.data.syncedRows} day(s) of data across ${res.data.campaigns} campaign(s).`);
    } catch {
      setSyncMessage('Sync failed. Please try again.');
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    if(token) getCampaigns(user._id)
  }, [token])

  const filteredCampaigns = campaigns?.filter((c: any) => {
    const matchStatus = statusFilter === 'All' || (c.status || '').toLowerCase() === statusFilter.toLowerCase();
    const matchType = typeFilter === 'All' || c.campaignType === typeFilter;
    const matchSearch = !search || c.campaignName?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchType && matchSearch;
  });

  const isEmpty = !isLoading && (!filteredCampaigns || filteredCampaigns.length === 0);
  const hasNoCampaignsAtAll = !isLoading && (!campaigns || campaigns.length === 0);

  return (
    token && <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-slate-900">AdWise Campaigns</h2>
        <Button variant="secondary" isLoading={isSyncing} onClick={handleSync}>
          {isSyncing ? 'Syncing...' : 'Sync with Google'}
        </Button>
      </div>
      {syncMessage && <p className="text-sm text-slate-500 mb-4">{syncMessage}</p>}

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        {/* Status Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-slate-500">Status:</span>
          {STATUS_OPTIONS.map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={chipClass(statusFilter === status)}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-slate-500">Type:</span>
          {TYPE_OPTIONS.map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={chipClass(typeFilter === type)}
            >
              {type}
            </button>
          ))}
        </div>

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search campaigns..."
          aria-label="Search campaigns"
          className="sm:ml-auto sm:w-64"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
        {isEmpty ? (
          <EmptyState
            title={hasNoCampaignsAtAll ? "No campaigns yet" : "No campaigns match your filters"}
            description={
              hasNoCampaignsAtAll
                ? "Create your first campaign from the sidebar to get started."
                : "Try a different search term or clear your filters."
            }
          />
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
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
              {isLoading ? (
                <TableRowsSkeleton columns={COLUMN_COUNT} />
              ) : (
                filteredCampaigns?.map((c: any, i: any) => (
                  <CampaignRows key={c._id ?? i} campaign={c} userId={user?._id} />
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  campaigns: selectCampaigns(),
  isLoading: selectIsLoading(),
  token: selectToken(),
  user: selectUser()
});

const mapDispatchToProps = (dispatch: any) => ({
  getCampaigns: (userId: any) => dispatch(getCampaigns(userId)),
  getLoggedUser: () => dispatch(getLoggedUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Campaigns);
