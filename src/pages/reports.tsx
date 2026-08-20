"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StatsCards from '@/features/Reports/components/StatsCards'
import SearchAndFilter from '@/features/Reports/components/SearchAndFilter'
import ReportsTable from '@/features/Reports/components/ReportsTable'
import { generateCSV, getCampaignMetrics } from '@/features/Campaigns/hooks';
import { selectCampaigns, selectIsLoading } from '@/features/Campaigns/store/selectors';
import { getCampaigns } from '@/features/Campaigns/store/actions';
import { getLoggedUser } from '@/features/Account/store/actions';
import { selectToken, selectUser } from '@/features/Account/store/selectors';
import dynamic from 'next/dynamic';
import exportReportPdf from '@/utils/exportReportPdf';

const PerformanceChart = dynamic(() => import('@/features/Reports/components/PerfomanceChart'), {
  ssr: false,
});

type MetricPoint = {
  date: string
  impressions: number
  clicks: number
  cost: number
  conversions: number
}

type Props = {
  campaigns: any,
  isLoading: boolean,
  token: any,
  user: any,
  getCampaigns: (userId: any) => void,
  getLoggedUser: () => Promise<any>
}

const Reports = (props: Props) => {
  const router = useRouter();
  const { campaigns, isLoading, token, user, getCampaigns, getLoggedUser } = props;
  const [metrics, setMetrics] = useState<MetricPoint[]>([]);
  const [metricsLoading, setMetricsLoading] = useState(true);
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
    if (!token) { router.push('/login'); return; }
    getCampaigns(user._id)

    setMetricsLoading(true);
    getCampaignMetrics(30)
      .then((res) => setMetrics(res.data))
      .catch(() => setMetrics([]))
      .finally(() => setMetricsLoading(false));
  }, [checkingAuth, token])

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

  const handleGeneratePDF = () => {
    exportReportPdf(campaigns, metrics)
  }
  return (
    token && <>
        <StatsCards metrics={metrics} />
        <SearchAndFilter generateCSV={handleGenerateCSV} generatePDF={handleGeneratePDF} />
        {!metricsLoading && <PerformanceChart metrics={metrics} />}
        <ReportsTable reports={campaigns} isLoading={isLoading} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
