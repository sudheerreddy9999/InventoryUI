import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { FolderIcon, UserGroupIcon,PlusIcon } from "@heroicons/react/outline";

const ProductsInfo = (props) => {
  const [selectedItem, setSelectedItem] = useState('allProducts');
  const navigate = useNavigate(); 
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    props.onCategoryChanged(item)
  };
  const handleAddNewProd = ()=>{
    navigate("/inventory");
  }

  return (
    <div>
        <div className="flex justify-between m-4 items-center">
            <div>
                <p className="font-medium text-xl">Inventory summary</p>
            </div>
            <div onClick={handleAddNewProd}>
                <button className="flex bg-blue-600 text-white px-3 py-2 text-sm rounded-md"><PlusIcon className="w-5 h-5 text-white"></PlusIcon>Add new Product</button>
            </div>
        </div>
          <div className="flex w-full px-2 space-x-4">
      <div
        onClick={() => handleSelectItem("allProducts")}
        className={`w-1/2 p-4 px-8 rounded-lg cursor-pointer shadow-md ${
          selectedItem === "allProducts" ? "bg-blue-500" : "bg-gray-100"
        }`}
      >
        <div className="mb-6">
          <FolderIcon className={`w-8 h-8 ${selectedItem === "allProducts" ? "text-white" : "text-black"}`} />
        </div>
        <div className="flex space-x-40">
          <div>
            <p className={`pb-2 ${selectedItem === "allProducts" ? "text-white" : "text-black"}`}>All products</p>
            <p className={`pb-2 ${selectedItem === "allProducts" ? "text-white" : "text-black"}`}>{props.noOfProducts}</p>
          </div>
          <div>
            <p className={`pb-2 ${selectedItem === "allProducts" ? "text-white" : "text-black"}`}>Active products</p>
            <p className={`pb-2 ${selectedItem === "allProducts" ? "text-white" : "text-black"}`}>{props.activeProducts}</p>
          </div>
        </div>
      </div>

      <div
        onClick={() => handleSelectItem("userGroup")}
        className={`w-1/2 p-4 px-8 rounded-lg cursor-pointer shadow-lg ${
          selectedItem === "userGroup" ? "bg-blue-500" : "bg-gray-100"
        }`}
      >
        <div className="mb-6">
          <UserGroupIcon className={`w-8 h-8 ${selectedItem === "userGroup" ? "text-white" : "text-black"}`} />
        </div>
        <div className="flex space-x-40">
          <div>
            <p className={`pb-2 ${selectedItem === "userGroup" ? "text-white" : "text-black"}`}>Low Stock Alert</p>
            <p className={`pb-2 ${selectedItem === "userGroup" ? "text-white" : "text-black"}`}>{props.lowStockItems}</p>
          </div>
          <div>
            <p className={`pb-2 ${selectedItem === "userGroup" ? "text-white" : "text-black"}`}>Expired</p>
            <p className={`pb-2 ${selectedItem === "userGroup" ? "text-white" : "text-black"}`}>3</p>
          </div>
          <div>
            <p className={`pb-2 ${selectedItem === "userGroup" ? "text-white" : "text-black"}`}>1 star Rating</p>
            <p className={`pb-2 ${selectedItem === "userGroup" ? "text-white" : "text-black"}`}>2</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductsInfo;
