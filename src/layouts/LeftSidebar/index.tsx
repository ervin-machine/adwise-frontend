'use client';
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link'
import CampaignModal from '@/features/Campaigns/components/CreateCampaign/components/CampaignModal'
import Button from '@/components/Button'
import { getLoggedUser } from '@/features/Account/store/actions';
import { selectToken, selectUser } from '@/features/Account/store/selectors';

type Props = {
  token: any,
  user: any,
  getLoggedUser: () => void,
  isOpen?: boolean,
  onClose?: () => void,
}

const NAV_ITEMS = ['Dashboard', 'Campaigns', 'Reports', 'Account'];

const LeftSidebar = (props: Props) => {
  const { token, user, getLoggedUser, isOpen = false, onClose = () => {} } = props;
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false)
  const [pathname, setPathname] = useState('');

  const handleOpenModal = () => setIsCampaignModalOpen(true)
  const handleCloseModal = () => setIsCampaignModalOpen(false)

  useEffect(() => {
    getLoggedUser()
  }, [])

  useEffect(() => {
    // This component is mounted once in the app shell and never remounts on
    // navigation, so its pathname has to be tracked reactively rather than
    // read once. It's also shared between the App Router and Pages Router
    // trees, which rules out router-specific hooks like usePathname() (App
    // Router only) or next/router's events (Pages Router only) - patching
    // history.pushState/replaceState catches navigation from either router,
    // plus Link clicks and programmatic router.push() calls, in one place.
    const updatePathname = () => setPathname(window.location.pathname);
    updatePathname();

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      updatePathname();
    };
    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      updatePathname();
    };

    window.addEventListener('popstate', updatePathname);

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', updatePathname);
    };
  }, []);

  if (!token) return null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 p-6 flex flex-col transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:z-auto md:min-h-screen`}
      >
        <div className="flex items-center gap-2 mb-8">
          <svg className="h-8 w-8 flex-shrink-0" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#4740D1" />
            <rect x="8" y="18" width="4" height="7" rx="1.5" fill="#FFFFFF" />
            <rect x="14" y="13" width="4" height="12" rx="1.5" fill="#FFFFFF" />
            <rect x="20" y="7" width="4" height="18" rx="1.5" fill="#FFFFFF" fillOpacity="0.85" />
          </svg>
          <span className="text-lg font-semibold text-slate-900">AdWise</span>
        </div>

        <nav className="flex flex-col gap-1 text-sm">
          {NAV_ITEMS.map((item) => {
            const href = `/${item.toLowerCase()}`;
            const isActive = pathname === href;
            return (
              <Link
                key={item}
                href={href}
                onClick={onClose}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item}
              </Link>
            );
          })}
        </nav>

        <Button onClick={handleOpenModal} className="mt-8 w-full">
          + New Campaign
        </Button>

        <CampaignModal userId={user?._id} isOpen={isCampaignModalOpen} onClose={handleCloseModal} isEdit={false} defaultValues={undefined} />
      </aside>
    </>
  )
}


const mapStateToProps = createStructuredSelector({
  token: selectToken(),
  user: selectUser()
});

const mapDispatchToProps = (dispatch: any) => ({
  getLoggedUser: () => dispatch(getLoggedUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);
