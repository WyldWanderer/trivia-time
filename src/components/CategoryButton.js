import React from "react";

const CategoryButton = (props) => {
    return (
        <button id="cat-button" onClick={() => props.getQuestion(props.category)}>{props.category}</button> 
    )
}

export default CategoryButton