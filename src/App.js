import "./App.css";
import NewWordForm from "./components/NewWordForm";
import WordCloud from "./components/wordCloud";
import { useState, useEffect } from "react";
import axios from "axios";
import WordList from "./components/WordList";

function App() {
  const [wordsFreq, setWordsFreq] = useState({});

  const getWords = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/words`)
      .then((response) => {
        setWordsFreq(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addWord = (newWordInfo) => {
    console.log('Happy New Year!')
    
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/words`, newWordInfo)
      .then((response) => {
        console.log(response.data);
        getWords();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(getWords, []);

  return (
    <div>
      <header>
        <h1>Feeling Well</h1>
      </header>

      <aside>
        <div><WordList submitNewWord={addWord} /></div>

        <NewWordForm 
        createNewWordForm={addWord}
        />
      </aside>
      <main>
        <div>
        <WordCloud wordsFreq={wordsFreq}/>
        </div>
      </main>
    </div>
  );
}

export default App;
