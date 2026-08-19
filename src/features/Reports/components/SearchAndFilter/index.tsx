import React from 'react'
import { Select } from '@/components/Input'
import Button from '@/components/Button'

type Props = {
  generateCSV: () => void;
}

const SearchAndFilter = (props: Props) => {
  const { generateCSV } = props;
  return (
    <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
      <div className="flex gap-3 flex-wrap">
        <Select aria-label="Date range" defaultValue="last7">
          <option value="last7">Last 7 Days</option>
        </Select>
        <Select aria-label="Campaign" defaultValue="all">
          <option value="all">All Campaigns</option>
        </Select>
        <Select aria-label="Sort" defaultValue="newest">
          <option value="newest">Date (Newest)</option>
        </Select>
      </div>
      <Button variant="secondary" onClick={generateCSV}>
        Export CSV
      </Button>
    </div>
  )
}

export default SearchAndFilter
