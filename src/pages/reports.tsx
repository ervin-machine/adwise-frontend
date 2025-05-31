"use client"

import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StatsCards from '@/features/Reports/components/StatsCards'
import SearchAndFilter from '@/features/Reports/components/SearchAndFilter'
//import PerfomanceChart from '@/features/Reports/components/PerfomanceChart'
import ReportsTable from '@/features/Reports/components/ReportsTable'
import { generateCSV } from '@/features/Campaigns/hooks';
import { selectCampaigns } from '@/features/Campaigns/store/selectors';
import { getCampaigns } from '@/features/Campaigns/store/actions';
import { getLoggedUser } from '@/features/Account/store/actions';
import { selectToken, selectUser } from '@/features/Account/store/selectors';
import dynamic from 'next/dynamic';

const PerformanceChart = dynamic(() => import('@/features/Reports/components/PerfomanceChart'), {
  ssr: false,
});

type Props = {
  campaigns: any,
  token: any,
  user: any,
  getCampaigns: (userId: any) => void,
  getLoggedUser: () => void
}

const Reports = (props: Props) => {
  const { campaigns, token, user, getCampaigns, getLoggedUser } = props;

  useEffect(() => {
    getLoggedUser()
  }, [])

  useEffect(() => {
    if(token) {
      getCampaigns(user._id)
    } 
  }, [token])

  const handleGenerateCSV = async () => {
    const response = await generateCSV(campaigns)
    const blob = new Blob([response.data], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'reports.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  return (
    token && <>
        <StatsCards />
        <SearchAndFilter generateCSV={handleGenerateCSV} />
        <PerformanceChart campaigns={campaigns} />
        <ReportsTable reports={campaigns} />
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  campaigns: selectCampaigns(),
  token: selectToken(),
  user: selectUser()
  //user: selectUser(),
  //error: selectError()
});

const mapDispatchToProps = (dispatch: any) => ({
  generateCSV: (campaigns: any) => dispatch(generateCSV(campaigns)),
  getCampaigns: (userId: any) => dispatch(getCampaigns(userId)),
  getLoggedUser: () => dispatch(getLoggedUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Reports);