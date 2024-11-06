import React, {useState} from "react";
import { BellIcon, HomeIcon } from "@heroicons/react/outline";
import SelectComponent from "./selectComponent";
import { NavLink } from "react-router-dom";  // Import NavLink

function Header() {
  const [selectedUser,setSelectedUser]  = useState(null);
  const options = [
    { value: "home", label: "Home" },
    { value: "profile", label: "Profile" },
    { value: "settings", label: "Settings" },
  ];

  const activeLinkStyle = {
    color: 'blue',
  };
  const handleSelectChange = (selectedOption)=>{
    setSelectedUser(selectedOption);
    console.log(selectedUser,"Selected User value is ")
  }

  return (
    <div>
      <div className="flex justify-between mx-7 my-2" id="mainHeader">
        <div>
          <h1 className="text-2xl font-medium text-gray-700">Inventory</h1>
        </div>
        <div className="flex justify-center space-x-6 items-center">
        <SelectComponent
         options ={options}
          minHeight="25px" 
          fontSize="15px"
          width="160px" 
          onChange={handleSelectChange}
         />
          <BellIcon className="h-6 w-6 text-blue-500" />
          <img
            className="w-8 h-8 rounded-lg"
            src="https://img.freepik.com/premium-photo/friendly-isolated-portrait-african-american-business-man-sales-representative-boss_1025753-187309.jpg"
            alt="userImage"
          />
        </div>
      </div>
      <hr />
      <div className="mx-6 flex space-x-2 my-1">
        <NavLink
          to="/"
          style={({ isActive }) => isActive ? activeLinkStyle : undefined}
        >
          <HomeIcon className="w-7 h-7 p-1" />
        </NavLink>
        <p className="text-medium font-medium text-black">/</p>
        <NavLink
          to="/inventory"
          style={({ isActive }) => isActive ? activeLinkStyle : undefined}
        >
          <p className="text-medium">Inventory</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
