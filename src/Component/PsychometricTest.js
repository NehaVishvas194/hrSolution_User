import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../Api/BaseUrl';
import Swal from 'sweetalert2'
const PsychometricTest = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = state || {};
  console.log(data);
  const psychometric_Test = data;

  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currectAns, setCurrectAns] = useState([])
  const [isDisabled, setDisabled] = useState(false);
  

  const handleTestData = () => {
    axios.post(`${baseUrl}getAll_psychometric_questions`).then((response) => {
      console.log(response.data.Questions)
      const questions = response.data.Questions;
      const numberOfQuestionsToSelect = 4; // Number of unique questions to select

      // Function to get a random subset of unique questions
      const getRandomQuestions = (questions, count) => {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      };

      const selectedQuestions = getRandomQuestions(questions, numberOfQuestionsToSelect);
      console.log(selectedQuestions);
      setQuestions(selectedQuestions)
 

    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    handleTestData();
  }, []);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedOptions);
    const correctAnswers = questions.map((info) => info.correctAnswerIndex);

    setCurrectAns(correctAnswers);
  };

  console.log(selectedOptions)
  console.log(currectAns)




 


  const handleChangeChek = () => {
    let matchCount = 0;

    // Iterate through the arrays simultaneously
    for (let i = 0; i < currectAns.length; i++) {
      // Compare elements at the same index
      if (selectedOptions[i] === currectAns[i]) {
        // If they match, increment the match count
        matchCount++;
      }
    }

    console.log("Number of matches:", matchCount);
    console.log(typeof (matchCount));
    if(currectAns.length=== questions.length){
      navigate("/personalability" ,{state:{data:matchCount,jobId:psychometric_Test}})
      setDisabled(true)
    }

  }

  return (
    <>
      <div className="mcqMain">
        <Header />
        <section className="mcqSection">
          <div className="container">
            <div className="row">
              <h2>
                <div className="text-center">
                  <button>Please complete a quick assessment before applying for the job-Cognetive Ability Test</button>
                </div>
              </h2>
            </div>
            
            <div className="row justify-content-center">
              <div className="col-lg-7">
                {questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="questionMcq">
                    <strong>{question.question}</strong>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="prantMcq">
                        <input
                          type="radio"
                          id={`option_${questionIndex}_${optionIndex}`}
                          name={`question_${questionIndex}`}
                          value={option}
                          checked={selectedOptions[questionIndex] === optionIndex}
                          onChange={() => handleOptionChange(questionIndex, optionIndex)}
                        />
                        <label htmlFor={`option_${questionIndex}_${optionIndex}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="SubmitTest">
                  <button className="b-btn b-btn-green" onClick={handleChangeChek} disabled={isDisabled}>Next<i className="fi fi-sr-arrow-right"></i></button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default PsychometricTest;
