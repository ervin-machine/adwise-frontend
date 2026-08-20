import React from 'react'
import { Select } from '@/components/Input'
import Button from '@/components/Button'

type Props = {
  generateCSV: () => void;
  generatePDF: () => void;
}

const SearchAndFilter = (props: Props) => {
  const { generateCSV, generatePDF } = props;
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
      <div className="flex gap-2">
        <Button variant="secondary" onClick={generateCSV}>
          Export CSV
        </Button>
        <Button variant="secondary" onClick={generatePDF}>
          Export PDF
        </Button>
      </div>
    </div>
  )
}

export default SearchAndFilter
