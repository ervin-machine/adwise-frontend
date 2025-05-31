import React from 'react'
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { store } from '@/store/configureStore';
import LeftSidebar from '@/layouts/LeftSidebar';
import Header from '@/layouts/Header';
import "../app/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="flex">
          <LeftSidebar />
          <div className="flex-1 bg-gray-50 min-h-screen p-6">
            <Header />
            <div className='mt-4'>
            <Component {...pageProps} />
            </div>
      
      </div>
      </div>
    </Provider>
  );
}

export default MyApp;
