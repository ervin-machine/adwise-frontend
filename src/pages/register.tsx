"use client"

import React, { useEffect, useState } from 'react';
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { registerUser, getLoggedUser, googleAuth } from '@/features/Account/store/actions';
import { selectError, selectToken } from '@/features/Account/store/selectors';
import AuthCard from '@/components/AuthCard';
import Button from '@/components/Button';
import { fieldClasses } from '@/components/Input';

type FormValues = {
  name: string;
  company: string;
  phone: string;
  email: string;
  password: string;
};

type Props = {
  token: any,
  error: any,
  registerUser: (values: any) => Promise<{ success: boolean; error?: string }>,
  googleAuth: (credential: string) => Promise<{ success: boolean; error?: string }>,
  getLoggedUser: () => void
}

const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  company: Yup.string().required("Company name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});


function Register(props: Props) {
  const { token, error, registerUser, getLoggedUser, googleAuth } = props;
  const router = useRouter();
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

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      company: '',
      phone: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const result = await registerUser(values);
      setSubmitting(false);
      if (result?.success) {
        router.push('/dashboard');
      }
    },
  });

  useEffect(() => {
    getLoggedUser()
  }, [])

  useEffect(() => {
    if (token) router.push('/dashboard');
  }, [token])

  return (
    token ? null : <>
      <Head>
        <title>Register - AdWise Dashboard</title>
      </Head>
      <AuthCard
        title="Create your AdWise Account"
        subtitle="Register to manage your ad campaigns, monitor performance, and more."
        footer={
          <>
            Already have an account?{' '}
            <Link href="/login" className="text-brand-600 hover:underline">
              Sign in
            </Link>
          </>
        }
      >
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...formik.getFieldProps("name")}
              placeholder="John Doe"
              className={fieldClasses}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
              Company
            </label>
            <input
              type="text"
              id="company"
              {...formik.getFieldProps("company")}
              placeholder="Company Inc."
              className={fieldClasses}
            />
            {formik.touched.company && formik.errors.company && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.company}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              {...formik.getFieldProps("phone")}
              placeholder="+1234567890"
              className={fieldClasses}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              placeholder="you@email.com"
              className={fieldClasses}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
              placeholder="Create a password"
              className={fieldClasses}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" isLoading={formik.isSubmitting} className="w-full">
            {formik.isSubmitting ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        {/* Separator */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-slate-200" />
          <span className="mx-2 text-sm text-slate-400">Or continue with</span>
          <hr className="flex-grow border-slate-200" />
        </div>

        {/* Google Button */}
        {googleError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            {googleError}
          </p>
        )}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setGoogleError('Google sign-up was cancelled or failed. Please try again.')}
            width="100%"
            text="signup_with"
          />
        </div>
      </AuthCard>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  error: selectError(),
  token: selectToken()
});

const mapDispatchToProps = (dispatch: any) => ({
  registerUser: (newUser: any) => dispatch(registerUser(newUser)),
  googleAuth: (credential: string) => dispatch(googleAuth(credential)),
  getLoggedUser: () => dispatch(getLoggedUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
