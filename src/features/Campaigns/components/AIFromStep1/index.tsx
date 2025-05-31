'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const aiSchema = Yup.object({
  description: Yup.string().required('Required'),
  audience: Yup.string().required('Required'),
});

type Props = {
  onNext: (description: string, audience: string) => void
}

const AIFormStep1 = (props: Props) => {
  const { onNext } = props

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Describe Your Product</h2>
      <Formik
        initialValues={{ description: '', audience: '' }}
        validationSchema={aiSchema}
        onSubmit={(values) => onNext(values.description, values.audience)}
      >
        <Form className="space-y-4">
          <div>
            <Field as="textarea" name="description" placeholder="Product Description..." className="w-full border p-2 rounded" />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <Field as="textarea" name="audience" placeholder="Target Audience..." className="w-full border p-2 rounded" />
            <ErrorMessage name="audience" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default AIFormStep1