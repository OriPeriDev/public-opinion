// src/View.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './View.css'; // Import the CSS file

function View() {
  const [questions, setQuestions] = useState([]); // Store all questions
  const [currentIndex, setCurrentIndex] = useState(0); // Track the index of the current question
  const [showPercentages, setShowPercentages] = useState(false); // State to control percentage display

  // Fetch questions when the component mounts
  useEffect(() => {
    getQuestion();
  }, []);

  // Function to get questions and answers from the backend
  const getQuestion = () => {
    axios.get('http://localhost:5000/api/questions')
      .then((response) => {
        console.log(response.data);
        setQuestions(response.data); // Save the data to state
      })
      .catch((error) => {
        console.log('Error fetching questions:', error);
      });
  };

  // Handle the "Next" button click
  const handleNext = () => {
    getQuestion(); // Fetch a new question instead of moving to the next one
    setShowPercentages(false); // Reset percentage display for new question
  };

  // Handle answer button click
  const handleAnswerClick = (answerId) => {
    if (!showPercentages) { // Only allow clicking if answers are not disabled
      axios.post('http://localhost:5000/api/answerClicked', { answerId })
        .then((response) => {
          console.log('Answer clicked:', response.data);
          // Update the click count for the clicked answer
          const updatedQuestions = questions.map(q => ({
            ...q,
            answers: q.answers.map(a => 
              a.id === answerId ? { ...a, click_count: a.click_count + 1 } : a
            )
          }));
          setQuestions(updatedQuestions);
          setShowPercentages(true); // Show percentages and disable further clicks
        })
        .catch((error) => {
          console.log('Error clicking answer:', error);
        });
    }
  };

  // Calculate percentages for answers
  const calculatePercentages = (answers) => {
    const totalClicks = answers.reduce((sum, answer) => sum + answer.click_count, 0);
    return answers.map(answer => ({
      ...answer,
      percentage: totalClicks > 0 ? (answer.click_count / totalClicks) * 100 : 0
    }));
  };

  return (
    <div className="view-container">
      {questions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        <div className="question-container">
          <h3>{questions[currentIndex].question}</h3>
          <div className="answers-container">
            {calculatePercentages(questions[currentIndex].answers).map((answer) => (
              <div key={answer.id} className="answer-item">
                <button
                  className={`answer-button ${showPercentages ? 'disabled' : ''}`}
                  onClick={() => handleAnswerClick(answer.id)}
                  id={answer.id}
                  disabled={showPercentages}
                >
                  {answer.answer}
                </button>
                {showPercentages && (
                  <div className="graph-container">
                    <div className="graph-bar" style={{width: `${answer.percentage}%`}}></div>
                    <span className="graph-label">{answer.percentage.toFixed(1)}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            className="next-button"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default View;
