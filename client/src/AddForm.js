// src/AddForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddForm.css';  // Create this file for form-specific styles

function AddForm() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '']);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      question,
      answers: answers.filter(answer => answer.trim() !== '')
    };

    axios.post('http://localhost:5000/api/submit', formData)
      .then((response) => {
        console.log('Form submitted successfully:', response.data);
        navigate('/');  // Redirect to home after submission
      })
      .catch((error) => {
        console.log('Error submitting form:', error);
      });
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const addAnswer = () => {
    if (answers.length < 6) {
      setAnswers([...answers, '']);
    }
  };

  const removeAnswer = (index) => {
    if (answers.length > 2) {
      const newAnswers = answers.filter((_, i) => i !== index);
      setAnswers(newAnswers);
    }
  };

  return (
    <div className="form-container">
      <h2>Add a Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        {answers.map((answer, index) => (
          <div key={index} className="answer-container">
            <label>Answer {index + 1}:</label>
            <div className="answer-input">
              <input
                type="text"
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                required={index < 2}
              />
              {answers.length > 2 && (
                <button 
                  type="button" 
                  className="remove-answer" 
                  onClick={() => removeAnswer(index)}
                >
                  X
                </button>
              )}
            </div>
          </div>
        ))}
        {answers.length < 6 && (
          <button type="button" onClick={addAnswer}>Add Answer</button>
        )}
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default AddForm;
