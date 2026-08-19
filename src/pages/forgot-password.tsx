"use client"

import React, { useState } from 'react';
import Head from "next/head";
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { forgotPassword } from '@/features/Account/hooks';
import AuthCard from '@/components/AuthCard';
import Button from '@/components/Button';
import { fieldClasses } from '@/components/Input';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

function ForgotPassword() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Head>
        <title>Forgot Password - AdWise</title>
      </Head>
      <AuthCard
        title="Reset your password"
        subtitle="Enter your account email and we'll send you a link to reset your password."
        footer={
          <Link href="/login" className="text-brand-600 hover:underline">
            Back to sign in
          </Link>
        }
      >
        {sent ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg px-3 py-2">
            If an account exists for that email, we&apos;ve sent a reset link. Check your inbox.
          </div>
        ) : (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await forgotPassword(values.email);
              } catch {
                // Fall through to the generic message below either way -
                // the response shouldn't reveal whether the email exists.
              } finally {
                setSubmitting(false);
                setSent(true);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@email.com"
                    className={fieldClasses}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <Button type="submit" isLoading={isSubmitting} className="w-full">
                  {isSubmitting ? 'Sending...' : 'Send reset link'}
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </AuthCard>
    </>
  );
}

export default ForgotPassword;
