import "./App.css";
import { useEffect, useState, useRef } from "react";
import TurkishWords from "./Words/TurkishWords";
import EnglishWords from "./Words/EnglishWords";

function App() {
  const turkishWords = TurkishWords;
  const englishWords = EnglishWords;

  const wordRef = useRef([]);

  const [words, setWords] = useState([]);
  const [language, setLanguage] = useState("Turkish");
  const [timer, setTimer] = useState(5);
  const [userInput, setUserInput] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  const [isStarted, setIsStarted] = useState(false);

  const [correctWords, setCorrectWords] = useState(0);
  const [wrongWords, setWrongWords] = useState(0);

  useEffect(() => {
    if (language === "Turkish") {
      setWords(shuffle(turkishWords));
    } else {
      setWords(shuffle(englishWords));
    }
  }, [language]);

  /* Oyun basinda kelimeleri karistiran fonksiyon. */
  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  /* Zamanlayıcıyı baslatan fonksiyon */
  const startTimer = () => {
    if (!isStarted) {
      let time = timer;
      const interval = setInterval(() => {
        time--;
        setTimer(time);
        if (time === 0) {
          document.getElementById("userInput").placeHolder =
            language === "Turkish" ? "Süre Bitti" : "Time over";
          setIsStarted(false);
          clearInterval(interval);
        }
      }, 1000);
    }
  };

  /* Kullanıcının girdigi kelimelerin dogru olup olmadigini kontrol eden fonksiyon */
  /*   const checkWord = (e) => {
    if (e.keyCode == 32) {
      if (words[wordIndex] === userInput) {
        setCorrectWords(correctWords + 1);
      } else {
        setWrongWords(wrongWords + 1);
      }
      setWordIndex(wordIndex + 1);
      document.getElementById('userInput').value = '';
      setUserInput('');
    } else {
      userInputFunction();
    }
  }; */

  const userInputFunction = async () => {
    if (userInput.length > 0) {
      if (words[wordIndex].startsWith(userInput)) {
        document.getElementById(wordIndex).style.backgroundColor = "green";
      } else {
        document.getElementById(wordIndex).style.backgroundColor = "red";
      }
    }
  };

  const userInputControl = (e) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    if (userInput.includes(" ")) {
      setUserInput(userInput.slice(0, -1));
      if (words[wordIndex] === userInput) {
        setCorrectWords(correctWords + 1);
      } else {
        setWrongWords(wrongWords + 1);
      }
      setWordIndex(wordIndex + 1);
      setUserInput("");
      document.getElementById(wordIndex).style.backgroundColor = "transparent";
      document.getElementById(wordIndex + 1).style = {
        backgroundColor: "white",
        borderRadius: "5px",
      };
    } else {
      userInputFunction();
    }
  }, [userInput]);

  return (
    <div>
      <div className="mx-auto text-center">
        <div className="mt-10">
          <input
            type="radio"
            name="language"
            onClick={() => setLanguage("Turkish")}
            defaultChecked
            value="Turkish"
          />
          <label style={{ fontSize: "30px" }} htmlFor="Turkish">
            {" "}
            Türkçe
          </label>
          <div />
          <input
            type="radio"
            name="language"
            onClick={() => setLanguage("English")}
            value="English"
          />
          <label style={{ fontSize: "30px" }} htmlFor="English">
            {" "}
            English
          </label>
        </div>
      </div>

      <div>
        <div className="text-2xl mx-auto text-center mt-8">
          <label htmlFor="timer">
            {language === "Turkish" ? "Süre: " : "Time: "}
          </label>
        </div>
        <input
          id="timer"
          type="text"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
          className="block w-32 h-12 text-2xl pl-5 rounded-md mx-auto mt-3 bg-slate-300"
        />
      </div>

      <div>
        <div className="w-2/3 mx-auto mt-16 h-64 bg-slate-300 rounded-lg border-2 border-solid border-black overflow-auto 	 ">
          {words.map((word, index) => {
            return (
              <span
                key={index}
                style={{ backgroundColor: "transparent" }}
                ref={wordRef.current[index]}
                id={index}
                className="my-2 inline-block mx-4 text-3xl"
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
      <div>
        <div className="">
          <form>
            <input
              id="userInput"
              type="text"
              className="block w-2/4 h-12 text-2xl pl-5 rounded-md mx-auto mt-8 bg-slate-300"
              onClick={startTimer}
              onChange={(e) => userInputControl(e)}
              value={timer === 0 ? "" : userInput}
              placeholder={
                timer === 0
                  ? language === "Turkish"
                    ? "Süre doldu"
                    : "Timer over"
                  : ""
              }
              disabled={timer === 0 ? true : false}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
