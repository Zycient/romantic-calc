import { atom } from "recoil";

// ? TODO: delete these??? could just use currentResultAtom for Primary and operandsAtom, operatorsAtom for Secondary; if these states end up ONLY being used in CalcDisplay, then remove these, convert to local useState
export const primaryDisplayAtom = atom({
  key: "PrimaryDisplayState",
  default: "0",
});

export const secondaryDisplayAtom = atom({
  key: "SecondaryDisplayState",
  default: "",
});
