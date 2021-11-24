import React from "react";
import CategoryButton from "./CategoryButton";
import { Link } from "react-router-dom";

const HomeScreen = (props) => {
    return (
        <>
            <div id="title">
                <h1>Trivia Time!</h1>
                <h4>Click on a category below to get a question.</h4>
            </div>
            <section id="category-buttons">
                {props.category.map((cat) => {
                    return <CategoryButton category={cat} getQuestion={props.getQuestion}/>
                })}
            </section>
            <span>
                <h4 id="question">Question: {props.question}</h4>
                <h4 id="answer">Answer: {props.answer}</h4>
                <button id="cat-button" onClick={props.resetQA}>Reset</button>
                <button id="past-questions-btn"><Link to="/past-questions">See Past Questions</Link></button>
            </span>
        </>
    )
}

export default HomeScreen