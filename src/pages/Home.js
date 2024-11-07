import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import TableComponent from "../components/TableComponnet";
import SelectComponent from "../components/selectComponent";
import ProductsInfo from "../components/ProductsInfo";
import Loader from "../components/loader";

function Home() {
  const [data, setData] = useState([]);
  const [ennableLoader,setEnableLoader] = useState(true);
  const [tabSelected,setTabSelected] = useState("allProducts");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [lowStockItems,setLowStockItem] = useState([]);
  const navigate = useNavigate(); 

  const handleAction = async (selectedOption, row) => {
    setEnableLoader(true);
    
    try {
      const response = await axios.get("https://inventoryapi-lme6.onrender.com/products/id", {
        headers: {
          "product_id": row.product_id
        }
      });
      
      const productData = response.data; // This will be the product data you want to pass
  
      setEnableLoader(false);
  
      // Now pass only the necessary data (e.g., product details)
      if (selectedOption.value === "edit" && productData) {
        navigate("/inventory", { state: { editProduct: productData } });
      }
  
      if (selectedOption.value === "view" && productData) {
        navigate("/view-product", { state: { product: productData } });
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      setEnableLoader(false);
    }
  };
  
  

  const columns = [
    {
      key: "image_data",
      label: "Image",
      render: (row) => (
        row.image_data ? (
          <img
            src={`data:image/jpeg;base64,${row.image_data}`}
            alt="Product"
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
          />
        ) : (
          <span>No Image</span>
        )
      ),
    },
    { key: "product_name", label: "Product Name" },
    { key: "product_category", label: "Category" },
    { key: "cost_price", label: "Unit Price" },
    { key: "discount_value", label: "Discount Value" },
    {key:"quantity_in_stock",label:"In-Stock"},
    {
      key: "Action",
      label: "Action",
      render: (row) => (
        <SelectComponent
          options={[
            { value: "edit", label: "Edit" },
            { value: "delete", label: "Delete" },
            { value: "view", label: "View" },
          ]}
          minHeight="35px"
          fontSize="14px"
          width="160px"
          onChange={(selectedOption) => handleAction(selectedOption, row)}
          defaultValue={{ value: "edit", label: "Edit" }}
        />
      ),
    },
    { key: "status", label: "Status" },
  ];
  const handleSelectedProductsChange = (selectedProductIds) => {
    console.log(selectedProductIds)
    setSelectedProducts(selectedProductIds);
  };
  const onCategoryChanged = (item)=>{
      setTabSelected(item);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://inventoryapi-lme6.onrender.com/products");
        const fetchedData = response.data.data;
        setData(fetchedData);
        setEnableLoader(false);
  
        // Filter low stock items after setting the data
        const lowStockItems = fetchedData.filter(item => item.quantity_in_stock <15);
        setLowStockItem(lowStockItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div>
      {ennableLoader?<Loader/>:null}
      <ProductsInfo
      noOfProducts = {data.length}
      activeProducts = {data.length}
      lowStockItems = {lowStockItems.length}
      onCategoryChanged = {onCategoryChanged}
      />
      <TableComponent 
      columns={columns}
      data={tabSelected==="userGroup"?lowStockItems:data} 
      onSelectedProductsChange={handleSelectedProductsChange} />
    </div>
  );
}

export default Home;
