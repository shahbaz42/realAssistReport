import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./App.css";

const Document = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <div ref={ref} className="w-screen md:max-w-[1008px] rounded-2xl h-screen mx-auto bg-white">
      {/* header */}
      <div className="bg-[#e8eefb] rounded-tl-2xl rounded-tr-2xl">
        <h3 className="font-semibold py-2 pl-3 text-[#1463ff] ">
          Market Insights
        </h3>
      </div>
    </div>
  );
});

function App() {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="flex p-3 flex-row items-center justify-center bg-[#1e1e1e] ">
        <Document ref={componentRef} />
        <button
          type="button"
          onClick={handlePrint}
          className="px-6 fixed bottom-6 left-1/2 ml-[-75px] py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Download Pdf
        </button>
      </div>
    </>
  );
}

export default App;
