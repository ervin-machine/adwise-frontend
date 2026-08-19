import React from 'react'
import { Input, Select } from '@/components/Input'

type Props = {
  search: string
  onSearchChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
}

const SearchAndFilter = ({ search, onSearchChange, status, onStatusChange }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
      <Input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search campaigns..."
        aria-label="Search campaigns"
        className="sm:w-64"
      />
      <Select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        aria-label="Filter by status"
        className="sm:w-48"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="ended">Ended</option>
      </Select>
    </div>
  )
}

export default SearchAndFilter
