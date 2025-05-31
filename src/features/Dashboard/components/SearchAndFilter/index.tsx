import React from 'react'

type Props = {}

const SearchAndFilter = (props: Props) => {
  return (
    <div className="flex items-center justify-between mb-4">
    <input
      type="text"
      placeholder="Search campaigns..."
      className="border px-3 py-2 rounded w-64"
    />
    <select className="border px-3 py-2 rounded">
      <option value="">All Status</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
  </div>
  )
}

export default SearchAndFilter