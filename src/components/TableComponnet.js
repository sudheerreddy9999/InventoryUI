import React, { useState } from "react";
import { SearchIcon, FilterIcon, CalendarIcon } from "@heroicons/react/outline";

const TableComponent = ({ columns, data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const categories = [...new Set(data.map((item) => item.product_category))];

  const filteredData = data.filter((row) => {
    const matchesSearchTerm =
      row.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.product_category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategoryFilter = !selectedCategory || row.product_category === selectedCategory;

    const matchesDateFilter =
      (!fromDate && !toDate) ||
      (fromDate && toDate
        ? new Date(row.date) >= new Date(fromDate) && new Date(row.date) <= new Date(toDate)
        : (fromDate && new Date(row.date) >= new Date(fromDate)) ||
          (toDate && new Date(row.date) <= new Date(toDate)));

    return matchesSearchTerm && matchesCategoryFilter && matchesDateFilter;
  });

  const openDateModal = () => {
    setIsDateModalOpen(true);
  };

  const closeDateModal = () => {
    setIsDateModalOpen(false);
  };

  const applyDateFilter = () => {
    setIsDateModalOpen(false);
  };

  return (
    <div className="shadow-md rounded-lg bg-slate-50 mx-8 pb-6">
      <div className="flex justify-between mb-4 mt-3 pt-4 px-4">
        <div><p className="font-semibold text-lg">Inventory Items</p></div>
        <div className="flex space-x-5">
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              className="border pl-8 pr-2 py-1 rounded-md"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <button
              className="flex items-center border px-3 py-1 rounded-md space-x-2 hover:bg-gray-100"
              onClick={openDateModal}
            >
              <CalendarIcon className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">Date</span>
            </button>
          </div>
          <div className="relative">
            <FilterIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <select
              className="border px-2 py-1 pl-6 rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isDateModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-72">
            <h3 className="text-lg font-semibold mb-2">Select Date Range</h3>
            <div className="mb-2">
              <label className="block text-sm">From Date</label>
              <input
                type="date"
                className="border px-2 py-1 rounded-md w-full text-sm"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm">To Date</label>
              <input
                type="date"
                className="border px-2 py-1 rounded-md w-full text-sm"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="flex justify-between space-x-4">
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded-md text-sm"
                onClick={closeDateModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                onClick={applyDateFilter}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <table className="table-auto w-[96%] border-collapse mx-6 my-3">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="border px-4 py-2 w-44 items-center">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column) => (
                    <td key={column.key} className="border px-4 py-2">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
