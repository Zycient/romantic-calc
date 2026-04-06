import { useState } from "react";
import calcLogo from "./assets/bsCalculator.svg";
import "./App.css";
import MenuBar from "./components/MenuBar";
import CalcContainer from "./components/CalcContainer";

const App = () => {
  return (
    <>
      <section id="center">
        <div className="hero">
          <img
            src={calcLogo}
            className="bigLogo max-w-40"
            alt="Calculator logo"
          />
        </div>
        <div className="flex flex-col">
          <h1>Romantic Calc</h1>
          {/* Overall App Container */}
          <div className="app-container max-w-80 min-w-24 flex flex-col border border-gray-100 dark:border-gray-900 bg-gray-200 dark:bg-neutral-900 rounded-xl">
            <MenuBar />
            <CalcContainer />
          </div>
        </div>
      </section>
      <section id="spacer"></section>
    </>
  );
};

export default App;
