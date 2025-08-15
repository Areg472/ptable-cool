import "./App.css";
import Cell from "./components/cell.jsx";
import col_1 from "./assets/col_1.json";
import col_2 from "./assets/col_2.json";
import col_3 from "./assets/col_3.json";
import col_4 from "./assets/col_4.json";
import col_5 from "./assets/col_5.json";
import col_6 from "./assets/col_6.json";
import col_7 from "./assets/col_7.json";
import col_8 from "./assets/col_8.json";
import col_9 from "./assets/col_9.json";
import col_10 from "./assets/col_10.json";
import col_11 from "./assets/col_11.json";
import col_12 from "./assets/col_12.json";
import col_13 from "./assets/col_13.json";
import col_14 from "./assets/col_14.json";
import col_15 from "./assets/col_15.json";
import col_16 from "./assets/col_16.json";
import col_17 from "./assets/col_17.json";
import col_18 from "./assets/col_18.json";
import { useState } from "react";
import colorMap from "./assets/colorMap.json";

const cols = [
  col_1,
  col_2,
  col_3,
  col_4,
  col_5,
  col_6,
  col_7,
  col_8,
  col_9,
  col_10,
  col_11,
  col_12,
  col_13,
  col_14,
  col_15,
  col_16,
  col_17,
  col_18,
];

function App() {
  const [info, setInfo] = useState({
    elementName: "",
    elementSymbol: "",
    elementNumber: "",
    elementWeight: "",
    elementCategory: "invincible",
  });

  const resetInfo = () => {
    setInfo({
      elementName: "",
      elementSymbol: "",
      elementNumber: "",
      elementWeight: "",
      elementCategory: "invincible",
    });
  };

  console.log(info);

  return (
    <>
      <InfoBox info={info} />
      <div className="flex justify-center">
        <div
          className="flex flex-row mt-6"
          onMouseLeave={() => {
            resetInfo();
          }}
        >
          {cols.map((col, index) => (
            <CellContainer col={col} key={index} setter={setInfo} />
          ))}
        </div>
      </div>
    </>
  );
}

function InfoBox({ info }) {
  let color_style = colorMap[info.elementCategory] || "bg-gray-500";
  let border_style;
  let duration_class = "duration-700";

  if (info.elementCategory === "invincible") {
    color_style = "invincible";
    duration_class = "duration-300";
  }

  if (info.elementCategory !== "invincible") {
    border_style = "border-2 border-black";
  }

  return (
    <div
      className={`flex flex-row items-center ${color_style} text-white h-28 w-80 rounded-xs ${duration_class} ${border_style} mx-auto transition-all px-4`}
    >
      <div
        className={`transition-opacity text-center min-w-[3.5rem] ${info.elementSymbol ? "opacity-100" : "opacity-0"} mr-6 text-5xl font-extrabold flex-shrink-0 font-raleway`}
      >
        {info.elementSymbol}
      </div>
      <div className="flex flex-col flex-grow items-end text-right">
        <p
          className={`transition-opacity ${info.elementName ? "opacity-100" : "opacity-0"}`}
        >
          Name: {info.elementName}
        </p>
        <p
          className={`transition-opacity ${info.elementNumber ? "opacity-100" : "opacity-0"}`}
        >
          Element number: {info.elementNumber}
        </p>
        <p
          className={`transition-opacity ${info.elementWeight ? "opacity-100" : "opacity-0"}`}
        >
          Element weight: {info.elementWeight}
        </p>
      </div>
    </div>
  );
}

function CellContainer({ col, setter }) {
  return (
    <div className="flex flex-col space-x-0.5 space-y-0.5">
      {col.map((item) => (
        <Cell
          key={item.number}
          number={item.number}
          element={item.element}
          category={item.elementCategory}
          custom_classes={item.custom_classes}
          custom_classes_cell={item.custom_classes_cell}
          no_transform={item.no_transform}
          setter={setter}
          element_name={item.name}
          element_weight={item.elementWeight}
        />
      ))}
    </div>
  );
}

export default App;
