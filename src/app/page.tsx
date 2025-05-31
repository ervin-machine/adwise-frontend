"use client"

import Image from "next/image";
import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoginPage from "./login/page";
import DashboardPage from "./dashboard/page";

import { selectToken } from "@/features/Account/store/selectors";
import { getLoggedUser } from "@/features/Account/store/actions";

type Props = {
  token: any,
  getLoggedUser: () => void
}

const Home = (props: Props) => {
  const { token, getLoggedUser } = props;

  useEffect(() => {
    getLoggedUser();
  }, []);

  return token ? <DashboardPage /> : <LoginPage />
}

const mapStateToProps = createStructuredSelector({
  token: selectToken()
});

const mapDispatchToProps = (dispatch: any) => ({
  getLoggedUser: () => dispatch(getLoggedUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
