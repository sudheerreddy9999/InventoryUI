import React from "react";
import TableComponent from "../components/TableComponnet";
import SelectComponent from "../components/selectComponent";
import ProductsInfo from "../components/ProductsInfo";

// Define your columns, including a render function for the 'Action' column
const columns = [
  { key: "product_name", label: "Product Name" },
  { key: "product_category", label: "Category" },
  { key: "selling_price", label: "Unit Price" },
  { key: "discount_value", label: "Discount Value" },
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

const handleAction = (selectedOption, row) => {
  console.log(`Selected ${selectedOption.value} for ${row.product_name}`);
};

const data = [
  {
    product_name: "Wireless Mouse",
    product_category: "Electronics",
    selling_price: "$25.99",
    discount_value: "$10.00",
    status: "available",
  },
  {
    product_name: "Organic Shampoo",
    product_category: "Personal Care",
    selling_price: "$8.99",
    discount_value: "$1.00",
    status: "available",
  },
  {
    product_name: "Desk Lamp",
    product_category: "Home Decor",
    selling_price: "$45.50",
    discount_value: "$15.00",
    status: "available",
  },
];

function Home() {
  return (
    <div>
      <ProductsInfo/>
      <TableComponent columns={columns} data={data} />
    </div>
  );
}

export default Home;
