import React from "react";
import CategoryButton from "./CategoryButton";
import { Link } from "react-router-dom";


const HomeScreen = (props) => {

    let categoryNames = Object.keys(props.category)

    return (
        <>
            <div id="title">
                <h1>Trivia Time!</h1>
                <h4>Click on a category below to get a question! You can also change the difficulty for more of a challenge.</h4>
            </div>
            <section className="category-buttons">
                {categoryNames.map((cat) => {
                    return <CategoryButton category={cat} getQuestion={props.getQuestion}/>
                })}
            </section>
            <section className="difficulty-container" >
                <h3 >Select Difficulty</h3>
                    <button id="easy-btn" name="easy" className="difficulty-buttons-active" onClick={props.handleDifficultyChange}>Easy</button>
                    <button id="medium-btn" name="medium" className="difficulty-buttons-inactive" onClick={props.handleDifficultyChange}>Medium</button>
                    <button id="hard-btn" name="hard" className="difficulty-buttons-inactive" onClick={props.handleDifficultyChange}>Hard</button>
            </section>
            <span>
                <h4 id="question">Question: {props.question}</h4>
                <h4 id="answer">Answer: {props.answer}</h4>
                <button className="cat-button" onClick={props.resetQA}>Reset</button>
                <button id="past-questions-btn"><Link to="/past-questions">See Past Questions</Link></button>
            </span>
        </>
    )
}

export default HomeScreen