import * as React from "react";
import { useRecoilValue } from "recoil";
import { primaryDisplayAtom, secondaryDisplayAtom } from "../states/displayAtom";

const CalcDisplay = () => {
  const primaryDisplayVal = useRecoilValue(primaryDisplayAtom);
  const secondaryDisplayVal = useRecoilValue(secondaryDisplayAtom);

  return (
    <div className="calc-display flex flex-col justify-center items-end w-full pr-1 bg-linear-to-b from-slate-300 dark:from-slate-900 to-slate-100 dark:to-slate-700 rounded-xs">
      <div className="calc-display-secondary font-light text-right text-sm">
        {secondaryDisplayVal}
      </div>
      <div className="calc-display-primary font-semibold text-right text-lg">
        {primaryDisplayVal}
      </div>
    </div>
  );
};

export default CalcDisplay;
