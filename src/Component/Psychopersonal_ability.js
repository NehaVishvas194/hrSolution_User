
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../Api/BaseUrl';
import Swal from 'sweetalert2'
const Psychopersonal_ability = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data,jobId} = state || {};
  console.log(data,jobId);
  const psychometric_Test = data;

  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currectAns, setCurrectAns] = useState([])

  const handleTestData = () => {
    axios.get(`${baseUrl}getAll_psychometric_personal_ability_questions`).then((response) => {
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

      //  function randomNumbersArray(length =  5) {
      //   return [...Array(length)].map(() => Math.floor(Math.random() *  5) + 1);
      // }
      // console.log(randomNumbersArray)
      // setQuestigetredamResponseons(response);
      // Initialize selected options array with default values
      // const defaultOptions = Array(response.data.Test.questions.length).fill(null);
      // setSelectedOptions(defaultOptions);

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






  // Call the function and log the result


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

    console.log("Number of matches:", matchCount+data);
    const reallDAta = matchCount+data
    console.log(reallDAta);

    if (reallDAta > 5) {
      navigate("/multistepform",{state:{data:jobId}});
      Swal.fire({
        title: `${reallDAta}/8`,
        text: "Congratulations! You have successfully passed the exam. You are now eligible to proceed with the job application.",
        icon: "success"
      });
    } else {
      Swal.fire(`${reallDAta}/8`, `We're sorry, but you did not pass the exam this time. Don't be discouraged! You can always try again in the future or explore other job opportunities.`, "error");
      navigate("/");
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
                  <button>Personal Ability test</button>
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
                  <button className="b-btn b-btn-green" onClick={handleChangeChek}>Submit<i className="fi fi-sr-arrow-right"></i></button>
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

export default Psychopersonal_ability;
