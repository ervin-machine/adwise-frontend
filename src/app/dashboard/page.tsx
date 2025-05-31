"use client"
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SearchAndFilter from '@/features/Dashboard/components/SearchAndFilter'
import CampaignTable from '@/features/Dashboard/components/CampaignTable'
import StatsCards from '@/features/Dashboard/components/StatsCards'
import { selectCampaigns } from '@/features/Campaigns/store/selectors';
import { getCampaigns } from '@/features/Campaigns/store/actions';
import { getLoggedUser } from '@/features/Account/store/actions';
import { selectToken, selectUser } from '@/features/Account/store/selectors';

type Props = {
  campaigns: any,
  token: any,
  user: any,
  getCampaigns: (userId: any) => void,
  getLoggedUser: () => void
}

const DashboardPage = (props: Props) => {
  const { campaigns, token, user, getCampaigns, getLoggedUser } = props;

  useEffect(() => {
    getLoggedUser()
  }, [])

  useEffect(() => {
    if(token) getCampaigns(user._id)
  }, [token])

  return (
    token && <>
        <SearchAndFilter />
        <CampaignTable campaigns={campaigns} />
        <StatsCards campaigns={campaigns} />
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  campaigns: selectCampaigns(),
  token: selectToken(),
  user: selectUser()
});

const mapDispatchToProps = (dispatch: any) => ({
  getCampaigns: (userId: any) => dispatch(getCampaigns(userId)),
  getLoggedUser: () => dispatch(getLoggedUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);