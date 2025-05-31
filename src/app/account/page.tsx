"use client";

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { updateUser, getLoggedUser } from '@/features/Account/store/actions';
import { selectUser, selectToken } from '@/features/Account/store/selectors';

type Props = {
  user: any,
  token: any,
  getLoggedUser: () => void,
  updateUser: (userId: any, updatedUser: any) => void
};

const AccountPage = ({ user, getLoggedUser, updateUser, token }: Props) => {
  useEffect(() => {
    getLoggedUser();
  }, []);

  const initialValues = {
    name: user?.name || '',
    email: user?.email || 'john.doe@gmail.com',
    phone: user?.phone || '+1234 567 8901',
    company: user?.company || 'Acme Corp',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    company: Yup.string().required('Company is required'),
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log('Updated Values:', values);
    updateUser(user._id, values)
    // You could dispatch an update action here
  };

  return (
    token && <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md space-y-10">
      {/* Profile Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name}`}
            alt="Avatar"
            className="w-16 h-16 rounded-full"
          />
        </div>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <Field
                    name="name"
                    className="w-full border rounded px-3 py-2"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email Address</label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full border rounded px-3 py-2"
                    disabled
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <Field
                    name="phone"
                    className="w-full border rounded px-3 py-2"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Company</label>
                  <Field
                    name="company"
                    className="w-full border rounded px-3 py-2"
                  />
                  <ErrorMessage name="company" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  disabled={isSubmitting || !dirty || !isValid}
                >
                  Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </section>

      {/* Security Section */}
      {/*<section>
        <h3 className="text-lg font-semibold mb-2">🔒 Security</h3>
        <div className="flex justify-between items-center mb-2">
          <span>Password</span>
          <button className="text-blue-600 hover:underline">Change Password</button>
        </div>
      </section>*/}

      {/* Google Ads Integration */}
      <section>
        <h3 className="text-lg font-semibold mb-2">📈 Google Ads Integration</h3>
        {!user?.connectedAds ? <button className="bg-green-600 text-white px-4 py-2 rounded">Connect with ADS</button> : <div className="flex justify-between items-center">
          <span>Connected as: {user.email}</span>
          <button className="bg-red-600 text-white px-4 py-2 rounded">Disconnect</button>
        </div>}
        
      </section>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectUser(),
  token: selectToken()
});

const mapDispatchToProps = (dispatch: any) => ({
  getLoggedUser: () => dispatch(getLoggedUser()),
  updateUser: (userId: any, updatedUser: any) => dispatch(updateUser(userId, updatedUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
