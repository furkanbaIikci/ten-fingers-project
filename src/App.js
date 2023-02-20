import "./App.css";
import { useState } from "react";
import TurkishWords from "./Words/TurkishWords";

function App() {
  const words = useState(TurkishWords);

  return (
    <div>
      <div className="mx-auto">
        <div className="">
          <option selected value="Turkish">Turkish</option>
          <option value="English">English</option>
        </div>
      </div>
    </div>
  );
}

export default App;
