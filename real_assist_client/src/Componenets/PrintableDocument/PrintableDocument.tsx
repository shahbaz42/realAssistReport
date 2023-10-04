import { useRef } from "react";
import Document from "./Document";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const PrintableDocument = () => {
  const componentRef = useRef(null);
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const SERVER_URL = import.meta.env.VITE_SERVER_URI;

  const fetchData = async () => {
    setIsLoading(true);
    const result = await axios(`${SERVER_URL}/data`);
    setData(result.data);
    setIsLoading(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex p-3 flex-row items-center justify-center bg-[#1e1e1e] ">
        <Document reference={componentRef} data={data} isLoading={isLoading} />
        <div className="fixed bottom-6 flex flex-row items-center justify-center">
          <button
            type="button"
            onClick={handlePrint}
            className={` ${isLoading? 'hidden' : 'visible' } px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            Download Pdf
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            className={` ${isLoading? 'hidden' : 'visible' } flex ml-2 flex-row items-center justify-center text-white h-[52px] w-[52px] bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-smpy-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${
              isLoading ? "animate-spin" : ""
            }`}
          >
            <ArrowPathIcon className="h-[30px] w-[30px]" />
          </button>
        </div>
      </div>
    </>
  );
};

export default PrintableDocument;
