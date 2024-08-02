import React from "react";
import classes from "./styles/answerUI.module.css";
import Avatar from "react-avatar";

const AnswerUI = () => {
  return (
    <div
      className="container rounded-md shadow-md mx-auto my-8"
      id={classes.answer_container}
    >
      <div
        className="container p-7 bg-orange-100 w-100 mx-auto mb-4 rounded-md"
        id={classes.question_card}
      >
        <h2 className="text-2xl">Question</h2>
        <p>This is my question from the database</p>
        <p className="text-xs">The description of the question</p>
      </div>

      <div className="flex">
        <div id={classes.answer_div} className="container p-10">
          <hr />
          <h1 className="text-center my-5">Answer from Evangadi Community</h1>
          <hr />
          <div
            id={classes.list_of_answers}
            className="container shadow-lg my-3 p-8"
          >
            <Avatar
              name="Abebe Kebede"
              round={true}
              size="40px"
              email="abe@gmail.com"
            />
            <p>Answer given from a forum member</p>
          </div>
        </div>

        <div id={classes.ask_question} className=" container">
          
          <h2 className=" my-5 text-2xl ps-8">Answer the top question</h2>
          
          <input type="text" placeholder="Write your answer" className="shadow-md w-100 px-10 mx-8 py-10" id={classes.input} />

          <button className="py-4 sm:px-28 mt-3 ms-8 rounded-sm bg-orange-700 text-white">Post</button>
        </div>
      </div>
    </div>
  );
};

export default AnswerUI;
