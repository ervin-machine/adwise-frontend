"use client"

import React, { useEffect, useState } from 'react'
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

import { loginUser, getLoggedUser, googleAuth } from '@/features/Account/store/actions';
import { selectToken, selectError } from '@/features/Account/store/selectors';
import AuthCard from '@/components/AuthCard';
import Button from '@/components/Button';
import { fieldClasses } from '@/components/Input';

type Props = {
  token: any,
  error: any,
  loginUser: (loginBody: any) => Promise<{ success: boolean; error?: string }>,
  googleAuth: (credential: string) => Promise<{ success: boolean; error?: string }>,
  getLoggedUser: () => Promise<any>
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Too short!').required('Password is required'),
});

function Login(props: Props) {
  const router = useRouter()
  const { token, error, getLoggedUser, loginUser, googleAuth } = props
  const [googleError, setGoogleError] = useState<string | null>(null);

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) return;
    setGoogleError(null);
    const result = await googleAuth(credentialResponse.credential);
    if (result?.success) {
      router.push('/dashboard');
    } else if (result?.error) {
      setGoogleError(result.error);
    }
  };

  useEffect(() => {
    getLoggedUser()
  }, [])

  useEffect(() => {
    if (token) router.push('/dashboard');
  }, [token])

  return (
    token ? null : <>
      <Head>
        <title>AdWise Login</title>
      </Head>
      <AuthCard
        title="Sign in to AdWise Dashboard"
        subtitle="Access your campaigns, create new ones, and manage your AdWise account."
        footer={
          <>
            Don&rsquo;t have an account?{" "}
            <Link href="/register" className="text-brand-600 hover:underline">
              Register
            </Link>
          </>
        }
      >
        <Formik
          initialValues={{ email: '', password: ''}}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const result = await loginUser(values);
            setSubmitting(false);
            if (result?.success) {
              router.push('/dashboard');
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">
                  {error}
                </div>
              )}
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

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className={fieldClasses}
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link href="/forgot-password" className="text-brand-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" isLoading={isSubmitting} className="w-full">
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>

              <div className="flex items-center my-4">
                <hr className="flex-grow border-slate-200" />
                <span className="mx-2 text-sm text-slate-400">Or continue with</span>
                <hr className="flex-grow border-slate-200" />
              </div>

              {googleError && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2 mb-3">
                  {googleError}
                </div>
              )}
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setGoogleError('Google sign-in was cancelled or failed. Please try again.')}
                  width="100%"
                />
              </div>
            </Form>
          )}
        </Formik>
      </AuthCard>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  token: selectToken(),
  error: selectError()
});

const mapDispatchToProps = (dispatch: any) => ({
  loginUser: (loginBody: any) => dispatch(loginUser(loginBody)),
  googleAuth: (credential: string) => dispatch(googleAuth(credential)),
  getLoggedUser: () => dispatch(getLoggedUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);