import React from "react";

const CategoryButton = (props) => {
    return (
        <button className="cat-button" onClick={() => props.getQuestion(props.category)}>{props.category}</button>  
    )
}

export default CategoryButton