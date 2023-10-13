import LineChartComp from "./LineChartComp";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { ILineChartData } from "../../types";

interface DocumentProps {
  data: ILineChartData[];
  reference: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
}

const Document = ({ data, reference, isLoading }: DocumentProps) => {
  return (
    <div
      ref={reference}
      className="document-to-print"
    >
      {/* header */}
      <div className="bg-[#e8eefb]">
        <h3 className="font-semibold py-2 pl-3 text-[#1463ff] ">
          Market Insights
        </h3>
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-50px)]">
          <button
            type="button"
            className={`flex flex-row items-center justify-center text-white h-[52px] w-[52px] bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-smpy-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${
              isLoading ? "animate-spin" : ""
            }`}
          >
            <ArrowPathIcon className="h-[30px] w-[30px]" />
          </button>
        </div>
      ) : (
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
                <LineChartComp data={data} />
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
                <LineChartComp data={data} />
              </div>
              <div className="">100%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Document;