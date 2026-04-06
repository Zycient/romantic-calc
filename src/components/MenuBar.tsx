import * as React from "react";

const MenuBar = () => {
  const aboutText =
    "Romantic Calc\n\n\tA calculator with support for the basics, backspace, clear, and Roman Numeral toggle (for the display and buttons).";
  return (
    <div className="menubar-container w-full h-6 border-b border-b-gray-100 dark:border-b-gray-900 bg-gray-50 dark:bg-gray-950 text-[0.7rem] rounded-t-xl">
      <div
        className="menu-item hover:bg-gray-300 dark:hover:bg-gray-800 rounded-t-xl select-none"
        onClick={() => alert(aboutText)}
      >
        About
      </div>
    </div>
  );
};

export default MenuBar;
