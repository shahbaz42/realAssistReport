import React from "react";
import LineChartComp from "./LineChartComp";

const Document = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <div
      ref={ref}
      className="w-screen md:max-w-[768px] h-screen mx-auto bg-[#f7f9fc]"
    >
      {/* header */}
      <div className="bg-[#e8eefb]">
        <h3 className="font-semibold py-2 pl-3 text-[#1463ff] ">
          Market Insights
        </h3>
      </div>
      <div className="bg-white mt-3 mx-3 rounded-2xl h-md border-2 border-[#e3e7f1]">
        <div>
          <h3 className="text-center mt-2 font-semibold text-sm">
            Market Insights
          </h3>
          <h4 className="text-center font-semibold text-[#818bad] text-sm">
            for 98114 - August 2nd, 2023
          </h4>
        </div>

        <div>
          <h3 className="text-left ml-4 pt-2 mt-2 font-semibold text-md">
            Sales vs List price
          </h3>
          <div className="flex flex-row justify-center px-6 items-center">
            <div className="">10%</div>
            <div>
              <LineChartComp />
            </div>
            <div className="">100%</div>
          </div>
        </div>
        <hr className="mx-4 border-t-2 " />
        <div>
          <h3 className="text-left ml-4 pt-2 mt-2 font-semibold text-md">
            Sales vs List price
          </h3>
          <div className="flex flex-row justify-center px-6 items-center">
            <div className="">10%</div>
            <div>
              <LineChartComp />
            </div>
            <div className="">100%</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Document;