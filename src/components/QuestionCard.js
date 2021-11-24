import React from "react";

const QuestionCard = (props) => {
    console.log(props)
    return (
        <div id="question-card">
            <h4 id="question">Question: {props.question}</h4>
            <h4 id="answer">Answer: {props.answer}</h4>
            <h4>Date Asked: {props.date}</h4>
        </div>
    )
}

export default QuestionCard