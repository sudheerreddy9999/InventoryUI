import React, { useState, useEffect } from "react";
import { ClockIcon,EyeIcon,ShoppingBagIcon  } from "@heroicons/react/outline";
import TableComponent from "./TableComponnet";
import { useLocation } from "react-router-dom"; 

function ProductDetails() {
  const [productData, setProductData] = useState({
    name: "Polo T-Shirt",
    dateAdded: "12 Sept 2022 - 12:55 pm",
    productURL: "linancystores.com/polo-t-shirt",
    lastOrder: "12 Sept 2022",
    price: "₦25,000.00",
    inStock: 20,
    totalOrders: "₦50,000.00",
    views: 1200,
    favourites: 23,
    orders: [
      {
        orderDate: "12 Aug 2022 - 12:25 am",
        orderType: "Home Delivery",
        unitPrice: "₦25,000.00",
        qty: 2,
        discount: "₦0.00",
        orderTotal: "₦50,000.00",
        status: "Completed",
      },
      // ... other orders
    ],
  });
  const location = useLocation();
  const productInfo = location.state?.product;
  console.log(productInfo)
  useEffect(() => {
    // Fetch product data from an API or database here
    // setProductData(fetchedData);
  }, []);

  return (
    <div className="bg-gray-100  p-4 rounded-lg shadow">
      {/* Product Header */}
      <div className="flex justify-between items-center mx-6">
        <div className="flex space-x-8 justify-center items-center">
        <h2 className="text-medium font-semibold">{productInfo.product_name}</h2>
        <p className="text-sm">
          <span className="text-medium font-semibold">Date Added :</span>{" "}
          Thursday, 7 November 2024
        </p>
        <p className="text-sm">
          <span className="text-medium font-semibold">product url :</span>
          https://www.figma.com/design{" "}
        </p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-black text-white text-xs  py-2 px-4 rounded-lg ">
            Edit Product
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-xs">
            Unpublish Product
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex gap-6 mt-8 mx-8  w-full">
  <div className="bg-white rounded-xl h-36 w-1/12 flex items-center justify-center">
    <img
      className="w-24 h-24"
      src={`data:image/png;base64,${productInfo.image_data}`}
    />
  </div>
  
  <div className="bg-white rounded-xl h-36 w-4/12 flex flex-col justify-between">
    <div className="flex justify-between p-3">
      <p className="text-sm">
        <span className="font-semibold">Last Order:</span> Thursday, 7 November 2024
      </p>
      <p className="text-xs bg-green-100 p-1 px-3 rounded-md h-6 text-green-700">
        Published
      </p>
    </div>
    <div className="flex space-x-8 p-3">
      <div>
        <p className="text-xs text-gray-500">Price</p>
        <p className="text-sm ml-6 p-1">₹2,500,000</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">In Stock</p>
        <p className="text-sm ml-3 p-1">2,500,000</p>
      </div>
    </div>
  </div>

  <div className="bg-white rounded-xl h-36 w-3/12 flex flex-col justify-between">
    <div className="flex items-center justify-between p-3">
      <ClockIcon className="text-blue-800 bg-blue-50 p-1 w-7 h-7 rounded-md" />
      <select className="text-xs rounded-md h-6 w-24 text-gray-700 px-3 border-none">
        <option>All Time</option>
        <option>One Month</option>
      </select>
    </div>
    <div className="flex space-x-10 p-3">
      <div>
        <p className="text-sm">Total Records</p>
        <p className="text-medium p-1 font-semibold">$2500000</p>
      </div>
    </div>
  </div>

  <div className="bg-white rounded-xl h-36 w-3/12 flex flex-col justify-between">
    <div className="flex items-center justify-between p-3">
      <EyeIcon className="text-gray-800 bg-yellow-50 p-1 w-7 h-7 rounded-md" />
      <select className="text-xs rounded-md h-6 w-24 text-gray-700 px-3 border-none">
        <option>All Time</option>
        <option>One Month</option>
      </select>
    </div>
    <div className="flex space-x-10 p-3">
      <div>
        <p className="text-sm">Views</p>
        <p className="text-medium p-1 font-semibold">1,200</p>
      </div>
      <div>
        <p className="text-sm">Favourite</p>
        <p className="text-medium font-semibold p-1">23</p>
      </div>
    </div>
  </div>
</div>
<div className="flex space-x-8 w-[97%] mt-4 mx-8">
<div className="bg-white rounded-xl h-36 w-1/2 flex flex-col justify-between">
    <div className="flex items-center justify-between p-3">
      <ShoppingBagIcon className="text-gray-800 bg-yellow-50 p-1 w-7 h-7 rounded-md" />
      <select className="text-xs rounded-md h-6 w-24 text-gray-700 px-3 border-none">
        <option>All Time</option>
        <option>One Month</option>
      </select>
    </div>
    <div className="flex space-x-40 p-3 justify-stretch items-center">
      <div>
        <p className="text-sm">All Orders</p>
        <p className="text-medium p-1 font-semibold">1</p>
      </div>
      <div>
        <p className="text-sm">Pending</p>
        <p className="text-medium font-semibold p-1">5</p>
      </div>
      <div>
        <p className="text-sm">Completed</p>
        <p className="text-medium font-semibold p-1">3</p>
      </div>
    </div>
  </div>
  <div className="bg-white rounded-xl h-36 w-1/2 flex flex-col justify-between">
    <div className="flex items-center justify-between p-3">
      <ShoppingBagIcon className="text-gray-800 bg-yellow-50 p-1 w-7 h-7 rounded-md" />
      <select className="text-xs rounded-md h-6 w-24 text-gray-700 px-3 border-none">
        <option>All Time</option>
        <option>One Month</option>
      </select>
    </div>
    <div className="flex space-x-40 p-3 justify-stretch items-center">
      <div>
        <p className="text-sm">canceled</p>
        <p className="text-medium p-1 font-semibold">0</p>
      </div>
      <div>
        <p className="text-sm">Returned</p>
        <p className="text-medium font-semibold p-1">3</p>
      </div>
      <div>
        <p className="text-sm">Damange</p>
        <p className="text-medium font-semibold p-1">2</p>
      </div>
    </div>
  </div>  
</div>
    </div>
  );
}

export default ProductDetails;
