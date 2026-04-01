import * as React from "react";
import { BsArrowLeft } from "react-icons/bs";

type props = {
  rawText: string;
};

const CalcButton = ({ rawText }: props) => {
  /**
   * Parses incoming text to see if formatting is needed
   * or an icon needs to be returned.
   * @returns formatted text or icon as needed
   */
  const parseText = () => {
    // Backspace
    if (rawText === "<-") {
      return <BsArrowLeft />;
    } else {
      return rawText;
    }
  };

  return (
    <div className="calc-button rounded-xs bg-linear-to-b from-slate-100 dark:from-slate-700 to-slate-200 dark:to-slate-600 hover:bg-gray-300 dark:hover:bg-gray-600">
      {parseText()}
    </div>
  );
};

export default CalcButton;
