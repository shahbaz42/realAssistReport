import { PrinterIcon } from "@heroicons/react/24/outline";
const SERVER_URL = import.meta.env.VITE_SERVER_URI;
import axios from "axios";
import { useState } from "react";

export const PrintButtonPage = () => {
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    const url = `${SERVER_URL}/data/report`
    const response = await axios.get(url, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      }
    });
    setLoading(false);
    const downloadUrl = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'report.pdf';
    link.click();
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center h-screen w-screen">

          <button
            type="button"
            onClick={handleDownloadPDF}
            className={`px-6 py-3.5 text-base font-medium text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl text-center dark:black dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            disabled={loading}
          >
            <div className="flex flex-rwo">
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16 8 8 0 000 16z"></path>
                </svg>
              ) : (
                <PrinterIcon className="h-6 w-6" />
              )}

              <p className="pl-2">{loading ? "Loading..." : "Print"}</p>
            </div>
          </button>
      </div>
    </>
  );
};
