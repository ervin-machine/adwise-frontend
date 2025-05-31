"use client"

import React, { useEffect } from 'react';
import Head from "next/head";
import Link from 'next/link';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser, getLoggedUser } from '@/features/Account/store/actions';
import { selectUser, selectError, selectToken } from '@/features/Account/store/selectors';

type FormValues = {
  name: string;
  company: string;
  phone: string;
  email: string;
  password: string;
};

type Props = {
  token: any,
  registerUser: (values: any) => void,
  getLoggedUser: () => void
}

const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  company: Yup.string().required("Company name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});


function RegisterPage(props: Props) {
  const { token, registerUser, getLoggedUser } = props;

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      company: '',
      phone: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted", values);
      // Navigate or send data
      registerUser(values)
    },
  });

  useEffect(() => {
    getLoggedUser()
  }, [])

  return (
    token ? null : <>
      <Head>
        <title>Register - AdWise Dashboard</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-200 rounded-full p-3">
              <span className="text-2xl font-semibold text-gray-600">G</span>
            </div>
          </div>
          <h2 className="text-center text-xl font-semibold mb-1">
            Create your AdWise Account
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Register to manage your ad campaigns, monitor performance, and more.
          </p>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                {...formik.getFieldProps("name")}
                placeholder="John Doe"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.name}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                id="company"
                {...formik.getFieldProps("company")}
                placeholder="Company Inc."
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {formik.touched.company && formik.errors.company && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.company}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                {...formik.getFieldProps("phone")}
                placeholder="+1234567890"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                placeholder="you@email.com"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...formik.getFieldProps("password")}
                placeholder="Create a password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800"
            >
              Sign Up
            </button>
          </form>

          {/* Separator */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-400">Or continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {/* Google SVG Icon */}
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M24 9.5..." />
              {/* truncated for brevity */}
            </svg>
            Sign up with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  user: selectUser(),
  error: selectError(),
  token: selectToken()
});

const mapDispatchToProps = (dispatch: any) => ({
  registerUser: (newUser: any) => dispatch(registerUser(newUser)),
  getLoggedUser: () => dispatch(getLoggedUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);