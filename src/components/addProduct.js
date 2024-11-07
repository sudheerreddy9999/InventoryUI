import React, { useState, useEffect } from "react";
import axios from "axios";
import { CalendarIcon, ClockIcon, CameraIcon } from "@heroicons/react/outline";

const AddProduct = ({ editProduct, heading, buttonText }) => {
  const [formValues, setFormValues] = useState({
    productName: "pens",
    productCategory: "Stationary",
    sellingPrice: "32",
    costPrice: "23",
    quantity: "98",
    orderType: "",
    discount: "10",
    expiryDate: "12-30-2026",
    shortDescription: "Hello I am from the data",
    longDescription: "please our product",
    returnPolicy: "122",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [thumbnailImage1, setThumbnailImage1] = useState(null);
  const [thumbnailImage2, setThumbnailImage2] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [thumbnailImage1Preview, setThumbnailImage1Preview] = useState(null);
  const [thumbnailImage2Preview, setThumbnailImage2Preview] = useState(null);

  const [isDiscount, setIsDiscount] = useState(false);
  const [isExpiryDate, setIsExpiryDate] = useState(false);
  const [isReturnPolicy, setIsReturnPolicy] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", formValues.productName);
    formData.append("productCategory", formValues.productCategory);
    formData.append("sellingPrice", formValues.sellingPrice);
    formData.append("costPrice", formValues.costPrice);
    formData.append("quantityInStock", formValues.quantity);
    formData.append("orderType", formValues.orderType);
    formData.append("discountValue", formValues.discount);
    formData.append("discountType", "Percentage");
    formData.append("expiryDate", formValues.expiryDate);
    formData.append("shortDescription", formValues.shortDescription);
    formData.append("longDescription", formValues.longDescription);
    formData.append("returnPolicyTime", formValues.returnPolicy);

    if (coverImage) formData.append("coverImage", coverImage);
    if (thumbnailImage1) formData.append("additionalImages", thumbnailImage1);
    if (thumbnailImage2) formData.append("additionalImages", thumbnailImage2);

    try {
      const response = await axios.post(
        "https://inventoryapi-lme6.onrender.com/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  const handleFileChange = (e, setImage, ImageType) => {
    const file = e.target.files[0];
    if (file) {
      // Read the file as a base64 string for preview purposes
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the base64 string for preview
        const base64Image = reader.result;
        if (ImageType === 'CoverImage') {
          setCoverImage(file); // Store the file object (for later usage)
          setCoverImagePreview(base64Image); // Store the base64 string for preview
        }
        if (ImageType === 'Thumbnail1') {
          setThumbnailImage1(file); // Store the file object
          setThumbnailImage1Preview(base64Image); // Store the base64 string for preview
        }
        if (ImageType === 'Thumbnail2') {
          setThumbnailImage2(file); // Store the file object
          setThumbnailImage2Preview(base64Image); // Store the base64 string for preview
        }
      };
      reader.readAsDataURL(file); // Read the file as base64
    }
  };
  
  useEffect(() => {
    console.log(editProduct,"userEffect Value is ");
    if (editProduct) {
      setCoverImagePreview("data:image/png;base64," + editProduct.data.imagedata[0].image_data);
      setThumbnailImage1Preview("data:image/png;base64," + editProduct.data.imagedata[1].image_data);
      setThumbnailImage2Preview("data:image/png;base64," + editProduct.data.imagedata[2].image_data);
      setFormValues({
        productName: editProduct.data.product_name || "",
        productCategory: editProduct.data.product_category || "",
        sellingPrice: editProduct.data.cost_price || "",
        costPrice: editProduct.data.costPrice || "",
        quantityInStock: editProduct.data.quantity || "",
        orderType: editProduct.data.orderType || "",
        discountValue: editProduct.data.discount_value || "",
        discountType: "Percentage",
        expiryDate: editProduct.data.expiry_date || "",
        shortDescription: editProduct.data.short_description|| "",
        longDescription: editProduct.data.long_description || "",
        returnPolicyTime: editProduct.data.return_policy_time || "",
        coverImage: coverImage || null,
        additionalImages: thumbnailImage1 || null,
        additionalImages: thumbnailImage2 || null,
      });
    } else {
      setFormValues({
        productName: "",
        productCategory: "",
        sellingPrice: "",
        costPrice: "",
        quantityInStock: "",
        orderType: "",
        discountValue: "",
        discountType: "Percentage",
        expiryDate: "",
        shortDescription: "",
        longDescription: "",
        returnPolicyTime: "",
        coverImage: null,
        additionalImages: null,
        additionalImages: null,
      });
    }
  }, [editProduct]);

  return (
    <div className="mx-10  shadow-lg pb-20 pt-4">
      <div className="flex justify-between mx-6 mb-10">
        <div>
          <p className=" font-medium">{heading}</p>
        </div>
        <div className="space-x-3">
          <button className="p-2 px-4 bg-gray-800 text-sm text-white rounded-full">
            Save As Draft
          </button>
          <button
            className="p-2 px-4 bg-blue-600 text-sm text-white rounded-full"
            onClick={handleFormSubmit}
          >
            {buttonText}
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
                  value={formValues.discountValue}
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
                  type="date"
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
              <input
              type="text"
                name="returnPolicy"
                value={formValues.returnPolicyTime}
                onChange={handleInputChange}
                className="mt-1 block w-full px-2 py-3 bg-slate-50 border rounded-lg focus:outline-none focus:border-blue-500"
                rows="4"
                placeholder="Enter return policy"
              ></input>
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
<div className="border border-dashed bg-slate-50 border-gray-400 h-52 flex flex-col items-center justify-center p-6 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
  <CameraIcon className="w-40 h-40 text-gray-400" />
  {coverImagePreview && (
    <img
      src={coverImagePreview}
      alt="Cover Preview"
      className="mt-4 w-40 h-40 object-cover rounded-lg border border-gray-300 shadow-lg"
    />
  )}
  <span className="text-sm text-gray-600 mt-2">
    Upload a cover image for your product. Recommended size 600x600 (1:1)
  </span>

  {/* Display cover image preview */}

  <label className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300">
    Upload Image
    <input
      type="file"
      className="hidden"
      onChange={(e) => handleFileChange(e, setCoverImage, "CoverImage")}
    />
  </label>
</div>

{/* Thumbnail Upload Section */}
<div className="flex gap-4 justify-start mt-4">
  <div className="border border-dashed bg-slate-50 border-gray-400 flex flex-col items-center justify-center p-4 rounded-lg w-40 h-32 hover:shadow-lg transition duration-300 ease-in-out">
    <CameraIcon className="w-8 h-8 text-gray-400" />
    {thumbnailImage1Preview && (
      <img
        src={thumbnailImage1Preview}
        alt="Thumbnail Preview 1"
        className="mt-3 w-28 h-28 object-cover rounded-lg border border-gray-300 shadow-md"
      />
    )}
    <label className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 mt-2">
      Upload
      <input
        type="file"
        className="hidden"
        onChange={(e) => handleFileChange(e, setThumbnailImage1, "Thumbnail1")}
      />
    </label>
    
    {/* Display thumbnail image preview */}
  </div>

  <div className="border border-dashed bg-slate-50 border-gray-400 flex flex-col items-center justify-center p-4 rounded-lg w-40 h-32 hover:shadow-lg transition duration-300 ease-in-out">
    <CameraIcon className="w-8 h-8 text-gray-400" />
    {thumbnailImage2Preview && (
      <img
        src={thumbnailImage2Preview}
        alt="Thumbnail Preview 2"
        className="mt-3 w-28 h-28 object-cover rounded-lg border border-gray-300 shadow-md"
      />
    )}
    <label className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 mt-2">
      Upload
      <input
        type="file"
        className="hidden"
        onChange={(e) => handleFileChange(e, setThumbnailImage2, "Thumbnail2")}
      />
    </label>

    {/* Display thumbnail image preview */}
  </div>
</div>


        </div>
      </div>
    </div>
  );
};

export default AddProduct;
