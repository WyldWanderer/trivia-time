import './App.css';
import React, {useState, useEffect} from 'react';
import CategoryButton from './components/CategoryButton';
import { API_KEY } from './constants'

const App = () => {
  const [categories, addCategory] = useState(["Art & Literature", "Language", "Science & Nature", "General", "Food & Drink", "People & Places", "Geography", "History & Holidays", "Entertainment", "Toys & Games", "Music", "Mathematics", "Religion & Mythology", "Sports & Leisure"])
  const [question, addQuestion] = useState()
  const [answer, addAnswer] = useState()
  const headers = {'X-Api-Key': API_KEY}

  const getQuestion = (category) => {
    const replaceAmpersand = category.replace("&", "")
    const noSpacesCat = replaceAmpersand.replace(/\s/g, "")
    const apiFriendlyCategory = noSpacesCat.toLowerCase()
    fetch(`https://api.api-ninjas.com/v1/trivia?category=${apiFriendlyCategory}`, {headers})
      .then((response) => {
        if(response.ok) {
          return response.json();
        } else {
          throw response.status;
        }
      })
      .then((data) => {
        console.log(data)
        addQuestion(data[0].question)
        addAnswer(data[0].answer)
      })
  }
  
  
  return (
    <div>
      <h1 id="title">Trivia Time!</h1>
      <h4 id="title">Click on a category below to get a question.</h4>
      <section id="category-buttons">
        {categories.map((cat) => {
          return <CategoryButton category={cat} getQuestion={getQuestion}/>
        })}
      </section>
      <span>
        <h4 id="question">Question: {question}</h4>
        <h4 id="answer">Answer: {answer}</h4>
      </span>
    </div>
  );
}

export default App;
