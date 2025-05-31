'use client';
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link'
import CampaignModal from '@/features/Campaigns/components/CreateCampaign/components/CampaignModal'
import { getLoggedUser } from '@/features/Account/store/actions';
import { selectToken, selectUser } from '@/features/Account/store/selectors';

type Props = {
  token: any,
  user: any,
  getLoggedUser: () => void
}

const LeftSidebar = (props: Props) => {
  const { token, user, getLoggedUser } = props;
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false)

  const handleOpenModal = () => setIsCampaignModalOpen(true)
  const handleCloseModal = () => setIsCampaignModalOpen(false)

  useEffect(() => {
    getLoggedUser()
  }, [])

  return (
    token && <aside className="w-64 bg-gray-100 h-screen p-6">
    <nav className="flex flex-col gap-4 text-gray-700">
      {['Dashboard', 'Campaigns', 'Reports', 'Account'].map((item) => (
        <Link key={item} href={`/${item.toLocaleLowerCase()}`}>
          <button className="text-left hover:text-blue-600 transition-colors">
            {item}
          </button>
        </Link>
      ))}
    </nav>
    <button onClick={handleOpenModal} className="mt-10 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
      + New Campaign
    </button>
    <CampaignModal userId={user?._id} isOpen={isCampaignModalOpen} onClose={handleCloseModal} isEdit={false} defaultValues={undefined} />
  </aside>
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