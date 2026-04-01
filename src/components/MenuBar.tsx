import * as React from "react";

const MenuBar = () => {
  // TODO: add click handler to launch info modal
  return (
    <div className="menubar-container w-full h-6 border-b border-b-gray-100 dark:border-b-gray-900 bg-gray-50 dark:bg-gray-950 text-[0.7rem] rounded-t-xl">
      {/* TODO: wire click handling to item */}
      <div className="menu-item hover:bg-gray-300 dark:hover:bg-gray-800 rounded-t-xl">
        About
      </div>
    </div>
  );
};

export default MenuBar;
