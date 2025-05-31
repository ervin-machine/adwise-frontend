"use client"

import React, { useEffect } from 'react'
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { loginUser, getLoggedUser } from '@/features/Account/store/actions';
import { selectToken } from '@/features/Account/store/selectors';

type Props = {
  token: any,
  loginUser: (loginBody: any) => void,
  getLoggedUser: () => void
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Too short!').required('Password is required'),
});

function Login(props: Props) {
  const router = useRouter()
  const { token, getLoggedUser, loginUser } = props

  useEffect(() => {
    if(token) router.push('/dashboard')
  }, [token])

  useEffect(() => {
    getLoggedUser()
  }, [])

  return (
    token ? null : <>
      <Head>
        <title>AdWise Login</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-200 rounded-full p-3">
              <span className="text-2xl font-semibold text-gray-600">G</span>
            </div>
          </div>
          <h2 className="text-center text-xl font-semibold mb-1">
            Sign in to AdWise Dashboard
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Access your campaigns, create new ones, and manage your AdWise account.
          </p>

          <Formik
            initialValues={{ email: '', password: ''}}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log('Form values:', values);
              loginUser(values)
              router.push('/dashboard')
              /*setTimeout(() => {
                setSubmitting(false);
                window.location.href = "/dashboard"; // simulate redirect
              }, 500);*/
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@email.com"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <a href="#" className="text-indigo-600 hover:underline">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>

                <div className="flex items-center my-4">
                  <hr className="flex-grow border-gray-300" />
                  <span className="mx-2 text-sm text-gray-400">Or continue with</span>
                  <hr className="flex-grow border-gray-300" />
                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => window.location.href = '/dashboard'} // simulate Google login
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#4285F4"
                      d="M24 9.5c3.57 0 6.79 1.36 9.26 3.59l6.91-6.91C35.61 2.36 30.09 0 24 0 14.93 0 7.15 5.81 3.69 14.04l8.06 6.26C13.18 13.8 18.13 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.1 24.55c0-1.62-.15-3.2-.42-4.72H24v9.3h12.4c-.54 2.89-2.12 5.34-4.51 7.02l7.08 5.5c4.13-3.8 6.54-9.38 6.54-16.1z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M12.94 28.74a14.56 14.56 0 0 1 0-9.49l-8.06-6.26A23.92 23.92 0 0 0 0 24c0 3.91.94 7.6 2.61 10.85l8.2-6.11z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 48c6.09 0 11.61-2.01 15.48-5.46l-7.08-5.5c-2.03 1.37-4.62 2.18-7.4 2.18-5.87 0-10.82-4.3-12.25-10.08l-8.2 6.11C7.15 42.19 14.93 48 24 48z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link href="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  token: selectToken()
});

const mapDispatchToProps = (dispatch: any) => ({
  loginUser: (loginBody: any) => dispatch(loginUser(loginBody)),
  getLoggedUser: () => dispatch(getLoggedUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);