import colorMap from "../assets/colorMap.json";

const outlineClassMap = {
  reactive_nonmetals: "hover:outline-green-200",
  alkali_metals: "hover:outline-orange-200",
  alkaline_earth_metals: "hover:outline-yellow-300",
  transition_metals: "hover:outline-red-200",
  lanthanoids: "hover:outline-yellow-100",
  post_transition_metals: "hover:outline-blue-200",
  metalloids: "hover:outline-teal-300",
  actinoids: "hover:outline-pink-200",
  noble_gases: "hover:outline-purple-200",
  unknown: "hover:outline-gray-200",
};

export default function Cell({
  element,
  number,
  category,
  custom_classes,
  custom_classes_cell,
  no_transform,
  setter,
  element_name,
  element_weight,
}) {
  const isInvincible = category === "invincible";
  const isNumberOnly = !element || element === "";

  let color_style = "";
  if (!isInvincible) {
    color_style = colorMap[category] || "bg-gray-500";
  }

  const baseClasses =
    "w-12 h-12 min-w-12 min-h-12 flex flex-col justify-start items-start text-white";
  const borderClass = isInvincible ? "" : "border-2 border-black rounded-xs";

  const outlineHoverClass = isInvincible
    ? ""
    : outlineClassMap[category] || "hover:outline-gray-200";
  const transformClass =
    no_transform || isInvincible
      ? ""
      : `${outlineHoverClass} hover:outline-2 hover:outline-width-4 hover:outline-solid hover:scale-110 transition-all duration-150`;

  const custom_classes_impl = custom_classes || "";
  const custom_classes_cell_impl = custom_classes_cell || "";

  function handleHover() {
    if (isNumberOnly) {
      setter({
        elementName: "",
        elementSymbol: "",
        elementNumber: "",
        elementWeight: "",
        elementCategory: "invincible",
      });
    } else {
      setter({
        elementName: element_name,
        elementSymbol: element,
        elementNumber: number,
        elementWeight: element_weight,
        elementCategory: category,
      });
    }
  }

  let default_margin = "ml-1";

  if (category !== "blue") {
    default_margin = "ml-1";
  } else {
    default_margin = "";
  }

  return (
    <div
      className={`${color_style} ${baseClasses} ${borderClass} ${custom_classes_cell_impl} ${transformClass} -space-y-1`}
      onMouseEnter={() => {
        handleHover();
      }}
    >
      <p className={`${default_margin} ${custom_classes_impl}`}>{number}</p>
      <p className={`${default_margin} ${custom_classes_impl}`}>{element}</p>
    </div>
  );
}
