import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, fetchQuestions }) {
  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });
    fetchQuestions();
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;