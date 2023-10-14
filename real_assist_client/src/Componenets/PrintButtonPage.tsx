import { PrinterIcon } from "@heroicons/react/24/outline";
const SERVER_URL = import.meta.env.VITE_SERVER_URI;


export const PrintButtonPage = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-center h-screen w-screen">
        <a
            href={`${SERVER_URL}/data/report`}
        >
          <button
            type="button"
            className={`px-6 py-3.5 text-base font-medium text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl text-center dark:black dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            <div className="flex flex-rwo">
              <PrinterIcon className="h-6 w-6" />

              <p className="pl-2">Print</p>
            </div>
          </button>
        </a>
      </div>
    </>
  );
};
