import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const response = await fetch("http://localhost:4000/questions");
    const data = await response.json();
    setQuestions(data);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm fetchQuestions={fetchQuestions} />
      ) : (
        <QuestionList questions={questions} fetchQuestions={fetchQuestions} />
      )}
    </main>
  );
}

export default App;