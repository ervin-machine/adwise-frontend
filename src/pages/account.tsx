"use client";
import "../app/globals.css"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { updateUser, getLoggedUser, toggleAdsConnection } from '@/features/Account/store/actions';
import { forgotPassword } from '@/features/Account/hooks';
import { selectUser, selectToken } from '@/features/Account/store/selectors';
import Button from '@/components/Button';
import { fieldClasses } from '@/components/Input';

type Props = {
  user: any,
  token: any,
  getLoggedUser: () => Promise<any>,
  updateUser: (userId: any, updatedUser: any) => void,
  toggleAdsConnection: (connected: boolean) => Promise<{ success: boolean; error?: string }>
};

const Account = ({ user, getLoggedUser, updateUser, toggleAdsConnection, token }: Props) => {
  const router = useRouter();
  const [resetSent, setResetSent] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getLoggedUser().then(() => {
      if (!cancelled) setCheckingAuth(false);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (checkingAuth) return;
    if (!token) router.push('/login');
  }, [checkingAuth, token]);

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
    updateUser(user._id, values)
  };

  const handleSendResetEmail = async () => {
    if (!user?.email) return;
    setIsSendingReset(true);
    try {
      await forgotPassword(user.email);
    } finally {
      setIsSendingReset(false);
      setResetSent(true);
    }
  };

  return (
    token && <div className="max-w-3xl mx-auto p-8 bg-white border border-slate-200 shadow-sm rounded-2xl space-y-10">
      {/* Profile Section */}
      <section>
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Settings</h2>
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}`}
            alt={user?.name ? `${user.name}'s avatar` : 'Avatar'}
            className="w-16 h-16 rounded-full bg-slate-200"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <Field id="name" name="name" className={fieldClasses} />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <Field id="email" name="email" type="email" className={`${fieldClasses} bg-slate-50 text-slate-400`} disabled />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <Field id="phone" name="phone" className={fieldClasses} />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                  <Field id="company" name="company" className={fieldClasses} />
                  <ErrorMessage name="company" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button type="submit" isLoading={isSubmitting} disabled={!dirty || !isValid}>
                  Save Changes
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>

      {/* Security Section */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Security</h3>
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-sm text-slate-700">Password</p>
            {resetSent && (
              <p className="text-sm text-emerald-600 mt-0.5">Check your inbox for a reset link.</p>
            )}
          </div>
          <Button variant="secondary" size="sm" isLoading={isSendingReset} onClick={handleSendResetEmail}>
            Send reset link
          </Button>
        </div>
      </section>

      {/* Google Ads Integration */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Google Ads Integration</h3>
        {!user?.connectedAds ? (
          <Button onClick={() => toggleAdsConnection(true)}>
            Connect with ADS
          </Button>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-700">Connected as: {user.email}</span>
            <Button variant="danger" onClick={() => toggleAdsConnection(false)}>
              Disconnect
            </Button>
          </div>
        )}
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
  updateUser: (userId: any, updatedUser: any) => dispatch(updateUser(userId, updatedUser)),
  toggleAdsConnection: (connected: boolean) => dispatch(toggleAdsConnection(connected))
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
