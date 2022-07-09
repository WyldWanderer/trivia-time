import './App.css';
import React, {useState, useEffect} from 'react';
import HomeScreen from './components/HomeScreen'
import { app } from './components/Database';
import { getDatabase, ref, set, onValue } from '@firebase/database';
import { Route, Routes} from "react-router-dom";
import PastQuestionsComponent from './components/PastQuestions';
import Particles from 'react-tsparticles';

const App = () => {
  const categories = {
    "General Knowledge" : 9,
    "Entertainment" : [10,11,12,13,14,15,16,29,31,32],
    "Science & Nature" : 17,
    "Technology & Mathematics" : [18, 19, 30],
    "Mythology" : 20,
    "Sports" : 21,
    "Geography" : 22,
    "History" : 23,
    "Politics" : 24,
    "Art" : 25,
    "Celebrities": 26,
    "Animals": 27,
    "Vehicles": 28
  };
  const [question, addQuestion] = useState("");
  const [answer, addAnswer] = useState("");
  const [pastQuestions, addToPastQuestions] = useState();
  const [difficultyLevel, changeDifficulty] = useState("easy");

  String.prototype.hashCode = function() {
    let hash = 0;
    if (this.length === 0) {
      return hash;
    }
    for (let i = 0; i < this.length; i++){
      let char = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  };

  const fetchPastQuestions = () => {
    const db = getDatabase()
    const questionsInDB = ref(db, 'past_questions')
    onValue(questionsInDB, (snapshot) => {
      const data = snapshot.val()
      addToPastQuestions(data)
    })
  };

  useEffect(() => {
    fetchPastQuestions()
  }, []);

  const resetQA = () => {
    addQuestion("")
    addAnswer("")
  };

  const handleDifficultyChange = (e) => {
    let newDifficulty = e.target.name
    changeDifficulty(newDifficulty)
    let activeButtons = document.getElementsByClassName("difficulty-buttons-active")
    for(let i = 0; i < activeButtons.length; i++) {
      activeButtons[i].className = "difficulty-buttons-inactive"
    }
    document.getElementById(`${newDifficulty}-btn`).className = "difficulty-buttons-active"

    // if(document.getElementsByClassName("difficulty-buttons-active")) {
    //   console.log("active button")
    //   document.getElementsByClassName("difficulty-buttons-active").className = "difficulty-buttons-inactive"
    //   document.getElementById(`${newDifficulty}-btn`).className = "difficulty-buttons-active"
    // } else {
    //   console.log("no active buttons")
    //   document.getElementById(`${newDifficulty}-btn`).className = "difficulty-buttons-active"
    // }
  };

  const checkForPastQuestion = (question) => {
    const hashToCheck = question.hashCode()
    if (pastQuestions) {
      const fetchedHashes = Object.keys(pastQuestions)
      const fetchedQuestions = fetchedHashes.filter((q) => {
        return q === hashToCheck.toString();
      })
      return fetchedQuestions.length >= 1 ? true : false;
    } else {
      return false
    }
  }

  const getQuestion = (category) => {
    let categoryId = ""
    if (category === "Entertainment" || category === "Technology & Mathematics") {  
      categoryId = categories[category][Math.floor(Math.random() * categories[category].length)]
    } else {
      categoryId = categories[category]
    }
    fetch(`https://opentdb.com/api.php?amount=1&category=${categoryId}&type=multiple&difficulty=${difficultyLevel}`)
      .then((response) => {
        if(response.ok) {
          return response.json();
        } else {
          throw response.status;
        }
      })
      .then((data) => {
        console.log(data)
        if(checkForPastQuestion(data.results[0].question)) {
          console.log("Fetched a question that was already asked, fetching something new")
          getQuestion(category)
        } else {
        addQuestion(data.results[0].question.replace(/&quot;/g, '"'))
        addAnswer(data.results[0].correct_answer)
        trackAlreadyAskedQuestions(data.results[0].question, data.results[0].correct_answer)
        }
      });
  };

  const trackAlreadyAskedQuestions = (question, answer) => {
    const db = getDatabase()
    let hashedQuestion = question.hashCode()
    let today = new Date()
    let dateAsked = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
    set(ref(db, "past_questions/" + hashedQuestion), {
      question : question,
      answer : answer,
      dateAsked : dateAsked  
    })
  };

  const particlesInit = (main) => {
    //console.log(main);
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    //console.log(container);
  };
  
  return (
    <>
    <Particles
    id="tsparticles"
    init={particlesInit}
    loaded={particlesLoaded}
    options={{
      background: {
        color: {
          value: "#494949",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "push",
          },
          onHover: {
            enable: false,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40,
          },
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        collisions: {
          enable: false,
        },
        move: {
          direction: "none",
          enable: true,
          outMode: "bounce",
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 40,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          random: true,
          value: 5,
        },
      },
      detectRetina: false,
    }}
  />
      <div>
        <Routes>
          <Route path="/" element={
            <HomeScreen 
              category={categories} 
              getQuestion={getQuestion} 
              resetQA={resetQA} 
              question={question} 
              answer={answer}
              handleDifficultyChange={handleDifficultyChange}
              />
          }/>    
          <Route path="/past-questions" element={<PastQuestionsComponent pastQuestions={pastQuestions}/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
