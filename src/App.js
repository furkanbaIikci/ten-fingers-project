import "./App.css";
import { useState } from "react";
import TurkishWords from "./Words/TurkishWords";

function App() {
  const words = [...TurkishWords];
  console.log(words);

  return (
    <div>
      <div className="mx-auto text-center">
        <div className="mt-10">
          <input type="radio" name="language" defaultChecked value="Turkish" />
          <label style={{ fontSize: "30px" }} for="Turkish">
            {" "}
            Türkçe
          </label>
          <div />
          <input type="radio" name="language" value="English" />
          <label style={{ fontSize: "30px" }} for="English">
            {" "}
            English
          </label>
        </div>
      </div>

      <div>
        <div className="w-2/3 mx-auto mt-16 h-72 bg-slate-300 rounded-lg border-2 border-solid border-black overflow-auto break-words ">
          {words.map((word, index) => {
            return <span className="mx-5 text-2xl">{word}</span>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
