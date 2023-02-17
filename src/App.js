import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import turkishWords from "./Words/TurkishWords";

function App() {
  const [words, setWords] = useState(turkishWords);


  return (
    <div>
      <div>{words[10]}</div>
    </div>
  );
}

export default App;
