"use client"
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { campaignCreate, campaignUpdate } from '../../hooks';
import * as Yup from 'yup';

const campaignSchema = Yup.object({
  campaignName: Yup.string().required('Required'),
  campaignType: Yup.string().required('Required'),
  budget: Yup.number().min(1, 'Must be positive').required('Required'),
  startDate: Yup.date().required('Required'),
  endDate: Yup.date().min(Yup.ref('startDate'), 'End date must be after start').required('Required'),
  confirmed: Yup.boolean().oneOf([true], 'You must confirm'),
});

type Props = {
    defaultValues: any,
    onClose: () => void,
    isEdit: boolean,
    userId: any,
}

function CampaignForm (props: Props) {
  const { defaultValues = {}, onClose, isEdit, userId } = props;

  const initialValues = {
    createdBy: userId,
    campaignName: defaultValues.campaignName || '',
    campaignType: defaultValues.campaignType || '',
    budget: defaultValues.budget || '',
    startDate: defaultValues.startDate || '',
    endDate: defaultValues.endDate || '',
    targeting: `age: ${defaultValues?.targetingInfo?.age.min} - ${defaultValues?.targetingInfo?.age.max} locations: ${defaultValues?.targetingInfo?.location} interests: ${defaultValues?.targetingInfo?.interests.map((l: any) => l)}` || '',
    confirmed: false,
    clicks: "0",
    ctr: "0",
    impressions: "0",
    spend: "0",
    status: "active",
    performance: "0"
  };

  const handleSubmit = (values: any) => {
    console.log("Submitted Campaign:", values);
    if(isEdit) campaignUpdate(defaultValues._id, values)
    else campaignCreate(values)
    setTimeout(() => {
      window.location.reload();
    }, 3000)
  };    

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Campaign Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={campaignSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <Field name="campaignName" placeholder="Campaign Name" className="w-full p-2 border rounded" />
              <ErrorMessage name="campaignName" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field as="select" name="campaignType" className="w-full p-2 border rounded">
                <option value="">Select type</option>
                <option value="Search">Search</option>
                <option value="Display">Display</option>
                <option value="Video">Video</option>
              </Field>
              <ErrorMessage name="campaignType" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="budget" type="number" placeholder="Daily Budget (USD)" className="w-full p-2 border rounded" />
              <ErrorMessage name="budget" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <Field name="startDate" type="date" className="w-full p-2 border rounded" />
                <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="w-1/2">
                <Field name="endDate" type="date" className="w-full p-2 border rounded" />
                <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div>
              <Field as="textarea" name="targeting" placeholder="Targeting info..." className="w-full p-2 border rounded" />
              <ErrorMessage name="targeting" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex items-center gap-2">
              <Field type="checkbox" name="confirmed" />
              <label>I confirm all information is correct</label>
            </div>
            <ErrorMessage name="confirmed" component="div" className="text-red-500 text-sm" />

            <div className="flex justify-between">
              <button type="submit" className="bg-black text-white px-4 py-2 rounded">Submit Campaign</button>
              <button type="button" onClick={onClose} className="text-gray-600 hover:underline">Cancel</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CampaignForm;
export const ManualForm = CampaignForm;