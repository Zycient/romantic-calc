import * as React from "react";

type props = {
  displayText: string;
};

const CalcButton = ({ displayText }: props) => {
  return (
    <div className="calc-button rounded-xs bg-linear-to-b from-slate-100 dark:from-slate-700 to-slate-200 dark:to-slate-600 hover:bg-gray-300 dark:hover:bg-gray-600">
      {displayText}
    </div>
  );
};

export default CalcButton;
