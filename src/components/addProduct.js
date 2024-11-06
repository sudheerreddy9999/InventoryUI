import React, { useState } from "react";
import { CalendarIcon, ClockIcon, CameraIcon } from "@heroicons/react/outline";

const AddProduct = () => {
  const [formValues, setFormValues] = useState({
    productName: "",
    productCategory: "",
    sellingPrice: "",
    costPrice: "",
    quantity: "",
    orderType: "",
    discount: "",
    expiryDate: "",
    shortDescription: "",
    longDescription: "",
    returnPolicy: "",
  });
  const [isDiscount, setIsDiscount] = useState(false);
  const [isExpiryDate, setIsExpiryDate] = useState(false);
  const [isReturnPolicy,setIsReturnPolicy] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleFormClick = (e)=>{
    console.log(formValues,"Form Values are ")
  }

  return (
    <div className="mx-10  shadow-lg pb-20 pt-4">
      <div className="flex justify-between mx-6 mb-10">
        <div>
          <p className=" font-medium">New Inventory Item</p>
        </div>
        <div className="space-x-3">
          <button className="p-2 px-4 bg-gray-800 text-sm text-white rounded-full">
            Save As Draft
          </button>
          <button className="p-2 px-4 bg-blue-600 text-sm text-white rounded-full" onClick={handleFormClick}>
            Save & Publish
          </button>
        </div>
      </div>
      <div className="flex gap-24 p-4 text-sm mx-10">
        {/* Left Section */}
        <div className="flex-1 flex flex-col gap-3  w-28">
          <label className="block">
            <input
              type="text"
              name="productName"
              value={formValues.productName}
              onChange={handleInputChange}
              className="mt-1 block w-11/12 px-2 py-3 bg-slate-50  border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter product name"
            />
          </label>

          <label className="block">
            <select
              name="productCategory"
              value={formValues.productCategory}
              onChange={handleInputChange}
              className="mt-1 block w-11/12 px-2 py-3 bg-slate-50 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Product Category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
            </select>
          </label>

          <div className="flex gap-3">
            <label className="flex-1 block">
              <input
                type="text"
                name="sellingPrice"
                value={formValues.sellingPrice}
                onChange={handleInputChange}
                className="mt-1 block w-11/12 px-2 py-3 bg-slate-50 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter selling price"
              />
            </label>

            <label className="flex-1 block">
              <input
                type="text"
                name="costPrice"
                value={formValues.costPrice}
                onChange={handleInputChange}
                className="mt-1 block w-10/12 px-2 py-3 border bg-slate-50 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter cost price"
              />
            </label>
          </div>

          <label className="block">
            <input
              type="number"
              name="quantity"
              value={formValues.quantity}
              onChange={handleInputChange}
              className="mt-1 block w-11/12 px-2 py-3 border bg-slate-50 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter quantity in stock"
            />
          </label>

          <label className="block">
            <select
              name="orderType"
              value={formValues.orderType}
              onChange={handleInputChange}
              className="mt-1 block w-11/12 px-2 py-3 border bg-slate-50 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Order Type</option>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
            </select>
          </label>
          <div>
            {/* Discount Toggle */}
            <div className="flex items-center justify-between gap-2 w-11/12">
              <p>Discount</p>
              {isDiscount && (
                <input
                  type="text"
                  name="discount"
                  value={formValues.discount}
                  onChange={handleInputChange}
                  placeholder="Discount"
                  className="px-2 py-1 border rounded-lg bg-slate-50 focus:outline-none focus:border-blue-500"
                />
              )}
              <div
                onClick={() => {
                  setIsDiscount(!isDiscount);
                  if (isDiscount) {
                    setFormValues({ ...formValues, discount: "" });
                  }
                }}
                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                  isDiscount ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    isDiscount ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
            </div>

            {/* Expiry Date Toggle */}
            <div className="flex items-center justify-between gap-2 mt-4 w-11/12">
              <p>Expiry Date</p>

              {/* Conditionally render the input field based on isExpiryDate */}
              {isExpiryDate && (
                <input
                  type="text"
                  name="expiryDate"
                  value={formValues.expiryDate}
                  onChange={handleInputChange}
                  placeholder="Expiry Date"
                  className="px-2 py-1 border rounded-lg bg-slate-50 focus:outline-none focus:border-blue-500"
                />
              )}

              <div
                onClick={() => {
                  setIsExpiryDate(!isExpiryDate);
                  if (isExpiryDate) {
                    setFormValues({ ...formValues, expiryDate: "" });
                  }
                }}
                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                  isExpiryDate ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    isExpiryDate ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex-1 flex flex-col gap-3">
          <label className="block">
            <textarea
              name="shortDescription"
              value={formValues.shortDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full px-2 py-3 border rounded-lg bg-slate-50 focus:outline-none focus:border-blue-500"
              rows="2"
              placeholder="Enter a short description"
            ></textarea>
          </label>

          <label className="block">
            <textarea
              name="longDescription"
              value={formValues.longDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full px-2 py-3 border rounded-lg bg-slate-50 focus:outline-none focus:border-blue-500"
              rows="4"
              placeholder="Enter a long description"
            ></textarea>
          </label>
          <div className="flex flex-col items-start gap-2 mt-4">
            <div className="flex justify-between w-full">
              <p>Return Policy</p>
              <div
                onClick={() => {
                    setIsReturnPolicy(!isReturnPolicy);
                  if (isReturnPolicy) {
                    setFormValues({ ...formValues, returnPolicy: "" });
                  }
                }}
                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                    isReturnPolicy ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    isReturnPolicy ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
            </div>
            {/* Conditionally render the textarea based on isExpiryDate */}
            {isReturnPolicy && (
              <textarea
                name="returnPolicy"
                value={formValues.returnPolicy}
                onChange={handleInputChange}
                className="mt-1 block w-full px-2 py-3 bg-slate-50 border rounded-lg focus:outline-none focus:border-blue-500"
                rows="4"
                placeholder="Enter return policy"
              ></textarea>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <CalendarIcon className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              value="12/12/2020"
              className="px-2 py-1 border rounded-lg bg-slate-50 focus:outline-none focus:border-blue-500"
              disabled
            />
            <ClockIcon className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              value="12:00 PM"
              className="px-2 py-1 border rounded-lg bg-slate-50 focus:outline-none focus:border-blue-500"
              disabled
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-[0.7] flex flex-col gap-5">
          {/* Cover Image Upload Section */}
          <div className="border border-dashed bg-slate-50 border-gray-400 h-44 flex flex-col items-center justify-center p-6 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
            <CameraIcon className="w-36  h-36" />
            <label className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300">
              Upload Image
              <input type="file" className="hidden" />
            </label>
            <span className="text-sm text-gray-600">
              Upload a cover image for your product. Recommended size 600x600
              (1:1)
            </span>
          </div>

          {/* Thumbnail Upload Section */}
          <div className="flex gap-4 justify-start">
            <div className="border border-dashed bg-slate-50 border-gray-400 flex flex-col items-center justify-center p-6 rounded-lg w-36 h-28 hover:shadow-lg transition duration-300 ease-in-out">
              <CameraIcon />
              <label className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300">
                Upload
                <input type="file" className="hidden" />
              </label>
            </div>
            <div className="border border-dashed bg-slate-50 border-gray-400 flex flex-col items-center justify-center p-6 rounded-lg w-36 h-28 hover:shadow-lg transition duration-300 ease-in-out">
              <CameraIcon />
              <label className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300">
                Upload
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
