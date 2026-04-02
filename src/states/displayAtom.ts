import { atom } from "recoil";

export const primaryDisplayAtom = atom({
  key: "PrimaryDisplayState",
  default: "TEST",
});

export const secondaryDisplayAtom = atom({
  key: "SecondaryDisplayState",
  default: "test",
});
