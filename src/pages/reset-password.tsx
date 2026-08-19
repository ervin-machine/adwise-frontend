"use client"

import React, { useState } from 'react';
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { resetPassword } from '@/features/Account/hooks';
import AuthCard from '@/components/AuthCard';
import Button from '@/components/Button';
import { fieldClasses } from '@/components/Input';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

function ResetPassword() {
  const router = useRouter();
  const token = typeof router.query.token === 'string' ? router.query.token : '';
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Reset Password - AdWise</title>
      </Head>
      <AuthCard title="Set a new password" subtitle="Choose a new password for your AdWise account.">
        {router.isReady && !token && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            This reset link is missing its token. Request a new one from the{' '}
            <Link href="/forgot-password" className="underline">forgot password</Link> page.
          </div>
        )}

        {done ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg px-3 py-2">
            Your password has been reset. <Link href="/login" className="underline">Sign in</Link>.
          </div>
        ) : (
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={ResetPasswordSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setError(null);
              try {
                await resetPassword(token, values.password);
                setDone(true);
              } catch (err: any) {
                setError(err?.response?.data?.message || 'That reset link is invalid or has expired.');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {error && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                    New password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className={fieldClasses}
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
                    Confirm password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className={fieldClasses}
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <Button type="submit" isLoading={isSubmitting} disabled={!token} className="w-full">
                  {isSubmitting ? 'Resetting...' : 'Reset password'}
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </AuthCard>
    </>
  );
}

export default ResetPassword;
