'use client';

import React, { useState } from 'react'
import Modal from '@/components/Modal';
import Button from '@/components/Button';
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

const CampaignModal = (props: Props) => {
  const { isOpen, userId, onClose, isEdit, defaultValues } = props
  const [mode, setMode] = useState("");
  const [aiStep, setAiStep] = useState(1);
  const [aiOutput, setAiOutput] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleAIInput = async (desc: any, audience: any) => {
    setIsGenerating(true);
    setAiError(null);
    try {
      const response = await campaignGenerateAd(desc, audience);
      setAiOutput(response.data);
      setAiStep(2);
    } catch (err: any) {
      setAiError(err?.response?.data?.message || 'Failed to generate a campaign. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setMode("");
    setAiStep(1);
    setAiOutput(null);
    setAiError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset}>
      {!mode && !isEdit && (
        <div className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Choose Campaign Creation Method</h2>
          <div className="flex flex-col gap-3">
            <Button variant="secondary" onClick={() => setMode('manual')}>Create Manually</Button>
            <Button onClick={() => setMode('ai')}>Use AI</Button>
          </div>
        </div>
      )}

      {(mode === 'manual'  || isEdit)&& <ManualForm userId={userId} onClose={handleReset} defaultValues={defaultValues} isEdit={isEdit} />}

      {mode === 'ai' && aiStep === 1 && (
        <div>
          {aiError && (
            <div className="mx-6 mt-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {aiError}
            </div>
          )}
          <AIFormStep1 onNext={handleAIInput} isSubmitting={isGenerating} />
        </div>
      )}

      {mode === 'ai' && aiStep === 2 && (
        <CampaignForm userId={userId} defaultValues={aiOutput} onClose={handleReset} isEdit={isEdit} />
      )}
    </Modal>
  )
}

export default CampaignModal