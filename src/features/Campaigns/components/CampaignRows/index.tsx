"use client"
import React, { useState } from 'react'
import { Delete, Edit, Pause, Play } from 'lucide-react';
import CampaignModal from '../CreateCampaign/components/CampaignModal';
import { campaignDelete } from '../../hooks';

type Props = {
    campaign: any
}

const CampaignRows = (props: Props) => {
  const { campaign } = props;
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false)
  console.log(campaign)

  const handleOpenModal = () => setIsCampaignModalOpen(true)
  const handleCloseModal = () => setIsCampaignModalOpen(false)

  return (
    <tr className="border-b">
        <td className="px-4 py-3 font-medium">{campaign.campaignName}</td>
        <td className="px-4 py-3">
          <span className={`px-2 py-1 text-xs rounded-full ${campaign.status === 'Active' ? 'bg-green-100 text-green-800' : campaign.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-700'}`}>
            {campaign.status}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{campaign.campaignType}</span>
        </td>
        <td className="px-4 py-3">{campaign.budget}</td>
        <td className="px-4 py-3">{campaign.startDate}</td>
        <td className="px-4 py-3">{campaign.endDate}</td>
        <td className="px-4 py-3">{campaign.clicks}</td>
        <td className="px-4 py-3">{campaign.impressions}</td>
        <td className="px-4 py-3 flex gap-2">
          <button onClick={() => campaignDelete(campaign._id)}><Delete size={16} /></button>
          <button onClick={handleOpenModal}><Edit size={16} /></button>
          <button>{campaign.status === 'Paused' ? <Play size={16} /> : <Pause size={16} />}</button>
        </td>
        <CampaignModal isOpen={isCampaignModalOpen} onClose={handleCloseModal} isEdit={true} defaultValues={campaign} />
  </tr>
  )
}

export default CampaignRows