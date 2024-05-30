import React, { useState } from "react";

function QuestionForm({ fetchQuestions }) {
  const initialFormData = {
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", ""), 10) - 1;
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({
        ...formData,
        answers: updatedAnswers,
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === "correctIndex" ? parseInt(value, 10) : value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    fetchQuestions();
    setFormData(initialFormData);
  };

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        {formData.answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              name={`answer${index + 1}`}
              value={answer}
              onChange={handleChange}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
{formData.answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;