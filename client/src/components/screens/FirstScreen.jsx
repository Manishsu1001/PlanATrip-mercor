import React from 'react'

function FirstScreen(props) {
    const { index, questions, answer, handleAnswerChange, nextQuestion, findDestination, getStarted, questionIndex } = props;
    return (
        <>
            {index == 1 ? <div className="home">
                <div className="text main-page">
                    We are here to plan a trip for you! <br />
                    with
                    <h1>PlanATrip</h1>
                    <button className='start-btn btn' onClick={getStarted}>Get Started</button>
                </div>
            </div> : <></>}
            {index == 2 ? <div className="home">
                <div className="text que-text">
                    {questions[questionIndex]}
                </div>
                <div className="w-100">
                    <input value={answer} onChange={handleAnswerChange} required = {questions.length - 1 !== questionIndex} placeholder='Your Answer here' />
                </div>
                <div>
                    <button className='btn' onClick={questions.length - 1 === questionIndex ? findDestination : nextQuestion}> {questions.length - 1 === questionIndex ? 'Find Destination' : 'Next Question'} </button>
                </div>
            </div> : <></>
            }
        </>
    )
}

export default FirstScreen