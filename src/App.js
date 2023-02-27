import "./App.css";
import { useEffect, useState, useRef } from "react";
import TurkishWords from "./Words/TurkishWords";
import EnglishWords from "./Words/EnglishWords";

function App() {
  const turkishWords = TurkishWords;
  const englishWords = EnglishWords;

  let wordTemp = "";
  const inputRef = useRef();

  const [words, setWords] = useState([]);
  const [language, setLanguage] = useState("Turkish");
  const [timer, setTimer] = useState(60);
  const [userInput, setUserInput] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [correctWords, setCorrectWords] = useState(0);
  const [wrongWords, setWrongWords] = useState(0);
  const [hideTimer, setHideTimer] = useState(false);

  useEffect(() => {
    if (language === "Turkish") {
      setWords(turkishWords);
    } else {
      setWords(englishWords);
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
    let time = timer;
    const interval = setInterval(() => {
      setIsStarted(true);
      time--;
      setTimer(time);
      if (time === 0) {
        setHideTimer(false);
        document.getElementById("userInput").placeHolder =
          language === "Turkish" ? "Süre Bitti" : "Time over";
        setIsStarted(false);
        clearInterval(interval);
      }
    }, 1000);
  };

  const resetGame = () => {
    setCorrectWords(0);
    setWrongWords(0);
    setTimer(60);
    setWordIndex(0);
    setUserInput("");
    setIsStarted(false);
    shuffle(words);

    /* reset word styles */
    words.forEach((word, index) => {
      document.getElementById(index).style =
        "background-color: transparent; text-decoration: none; opacity: 1;";
    });
  };

  const userInputFunction = () => {
    if (userInput.length > 0) {
      if (words[wordIndex].startsWith(userInput)) {
        document.getElementById(wordIndex).style.backgroundColor = "green";
      } else {
        document.getElementById(wordIndex).style.backgroundColor = "red";
      }
    }
  };

  useEffect(() => {
    
    /* sayfa yenilemede calismamasi icin bos kontrolu yapildi */
    if (!isStarted && userInput !== "") {
      startTimer();
    }

    if (words.length > wordIndex ) {
      if (userInput.includes(" ")) {
        wordTemp = userInput.slice(0, -1);
        if (words[wordIndex] === wordTemp) {
          setCorrectWords(correctWords + 1);
        } else {
          setWrongWords(wrongWords + 1);
        }

        setUserInput("");
        let word = document.getElementById(wordIndex);
        let afterWord = document.getElementById(wordIndex + 1);
        word.style =
          "background-color: transparent; text-decoration: line-through; opacity: 0.5;";
        console.log();
        if (word.offsetTop !== afterWord.offsetTop) {
          document.getElementById("wordDiv").scrollTop += 50;
        }

        if (wordIndex < words.length - 1) {
          document.getElementById(wordIndex + 1).style =
            "background-color: white; border-radius: 5px;";
        }
        setWordIndex(wordIndex + 1);
      } else {
        userInputFunction(); 
      }
    }
  }, [userInput]);

  return (
    <div>
      <div
        className="mx-auto text-center"
        style={isStarted ? { opacity: "0.7" } : {}}
      >
        <div className="mt-10">
          <input
            id="Turkish"
            type="radio"
            name="language"
            onClick={() => setLanguage("Turkish")}
            defaultChecked
            value="Turkish"
            disabled={isStarted}
          />
          <label style={{ fontSize: "30px" }} htmlFor="Turkish">
            {" "}
            Türkçe
          </label>
          <div />
          <input
            id="English"
            type="radio"
            name="language"
            onClick={() => setLanguage("English")}
            value="English"
            disabled={isStarted}
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
          type="number"
          min="1"
          value={hideTimer ? '' : timer}
          onChange={(e) => setTimer(e.target.value)}
          className="block w-32 h-12 text-2xl pl-5 rounded-md mx-auto mt-3 bg-slate-300"
          disabled={isStarted}
          style={isStarted ? { opacity: "0.7" } : {}}
        />
        <div className="text-center mt-4"> 
          <input type='checkbox' checked={hideTimer} onChange={() => setHideTimer(!hideTimer)} />
          <label htmlFor="timer"> {language === "Turkish" ? "Süreyi gizle" : "Hide Timer"} </label>
        </div>
      </div>
      

      <div>
        <div
          id="wordDiv"
          className="w-2/3 mx-auto mt-16 h-64 bg-slate-300 rounded-lg border-1 border-solid border-gray-500 overflow-hidden 	 "
        >
          {words.map((word, index) => {
            return (
              <p
                key={index}
                id={index}
                className="my-2 inline-block mx-4 text-3xl"
              >
                {word}
              </p>
            );
          })}
        </div>
      </div>
      <div>
        <div className="">
          <input
            ref={inputRef}
            id="userInput"
            type="text"
            className="block w-2/4 h-12 text-2xl pl-5 rounded-md mx-auto mt-8 bg-slate-300"
            onChange={(e) => setUserInput(e.target.value)}
            value={timer === 0 ? "" : userInput}
            autoComplete="off"
            placeholder={
              timer === 0
                ? language === "Turkish"
                  ? "Süre doldu!"
                  : "Timer over!"
                : ""
            }
            disabled={timer === 0 ? true : false}
          />
        </div>
        {timer === 0 && (
          <div className="text-center">
            <div className="text-2xl mt-8">
              {language === "Turkish"
                ? "Doğru Kelime Sayısı: "
                : "Correct Word Count: "}
              {correctWords}
            </div>
            <div className="text-2xl mt-8">
              {language === "Turkish"
                ? "Yanlış Kelime Sayısı: "
                : "Wrong Word Count: "}
              {wrongWords}
            </div>
            <div className="mt-8">
              <button
                className="bg-blue-400 text-2xl text-white p-1 rounded-md"
                onClick={resetGame}
              >
                {language === "Turkish" ? "Tekrar başlat" : "Restart"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
