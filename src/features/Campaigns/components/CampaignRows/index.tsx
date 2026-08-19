"use client"
import React, { useState } from 'react'
import { Trash2, Pencil, Pause, Play } from 'lucide-react';
import CampaignModal from '../CreateCampaign/components/CampaignModal';
import StatusBadge from '@/components/Badge';
import convertDate from '@/utils/convertDate';
import { campaignDelete } from '../../hooks';

type Props = {
    campaign: any,
    userId: any
}

const iconButtonClass =
  'h-8 w-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500';

const CampaignRows = (props: Props) => {
  const { campaign, userId } = props;
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false)
  const status = (campaign.status || '').toLowerCase();

  const handleOpenModal = () => setIsCampaignModalOpen(true)
  const handleCloseModal = () => setIsCampaignModalOpen(false)

  const handleDelete = () => {
    if (window.confirm(`Delete "${campaign.campaignName}"? This can't be undone.`)) {
      campaignDelete(campaign._id);
    }
  };

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50">
        <td className="px-4 py-3 font-medium text-slate-900">{campaign.campaignName}</td>
        <td className="px-4 py-3">
          <StatusBadge status={campaign.status} />
        </td>
        <td className="px-4 py-3">
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{campaign.campaignType}</span>
        </td>
        <td className="px-4 py-3">{campaign.budget}</td>
        <td className="px-4 py-3">{campaign.startDate ? convertDate(campaign.startDate) : '—'}</td>
        <td className="px-4 py-3">{campaign.endDate ? convertDate(campaign.endDate) : '—'}</td>
        <td className="px-4 py-3">{campaign.clicks}</td>
        <td className="px-4 py-3">{campaign.impressions}</td>
        <td className="px-4 py-3">
          <div className="flex gap-1">
            <button type="button" onClick={handleDelete} aria-label={`Delete ${campaign.campaignName}`} className={iconButtonClass}>
              <Trash2 size={16} />
            </button>
            <button type="button" onClick={handleOpenModal} aria-label={`Edit ${campaign.campaignName}`} className={iconButtonClass}>
              <Pencil size={16} />
            </button>
            <button
              type="button"
              aria-label={status === 'paused' ? `Resume ${campaign.campaignName}` : `Pause ${campaign.campaignName}`}
              className={iconButtonClass}
            >
              {status === 'paused' ? <Play size={16} /> : <Pause size={16} />}
            </button>
          </div>
        </td>
        <CampaignModal userId={userId} isOpen={isCampaignModalOpen} onClose={handleCloseModal} isEdit={true} defaultValues={campaign} />
  </tr>
  )
}

export default CampaignRows
