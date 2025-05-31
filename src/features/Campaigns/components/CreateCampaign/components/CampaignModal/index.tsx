'use client';

import React, { useState } from 'react'
import Modal from '@/components/Modal';
import CampaignForm, { ManualForm } from '../../../CampaignForm';
import AIFormStep1 from '../../../AIFromStep1';
import { campaignGenerateAd } from '@/features/Campaigns/hooks';

type Props = {
    isOpen: boolean,
    onClose: () => void,
    isEdit: boolean,
    defaultValues: any,
    userId: any,
}

type AIOutput = {
    campaignName: string;
    campaignType: string;
    budget: number;
    startDate: string;
    endDate: string;
    targeting: any;
  };

const mockAIResponse = {
    campaignName: "Summer Sale 2025",
    campaignType: "Search",
    budget: 100,
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    targeting: "United States, Age 18-35, Sportswear",
  };

const CampaignModal = (props: Props) => {
  const { isOpen, userId, onClose, isEdit, defaultValues } = props
  const [mode, setMode] = useState("");
  const [aiStep, setAiStep] = useState(1);
  const [aiOutput, setAiOutput] = useState<any | null>(null);

  const handleAIInput = async (desc: any, audience: any) => {
    // Simulate AI response
    const response = await campaignGenerateAd(desc, audience)
    console.log(response)
    setAiOutput(response.data);
    setAiStep(2);
  };

  const handleReset = () => {
    setMode("");
    setAiStep(1);
    setAiOutput(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset}>
      {!mode && !isEdit && (
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Choose Campaign Creation Method</h2>
          <div className="flex flex-col gap-4">
            <button onClick={() => setMode('manual')} className="bg-gray-800 text-white py-2 rounded hover:bg-gray-700">Create Manually</button>
            <button onClick={() => setMode('ai')} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-500">Use AI</button>
          </div>
        </div>
      )}

      {(mode === 'manual'  || isEdit)&& <ManualForm userId={userId} onClose={handleReset} defaultValues={defaultValues} isEdit={isEdit} />}

      {mode === 'ai' && aiStep === 1 && (
        <AIFormStep1 onNext={handleAIInput} />
      )}

      {mode === 'ai' && aiStep === 2 && (
        <CampaignForm userId={userId} defaultValues={aiOutput} onClose={handleReset} isEdit={isEdit} />
      )}
    </Modal>
  )
}

export default CampaignModal