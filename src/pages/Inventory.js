import React from "react";
import { useLocation } from "react-router-dom"; 
import AddProduct from "../components/addProduct";

function Inventory(){
    const location = useLocation();
    const editProduct = location.state?.editProduct;
    const heading = editProduct ? 'Edit Inventory Item': 'New Inventory Item'
    const buttonText = editProduct ? 'Edit & Publish':'Save &  Publish';
    console.log(editProduct);
    return (
        <div>
           <AddProduct 
           editProduct = {editProduct}
           heading = {heading}
           buttonText={buttonText}
           />
        </div>
    );
}

export default Inventory;