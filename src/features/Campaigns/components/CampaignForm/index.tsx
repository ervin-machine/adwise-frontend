'use client'

import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { campaignCreate, campaignUpdate } from '../../hooks';
import * as Yup from 'yup';
import Button from '@/components/Button';
import { fieldClasses } from '@/components/Input';

const campaignSchema = Yup.object({
  campaignName: Yup.string().required('Required'),
  campaignType: Yup.string().required('Required'),
  budget: Yup.number().min(1, 'Must be positive').required('Required'),
  startDate: Yup.date().required('Required'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'End date must be after start')
    .required('Required'),
  confirmed: Yup.boolean().oneOf([true], 'You must confirm'),
  interests: Yup.string().when('campaignType', {
    is: (val: string) => val === 'Display' || val === 'Video',
    then: (schema) => schema.required('Interests required for this type'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

type Props = {
  defaultValues: any;
  onClose: () => void;
  isEdit: boolean;
  userId: any;
};

function CampaignForm(props: Props) {
  const { defaultValues = {}, onClose, isEdit, userId } = props;
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialValues = {
    createdBy: userId,
    campaignName: defaultValues.campaignName || '',
    campaignType: defaultValues.campaignType || '',
    budget: defaultValues.budget || '',
    startDate: defaultValues.startDate || '',
    endDate: defaultValues.endDate || '',
    interests: defaultValues?.targetingInfo?.interests?.join(', ') || '',
    targetingInfo: defaultValues?.targetingInfo || {
      age: {
        min:  '',
        max: '',
      },
      location: '', // e.g. "2840,2392"
    },
    confirmed: false,
    clicks: defaultValues.clicks ?? "0",
    ctr: defaultValues.ctr ?? "0",
    impressions: defaultValues.impressions ?? "0",
    spend: defaultValues.spend ?? "0",
    status: (defaultValues.status || "active").toLowerCase(),
    performance: defaultValues.performance ?? "0"
  };

  const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (v: boolean) => void }) => {
    setSubmitError(null);
    try {
      if (isEdit) await campaignUpdate(defaultValues._id, values);
      else await campaignCreate(values);
      onClose();
      window.location.reload();
    } catch (err: any) {
      setSubmitError(err?.response?.data?.message || 'Failed to save campaign. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Campaign Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={campaignSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className="space-y-4">
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">
                {submitError}
              </div>
            )}
            <div>
              <Field name="campaignName" placeholder="Campaign Name" className={fieldClasses} />
              <ErrorMessage name="campaignName" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Field as="select" name="campaignType" className={fieldClasses}>
                <option value="">Select type</option>
                <option value="Search">Search</option>
                <option value="Display">Display</option>
                <option value="Video">Video</option>
              </Field>
              <ErrorMessage name="campaignType" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Field name="budget" type="number" placeholder="Daily Budget (USD)" className={fieldClasses} />
              <ErrorMessage name="budget" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <Field name="startDate" type="date" className={fieldClasses} />
                <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="w-1/2">
                <Field name="endDate" type="date" className={fieldClasses} />
                <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            {/** Dynamic Interests Field */}
            {(values.campaignType === 'Display' || values.campaignType === 'Video') && (
              <div>
                <Field
                  as="textarea"
                  name="interests"
                  placeholder="Enter interests (comma-separated)"
                  className={fieldClasses}
                />
                <ErrorMessage name="interests" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Min Age */}
              <div>
                <label htmlFor="targetingInfo.age.min" className="block text-sm font-medium text-slate-700 mb-1">
                  Min Age
                </label>
                <Field
                  type="number"
                  name="targetingInfo.age.min"
                  placeholder="e.g. 18"
                  className={fieldClasses}
                />
                <ErrorMessage name="targetingInfo.age.min" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Max Age */}
              <div>
                <label htmlFor="targetingInfo.age.max" className="block text-sm font-medium text-slate-700 mb-1">
                  Max Age
                </label>
                <Field
                  type="number"
                  name="targetingInfo.age.max"
                  placeholder="e.g. 34"
                  className={fieldClasses}
                />
                <ErrorMessage name="targetingInfo.age.max" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Locations */}
              <div className="md:col-span-2">
                <label htmlFor="targetingInfo.location" className="block text-sm font-medium text-slate-700 mb-1">
                  Locations (comma-separated geo codes)
                </label>
                <Field
                  type="text"
                  name="targetingInfo.location"
                  placeholder="e.g. 2840,2392"
                  className={fieldClasses}
                />
                <ErrorMessage name="targetingInfo.location" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Field type="checkbox" name="confirmed" id="confirmed" className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
              <label htmlFor="confirmed" className="text-sm text-slate-700">I confirm all information is correct</label>
            </div>
            <ErrorMessage name="confirmed" component="div" className="text-red-500 text-sm" />

            <div className="flex justify-between items-center pt-2">
              <Button type="submit" isLoading={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Submit Campaign'}
              </Button>
              <button type="button" onClick={onClose} className="text-sm text-slate-500 hover:text-slate-700 hover:underline">
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CampaignForm;
export const ManualForm = CampaignForm;
