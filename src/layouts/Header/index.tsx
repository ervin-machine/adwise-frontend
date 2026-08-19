"use client";

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser, selectToken } from '@/features/Account/store/selectors';
import { getLoggedUser } from '@/features/Account/store/actions';

type Props = {
  user: any,
  token: any,
  getLoggedUser: () => void,
  onMenuClick?: () => void
}

const Header = (props: Props) => {
  const { user, token, getLoggedUser, onMenuClick } = props

  useEffect(() => {
    getLoggedUser()
  }, [])

  return (
    token && <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-white border-b border-slate-200">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
        <h1 className="text-base md:text-lg font-semibold text-slate-900">AdWise Manager</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative h-9 w-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <span className="sr-only">Notifications</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </button>
        <img
          className="w-8 h-8 rounded-full bg-slate-200"
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}`}
          alt={user?.name ? `${user.name}'s avatar` : 'User avatar'}
        />
      </div>
    </header>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectUser(),
  token: selectToken()
});

const mapDispatchToProps = (dispatch: any) => ({
  getLoggedUser: () => dispatch(getLoggedUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
