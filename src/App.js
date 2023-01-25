import "./App.css";
import NewWordForm from "./components/NewWordForm";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [wordsString, setWordsString] = useState("");

  const addWord = (newWordInfo) => {
    console.log('addWord is called here')
    
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/words`, newWordInfo)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/words`)
      .then((response) => {
        setWordsString(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <header>
        <h1>Feeling Well</h1>
      </header>

      <aside>
        <NewWordForm createNewWordForm={addWord} />
      </aside>
      <main>{wordsString}</main>
    </div>
  );
}

export default App;
