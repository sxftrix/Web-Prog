import React, { useState, useEffect } from 'react';
import './index.css';

// The main App component for the grade calculator
const App = () => {
  // State variables for the three input fields
  const [quizzes, setQuizzes] = useState(75);
  const [labActivities, setLabActivities] = useState(75);
  const [finalExam, setFinalExam] = useState(75);

  // State variables for the calculated results
  const [overallGrade, setOverallGrade] = useState(75);
  const [fourPointScale, setFourPointScale] = useState('1.00');
  
  // State to handle potential errors in input
  const [error, setError] = useState('');

  // Function to calculate the grades
  const calculateGrades = () => {
    // Basic input validation: check if inputs are valid numbers between 0 and 100
    const quizValue = parseFloat(quizzes);
    const labValue = parseFloat(labActivities);
    const finalValue = parseFloat(finalExam);

    if (isNaN(quizValue) || isNaN(labValue) || isNaN(finalValue) || quizValue < 0 || quizValue > 100 || labValue < 0 || labValue > 100 || finalValue < 0 || finalValue > 100) {
      setError('Please enter valid scores between 0 and 100.');
      // Display a custom modal instead of alert()
      document.getElementById('error-modal').classList.remove('hidden');
      return;
    }
    
    // Clear any previous errors
    setError('');
    document.getElementById('error-modal').classList.add('hidden');

    // Calculate the overall grade using the provided weights
    const calculatedOverallGrade = (quizValue * 0.3) + (labValue * 0.3) + (finalValue * 0.4);
    setOverallGrade(calculatedOverallGrade.toFixed(2));

    // Determine the 4-Point Scale Grade based on the reference table
    let calculatedFourPointScale;
    if (calculatedOverallGrade >= 98.51) {
      calculatedFourPointScale = 4.00;
    } else if (calculatedOverallGrade >= 96.51) {
      calculatedFourPointScale = 3.75;
    } else if (calculatedOverallGrade >= 94.51) {
      calculatedFourPointScale = 3.50;
    } else if (calculatedOverallGrade >= 92.51) {
      calculatedFourPointScale = 3.25;
    } else if (calculatedOverallGrade >= 90.51) {
      calculatedFourPointScale = 3.00;
    } else if (calculatedOverallGrade >= 88.51) {
      calculatedFourPointScale = 2.75;
    } else if (calculatedOverallGrade >= 86.51) {
      calculatedFourPointScale = 2.50;
    } else if (calculatedOverallGrade >= 84.51) {
      calculatedFourPointScale = 2.25;
    } else if (calculatedOverallGrade >= 82.51) {
      calculatedFourPointScale = 2.00;
    } else if (calculatedOverallGrade >= 80.51) {
      calculatedFourPointScale = 1.75;
    } else if (calculatedOverallGrade >= 78.51) {
      calculatedFourPointScale = 1.50;
    } else if (calculatedOverallGrade >= 76.51) {
      calculatedFourPointScale = 1.25;
    } else if (calculatedOverallGrade >= 74.51) {
      calculatedFourPointScale = 1.00;
    } else {
      calculatedFourPointScale = 0.00;
    }
    setFourPointScale(calculatedFourPointScale.toFixed(2));
  };
  
  // Handle the modal close button click
  const closeModal = () => {
      document.getElementById('error-modal').classList.add('hidden');
  };

  // Perform initial calculation on component mount and when inputs change
  useEffect(() => {
    calculateGrades();
  }, [quizzes, labActivities, finalExam]);

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Grades Calculator</h1>
        
        {/* Input form */}
        <div className="form-group-container">
          <div className="form-group">
            <label htmlFor="quizzes" className="label">Quizzes</label>
            <input
              type="number"
              id="quizzes"
              value={quizzes}
              onChange={(e) => setQuizzes(e.target.value)}
              className="input-field"
              min="0"
              max="100"
            />
          </div>
          <div className="form-group">
            <label htmlFor="labActivities" className="label">Lab Activities</label>
            <input
              type="number"
              id="labActivities"
              value={labActivities}
              onChange={(e) => setLabActivities(e.target.value)}
              className="input-field"
              min="0"
              max="100"
            />
          </div>
          <div className="form-group">
            <label htmlFor="finalExam" className="label">Final Exam</label>
            <input
              type="number"
              id="finalExam"
              value={finalExam}
              onChange={(e) => setFinalExam(e.target.value)}
              className="input-field"
              min="0"
              max="100"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="button-group">
          <button
            onClick={calculateGrades}
            className="btn btn-submit"
          >
            Submit
          </button>
        </div>

        {/* Results Display */}
        <div className="results-container">
          <p className="result-text">
            Grade: <span className="result-value">{overallGrade}</span>
          </p>
          <p className="result-text">
            Final 4-Point Scale Grade: <span className="result-value">{fourPointScale}</span>
          </p>
        </div>
      </div>
      
      {/* Custom Error Modal */}
      <div id="error-modal" className="modal-overlay hidden">
        <div className="modal">
          <div className="modal-content">
            <h3 className="modal-title">Input Error</h3>
            <div className="modal-body">
              <p className="modal-message">{error}</p>
            </div>
            <div className="modal-actions">
              <button
                id="ok-btn"
                onClick={closeModal}
                className="modal-btn"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
