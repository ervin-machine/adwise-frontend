"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SearchAndFilter from '@/features/Dashboard/components/SearchAndFilter'
import CampaignTable from '@/features/Dashboard/components/CampaignTable'
import StatsCards from '@/features/Dashboard/components/StatsCards'
import { selectCampaigns, selectIsLoading } from '@/features/Campaigns/store/selectors';
import { getCampaigns } from '@/features/Campaigns/store/actions';
import { getLoggedUser } from '@/features/Account/store/actions';
import { selectToken, selectUser } from '@/features/Account/store/selectors';

type Props = {
  campaigns: any,
  isLoading: boolean,
  token: any,
  user: any,
  getCampaigns: (userId: any) => void,
  getLoggedUser: () => Promise<any>
}

const Dashboard = (props: Props) => {
  const router = useRouter()
  const { campaigns, isLoading, token, user, getCampaigns, getLoggedUser } = props;
  const [checkingAuth, setCheckingAuth] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');

  useEffect(() => {
    let cancelled = false;
    getLoggedUser().then(() => {
      if (!cancelled) setCheckingAuth(false);
    });
    return () => { cancelled = true; };
  }, [])

  useEffect(() => {
    if (checkingAuth) return;
    if (token) getCampaigns(user._id)
    else router.push('/login')
  }, [checkingAuth, token])

  const filteredCampaigns = campaigns?.filter((c: any) => {
    const matchesSearch = !search || c.campaignName?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || (c.status || '').toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    token && <>
        <SearchAndFilter search={search} onSearchChange={setSearch} status={statusFilter} onStatusChange={setStatusFilter} />
        <CampaignTable campaigns={filteredCampaigns} isLoading={isLoading} />
        <StatsCards campaigns={campaigns} />
    </>
  )
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);