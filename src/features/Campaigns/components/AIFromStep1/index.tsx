'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/Button';
import { fieldClasses } from '@/components/Input';

const aiSchema = Yup.object({
  description: Yup.string().required('Required'),
  audience: Yup.string().required('Required'),
});

type Props = {
  onNext: (description: string, audience: string) => void,
  isSubmitting?: boolean
}

const AIFormStep1 = (props: Props) => {
  const { onNext, isSubmitting } = props

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Describe Your Product</h2>
      <Formik
        initialValues={{ description: '', audience: '' }}
        validationSchema={aiSchema}
        onSubmit={(values) => onNext(values.description, values.audience)}
      >
        <Form className="space-y-4">
          <div>
            <Field as="textarea" name="description" placeholder="Product Description..." className={fieldClasses} />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <Field as="textarea" name="audience" placeholder="Target Audience..." className={fieldClasses} />
            <ErrorMessage name="audience" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="flex justify-between">
            <Button type="submit" isLoading={isSubmitting}>
              {isSubmitting ? 'Generating...' : 'Next'}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default AIFormStep1
