import React from 'react'

type Props = {
  generateCSV: () => void;
}

const SearchAndFilter = (props: Props) => {
  const { generateCSV } = props;
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
      <div className="flex gap-2 flex-wrap">
        <select className="border p-2 rounded">
          <option>Last 7 Days</option>
        </select>
        <select className="border p-2 rounded">
          <option>All Campaigns</option>
        </select>
        <select className="border p-2 rounded">
          <option>Date (Newest)</option>
        </select>
      </div>
      <button onClick={generateCSV} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
        Export CSV
      </button>
    </div>
  )
}

export default SearchAndFilter