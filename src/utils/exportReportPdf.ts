import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import convertDate from './convertDate';

type MetricPoint = {
  date: string
  impressions: number
  clicks: number
  cost: number
  conversions: number
}

const exportReportPdf = (campaigns: any[], metrics: MetricPoint[]) => {
  const totalImpressions = metrics.reduce((s, p) => s + p.impressions, 0);
  const totalClicks = metrics.reduce((s, p) => s + p.clicks, 0);
  const totalSpend = metrics.reduce((s, p) => s + p.cost, 0);
  const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('AdWise Performance Report', 14, 18);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 25);

  autoTable(doc, {
    startY: 32,
    head: [['Total Impressions', 'Total Clicks', 'Avg. CTR', 'Total Spend']],
    body: [[
      totalImpressions.toLocaleString(),
      totalClicks.toLocaleString(),
      `${avgCtr.toFixed(2)}%`,
      `$${totalSpend.toFixed(2)}`,
    ]],
    theme: 'grid',
    headStyles: { fillColor: [51, 65, 85] },
  });

  const summaryEndY = (doc as any).lastAutoTable.finalY;

  autoTable(doc, {
    startY: summaryEndY + 10,
    head: [['Campaign', 'Channel', 'Status', 'Impressions', 'Clicks', 'CTR', 'Spend', 'Date']],
    body: (campaigns || []).map((c: any) => [
      c?.campaignName ?? '',
      c?.campaignType ?? '',
      c?.status ?? '',
      (c?.impressions ?? 0).toLocaleString(),
      (c?.clicks ?? 0).toLocaleString(),
      c?.ctr ?? '',
      c?.spend ?? '',
      c?.endDate ? convertDate(c.endDate) : '—',
    ]),
    theme: 'striped',
    headStyles: { fillColor: [51, 65, 85] },
  });

  doc.save('reports.pdf');
};

export default exportReportPdf;
