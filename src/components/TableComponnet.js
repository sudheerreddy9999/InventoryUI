import React, { useState } from "react";
import {
  SearchIcon,
  FilterIcon,
  CalendarIcon,
  ClipboardCheckIcon,
} from "@heroicons/react/outline";

const TableComponent = ({ columns, data, onSelectedProductsChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = [...new Set(data.map((item) => item.product_category))];

  const filteredData = data.filter((row) => {
    const matchesSearchTerm =
      row.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.product_category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategoryFilter =
      !selectedCategory || row.product_category === selectedCategory;

    const matchesDateFilter =
      (!fromDate && !toDate) ||
      (fromDate && !toDate && new Date(row.date) >= new Date(fromDate)) ||
      (!fromDate && toDate && new Date(row.date) <= new Date(toDate)) ||
      (fromDate &&
        toDate &&
        new Date(row.date) >= new Date(fromDate) &&
        new Date(row.date) <= new Date(toDate));
    return matchesSearchTerm && matchesCategoryFilter && matchesDateFilter;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowSelection = (productId) => {
    console.log(productId,"Product Id Value is ")
    const newSelectedRows = selectedRows.includes(productId)
      ? selectedRows.filter((id) => id !== productId)
      : [...selectedRows, productId];

    setSelectedRows(newSelectedRows);
  };

  const handleCancel = () => {
    setOpenConfirmDelete(false);
  };
  const handleConfirm = () => {
    setOpenConfirmDelete(false);
    return onSelectedProductsChange && onSelectedProductsChange(selectedRows);
  };
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const allIds = currentData.map((item) => item.product_id);
      setSelectedRows(allIds);
    }
    setSelectAll(!selectAll);
    // onSelectedProductsChange &&
    //   onSelectedProductsChange(
    //     selectAll ? [] : currentData.map((item) => item.product_id)
    //   );
  };

  const openDateModal = () => setIsDateModalOpen(true);
  const closeDateModal = () => setIsDateModalOpen(false);
  const applyDateFilter = () => setIsDateModalOpen(false);

  const handleButtonClick = () => {
    setOpenConfirmDelete(true);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectAll(false); // Uncheck "select all" when changing pages
    }
  };

  return (
    <div className="shadow-md rounded-lg bg-slate-50 mx-8 pb-6">
      <div className="flex justify-between mb-4 mt-3 pt-4 px-4">
        <div>
          <p className="font-semibold text-lg">Inventory Items</p>
        </div>
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
          <button
            className="flex items-center border px-3 py-1 rounded-md space-x-2 hover:bg-gray-100"
            onClick={openDateModal}
          >
            <CalendarIcon className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600">Date</span>
          </button>
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
          <button
            className="flex items-center space-x-2 font-semibold py-1 px-4 rounded-md ml-6  transition duration-200 ease-in-out shadow-md"
            onClick={handleButtonClick}
          >
            <ClipboardCheckIcon className="h-5 w-5" />
            <span>Bulk</span>
          </button>
        </div>
      </div>

      {isDateModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-72">
            <h3 className="text-lg font-semibold mb-2">Select Date Range</h3>
            <input
              type="date"
              className="border px-2 py-1 rounded-md w-full text-sm mb-2"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <input
              type="date"
              className="border px-2 py-1 rounded-md w-full text-sm mb-2"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
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

      <table className="table-auto w-[99%] mx-4 my-2 border border-gray-300 shadow-sm rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-sm font-semibold text-gray-700">
            <th className="border border-gray-300 px-2 py-1">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            {columns.map((column, index) => (
              <th key={index} className="border border-gray-300 px-3 py-1">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 text-sm`}
            >
              <td className="border border-gray-300 px-2 py-1 text-center">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.product_id)}
                  onChange={() => handleRowSelection(row.product_id)}
                />
              </td>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="border border-gray-300 px-3 py-1"
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mr-10 mt-4 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-xs bg-gray-400 rounded"
        >
          Previous
        </button>
        <span className="text-sm p-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-xs bg-gray-400 rounded"
        >
          Next
        </button>
      </div>
      {openConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-950 relative rounded-lg shadow-2xl w-full max-w-[290px] h-[180px] mx-4 md:mx-0 p-6 space-y-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center z-10">
              <p className="text-center text-gray-800 dark:text-gray-100 font-semibold mb-4">
                Are you sure you want to bulk delete?
              </p>
            </div>
            <div className="relative z-20 flex space-x-4">
              <button
                onClick={handleCancel} // Define this function to close the modal
                className="bg-gray-800  mx-4  py-2 text-sm text-white px-6 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm} // Define this function to confirm deletion
                className="bg-red-600 text-white text-sm  py-2 px-6 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
