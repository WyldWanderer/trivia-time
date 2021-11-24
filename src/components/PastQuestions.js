import React from "react";
import { Link } from "react-router-dom";
import QuestionCard from "./QuestionCard";

const PastQuestionsComponent = (props) => {
    const questionKeys = Object.keys(props.pastQuestions)
    return (
        <>
            <button id="home-btn"><Link to="/">Home</Link></button>
            {questionKeys.map((question) => {
                return <QuestionCard question={props.pastQuestions[question].question} answer={props.pastQuestions[question].answer} date={props.pastQuestions[question].dateAsked}/>
            })}
        </>
    )
}

export default PastQuestionsComponent