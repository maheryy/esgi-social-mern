const Tooltip = ({ content, children, position }) => {
  let cssPosition;
  switch (position) {
    case "top":
      cssPosition = "-top-2 -translate-y-full";
      break;
    case "left":
      cssPosition = "left-0 -translate-x-full";
      break;
    case "right":
      cssPosition = "right-0 translate-x-full";
      break;
    case "bottom":
      cssPosition = "-bottom-2 translate-y-full";
      break;
    default:
      cssPosition = "-top-2 -translate-y-full";
      break;
  }
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div className={`absolute ${cssPosition} w-32 flex flex-col items-center hidden group-hover:flex`}>
        <span
          className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">{content}</span>
        {/*<div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>*/}
      </div>
    </div>
  );
};

export default Tooltip;