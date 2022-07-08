import React from "react";
import CategoryButton from "./CategoryButton";
import { Link } from "react-router-dom";

const HomeScreen = (props) => {
    let categoryNames = Object.keys(props.category)
    return (
        <>
            <div id="title">
                <h1>Trivia Time!</h1>
                <h4>Click on a category below to get a question.</h4>
            </div>
            <section id="category-buttons">
                {categoryNames.map((cat) => {
                    return <CategoryButton category={cat} getQuestion={props.getQuestion}/>
                })}
            </section>
            <section>
                <h3>Select Difficulty</h3>
                    <button type="button" name="easy" onClick={props.handleDifficultyChange}>Easy</button>
                    <button name="medium" onClick={props.handleDifficultyChange}>Medium</button>
                    <button name="hard" onClick={props.handleDifficultyChange}>Hard</button>
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