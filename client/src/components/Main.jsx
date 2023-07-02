import React, { useEffect, useState } from 'react'
import axios from 'axios';
import FirstScreen from './screens/FirstScreen';
import Loader from './Loader';
import { BASE_URL } from '../helper/constants';

function Main() {
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(1);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [answers, setAnswers] = useState([]);
    const [places, setPlaces] = useState([]);
    const [selectedItinerary, setSelectedItinerary] = useState({});
    const [itinerary, setItinerary] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getStarted = () => {
        setIsLoading(true);
        axios.get(`${BASE_URL}/getQuestions`)
            .then(response => {
                let newQuestions = response.data.questions;
                setQuestions(newQuestions.filter(question => question.includes('?')));
                setIndex(index + 1);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.error(error);
            });
    }

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
    }

    const nextQuestion = (event) => {
        if (questionIndex >= questions.length) {
            setIndex(index + 1);
        }
        else {
            if (questionIndex == questions.length - 1) {
                setIndex(index + 1);
            }
            setQuestionIndex(questionIndex + 1);
            setAnswers([...answers, answer]);
            setAnswer('');
        }
    }

    const findDestination = (event) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/getPlaces`,
            {
                questions,
                answers: [...answers, answer]
            }
        )
            .then(response => {
                setPlaces(response.data.places)
                setIndex(index + 1);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);

            });
        setAnswers([...answers, answer]);
        setAnswer('');

    }

    const findItinerary = (event, index) => {
        if (itinerary.filter(element => element.location === places[index].destination).length) {
            setSelectedItinerary(itinerary.filter(element => element.location === places[index].destination)[0]);
            return;
        }
        setIsLoading(true);
        axios.post(`${BASE_URL}/createItinerary`,
            {
                questions,
                answers,
                place: places[index].destination,
            }
        )
            .then(response => {
                setItinerary([...itinerary, {
                    location: places[index].destination,
                    itinerary: response.data.itinerary
                }])
                setIsLoading(false);
                setSelectedItinerary({
                    location: places[index].destination,
                    itinerary: response.data.itinerary
                });

            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }
    return (
        <>
            {isLoading && <Loader />}
            {index <= 2 && <FirstScreen
                index={index}
                questions={questions}
                answer={answer}
                questionIndex={questionIndex}
                getStarted={getStarted}
                handleAnswerChange={handleAnswerChange}
                nextQuestion={nextQuestion}
                findDestination={findDestination}
            />}
            {index > 2 && <div className='main-box'>

                <div className='col flex-1 scroll'>
                    {places.map((place, index) => (
                        <button className={selectedItinerary && selectedItinerary?.location == place.destination ? 'place-card col selected' : 'place-card col'} key={index}
                            onClick={(event) => { findItinerary(event, index) }}
                        >
                            <h3><b>{place.destination}</b></h3>
                            <p>{place.description}</p>
                        </button>
                    ))}
                </div>
                <div className='col flex-2 scroll center-alligned'>
                    <h2>
                        {selectedItinerary?.location}
                    </h2>
                    <hr
                        style={{
                            width: '100%',
                        }}
                    />
                    {selectedItinerary?.itinerary?.map((routine, index) => (
                        <div className='each-day' key={index}>
                            <h2>{routine.day}</h2>
                            <hr
                                style={{
                                    width: '100%',
                                }}
                            />
                            {routine?.activities?.map((activity, idx) => (
                                <div className='activity' key={idx}>
                                    <h3>{activity?.activity}</h3>
                                    <h4>{activity?.time}</h4>
                                    <p>{activity?.description}</p>
                                    <hr
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </div>

                            ))}

                        </div>
                    ))}
                </div>
            </div>}
        </>
    )
}

export default Main