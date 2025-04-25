import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types'; // Don't forget to import PropTypes
import Header from './Header';
import Footer from './Footer';
import Banner from "../Image/7.png"
import { useState,useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../Api/BaseUrl';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function SubscribeUser() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [currectAns, setCurrectAns] = useState([])
    const [isDisabled, setDisabled] = useState(false);

    const handleTestData = () => {
        axios.get(`${baseUrl}course_quiz/66f283292f9ecbed2c3ef832`).then((response) => {
          console.log(response.data.detail)
          const questions = response.data.detail;
        //   const numberOfQuestionsToSelect = 4; // Number of unique questions to select
    
        //   // Function to get a random subset of unique questions
        //   const getRandomQuestions = (questions, count) => {
        //     const shuffled = [...questions].sort(() => 0.5 - Math.random());
        //     return shuffled.slice(0, count);
        //   };
    
        //   const selectedQuestions = getRandomQuestions(questions, numberOfQuestionsToSelect);
        //   console.log(selectedQuestions);
          setQuestions(response.data.detail)
     
    
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
        //      
          setDisabled(true)
        }
    
      }

    return (
        <div>
            <Header />

            <div className="container mt-5">
                <div className="row mt-5 my-5">
                    <div className="col-12">
                        <h5>Course Content</h5>
                        <Box
                            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
                        >
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                sx={{ borderRight: 1, borderColor: 'divider' }}
                            >
                                <Tab label="Item One" {...a11yProps(0)} />
                                <Tab label="Item Two" {...a11yProps(1)} />
                                <Tab label="Item Three" {...a11yProps(2)} />
                                <Tab label="Item Four" {...a11yProps(3)} />
                                <Tab label="Item Five" {...a11yProps(4)} />
                                <Tab label="Item Six" {...a11yProps(5)} />
                                <Tab label="Item Seven" {...a11yProps(6)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <div className='col-lg-12 d-flex  justify-content-between'>
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
                                                            <strong>{question.course_name
                                                            }</strong>
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
                                </div>


                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                Item Four
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                Item Five
                            </TabPanel>
                            <TabPanel value={value} index={5}>
                                Item Six
                            </TabPanel>
                            <TabPanel value={value} index={6}>
                                Item Seven
                            </TabPanel>
                        </Box>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}
