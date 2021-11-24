import './App.css';
import React, {useState, useEffect} from 'react';
import Particles from 'react-tsparticles';
import HomeScreen from './components/HomeScreen'
import { API_KEY } from './constants';
import { app } from './components/Database';
import { getDatabase, ref, set, onValue } from '@firebase/database';
import { Route, Routes} from "react-router-dom";
import PastQuestionsComponent from './components/PastQuestions';

const App = () => {
  const categories = ["Art & Literature", "Language", "Science & Nature", "General", "Food & Drink", "People & Places", "Geography", "History & Holidays", "Entertainment", "Toys & Games", "Music", "Mathematics", "Religion & Mythology", "Sports & Leisure"]
  const [question, addQuestion] = useState("")
  const [answer, addAnswer] = useState("")
  const [pastQuestions, addToPastQuestions] = useState()
  const headers = {'X-Api-Key': API_KEY}

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
  }

  const fetchPastQuestions = () => {
    const db = getDatabase()
    const questionsInDB = ref(db, 'past_questions')
    onValue(questionsInDB, (snapshot) => {
      const data = snapshot.val()
      addToPastQuestions(data)
    })
  }

  useEffect(() => {
    fetchPastQuestions()
  }, [])

  const resetQA = () => {
    addQuestion("")
    addAnswer("")
  }

  const checkForPastQuestion = (question) => {
    const hashToCheck = question.hashCode()
    if (pastQuestions) {
      const fetchedHashes = Object.keys(pastQuestions)
      const fetchedQuestions = fetchedHashes.map((q) => {
        return q.toString() === hashToCheck ? true : false;
      })
      return fetchedQuestions.includes(true) ? true : false;
    } else {
      return false
    }
  }

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
        if(checkForPastQuestion(data[0].question)) {
          console.log("Fetched a question that was already asked, fetching something new")
          getQuestion(category)
        } else {
        addQuestion(data[0].question)
        addAnswer(data[0].answer)
        trackAlreadyAskedQuestions(data[0].question, data[0].answer)
        }
      })
  }

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
  }
 
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
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
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
        detectRetina: true,
      }}
    />
      <div id="title">
        <h1>Trivia Time!</h1>
        <h4>Click on a category below to get a question.</h4>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<HomeScreen category={categories} getQuestion={getQuestion} resetQA={resetQA} question={question} answer={answer}/>}/>    
          <Route path="/past-questions" element={<PastQuestionsComponent pastQuestions={pastQuestions}/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
