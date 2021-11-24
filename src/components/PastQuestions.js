import React from "react";
import { Link } from "react-router-dom";
import QuestionCard from "./QuestionCard";

const PastQuestionsComponent = (props) => {
    const questionKeys = Object.keys(props.pastQuestions)
    return (
        <>
            <div id="title">
                <h1>Trivia Time!</h1>
                <h4>Below are all the questions we have used in the past along with their answers and the day they were used!</h4>
            </div>
            <button id="home-btn"><Link to="/">Go Back to Main Screen</Link></button>
            {questionKeys.map((question) => {
                return <QuestionCard question={props.pastQuestions[question].question} answer={props.pastQuestions[question].answer} date={props.pastQuestions[question].dateAsked}/>
            })}
        </>
    )
}

export default PastQuestionsComponent