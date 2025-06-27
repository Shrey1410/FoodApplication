import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
export const VendorContext = createContext();
const VITE_API_URL = import.meta.env.VITE_API_URL;
const VendorContextProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);
  useEffect(() => {
    const automaticlogin = async () => {
      try {
        const res = await axios.post(
          `${VITE_API_URL}/vendor/automaticlogin`,
          {},
          {
            withCredentials: true,
          }
        );
        setVendor(res.data.vendor);
      } catch (err) {
        console.log(err);
        setVendor(null)
      }
    };
    automaticlogin();
  }, []);
  return (
    <VendorContext.Provider value={{ vendor, setVendor }}>
      {children}
    </VendorContext.Provider>
  );
};

export default VendorContextProvider;
