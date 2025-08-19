import "./App.css";
import Cell from "./components/cell";
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
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

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

  const [selectedGroup, setSelectedGroup] = useState("all");
  const [previousGroup, setPreviousGroup] = useState("all");

  const handleGroupChange = (newGroup) => {
    setPreviousGroup(selectedGroup);
    setSelectedGroup(newGroup);
  };

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
            <CellContainer
              col={col}
              key={index}
              setter={setInfo}
              index={index}
              selectedCategory={selectedGroup}
              previousCategory={previousGroup}
            />
          ))}
        </div>
      </div>
      <ElementGroupSelector setter={handleGroupChange} />
    </>
  );
}

function InfoBox({ info }) {
  let color_style = colorMap[info.elementCategory] || "bg-gray-500";
  let border_style = "";
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

function CellContainer({
  col,
  setter,
  index,
  selectedCategory = "all",
  previousCategory = "all",
}) {
  return (
    <motion.div
      className="flex flex-col space-x-0.5 space-y-0.5"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.3,
        type: "tween",
      }}
    >
      {col.map((item = null, itemIndex) => {
        if (!item) {
          return <div key={`empty-${itemIndex}`} className="h-16 w-16"></div>;
        }

        const isVisible =
          selectedCategory === "all" ||
          item.elementCategory === selectedCategory ||
          item.elementCategory === "blue";
        const wasVisible =
          previousCategory === "all" ||
          item.elementCategory === previousCategory ||
          item.elementCategory === "blue";

        const category = item.elementCategory;

        const isFilteringFromAll =
          previousCategory === "all" && selectedCategory !== "all";
        const isShowingAll =
          selectedCategory === "all" && previousCategory !== "all";

        return (
          <motion.div
            key={item.number}
            initial={
              isShowingAll && !wasVisible
                ? { y: -10, opacity: 0, scale: 0 }
                : false
            }
            animate={{
              y: 0,
              opacity: isVisible ? 1 : 0.15,
              scale: isVisible ? 1 : 0.8,
            }}
            transition={{
              duration: isFilteringFromAll || isShowingAll ? 0.4 : 0.3,
              delay: isFilteringFromAll
                ? isVisible
                  ? 0
                  : itemIndex * 0.02
                : isShowingAll && !wasVisible
                  ? index * 0.1 + itemIndex * 0.02
                  : 0,
              ease: "easeInOut",
            }}
          >
            <Cell
              number={item.number}
              element={item.element}
              category={category}
              custom_classes={item.custom_classes}
              custom_classes_cell={item.custom_classes_cell}
              no_transform={item.no_transform}
              setter={setter}
              element_name={item.name}
              element_weight={item.elementWeight}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function ElementGroupSelector({ setter }) {
  const handleGroupChange = (group = "") => {
    setter(group);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-4 space-y-2">
      <div className="flex space-x-2">
        <Button onClick={() => handleGroupChange("all")}>All</Button>
        <Button onClick={() => handleGroupChange("reactive_nonmetals")}>
          Reactive non-metals
        </Button>
        <Button onClick={() => handleGroupChange("alkali_metals")}>
          Alkali metals
        </Button>
        <Button onClick={() => handleGroupChange("alkaline_earth_metals")}>
          Alkaline earth metals
        </Button>
        <Button onClick={() => handleGroupChange("transition_metals")}>
          Transition metals
        </Button>
      </div>
      <div className="flex space-x-2">
        <Button onClick={() => handleGroupChange("lanthanoids")}>
          Lanthanoids
        </Button>
        <Button onClick={() => handleGroupChange("post_transition_metals")}>
          Post-transition metals
        </Button>
        <Button onClick={() => handleGroupChange("metalloids")}>
          Metalloids
        </Button>
        <Button onClick={() => handleGroupChange("actinoids")}>
          Actinoids
        </Button>
        <Button onClick={() => handleGroupChange("noble_gases")}>
          Noble gases
        </Button>
        <Button onClick={() => handleGroupChange("unknown")}>Unknown</Button>
      </div>
    </div>
  );
}

export default App;
