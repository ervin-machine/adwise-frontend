"use client";

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser, selectToken } from '@/features/Account/store/selectors';
import { getLoggedUser } from '@/features/Account/store/actions';

type Props = {
  user: any,
  token: any,
  getLoggedUser: () => void
}

const Header = (props: Props) => {
  const { user, token, getLoggedUser } = props

  useEffect(() => {
    getLoggedUser()
  }, [])

  return (
    token && <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
    <h1 className="text-lg font-semibold">AdWise Manager</h1>
    <div className="flex items-center gap-4">
      <button className="relative">
        <span className="sr-only">Notifications</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="..." />
        </svg>
      </button>
      <img
        className="w-8 h-8 rounded-full"
        src={`https://ui-avatars.com/api/?name=${user?.name}`}
        alt="User avatar"
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