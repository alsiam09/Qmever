import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

let apiData = createContext();

const ContextApi = ({children}) => {
  let [info, setInfo] = useState([]);

  const getData = () => {
    axios.get("https://rupkotha-a706e-default-rtdb.asia-southeast1.firebasedatabase.app/products.json")
      .then((res) => {
         (res.data || []);  // Ensure you handle null or empty data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(info);

  return (
    <apiData.Provider value={info}>{children}</apiData.Provider>
  );
};

export { ContextApi, apiData };
