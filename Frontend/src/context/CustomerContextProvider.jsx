import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
export const CustomerContext = createContext();
const VITE_API_URL = import.meta.env.VITE_API_URL;
const CustomerContextProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    const automaticlogin = async () => {
      try {
        const res = await axios.post(
          `${VITE_API_URL}/customer/automaticlogin`,
          {},
          {
            withCredentials: true,
          }
        );
        setCustomer(res.data.customer);
      } catch (err) {
        console.log(err);
        setCustomer(null)
      }
    };
    automaticlogin();
  }, []);
  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContextProvider;
