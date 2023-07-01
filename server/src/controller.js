const { askGPT } = require('./helper');
const { NUMBER_OF_QUESTIONS, NUMBER_OF_PLACES } = require('./utils');



const healthCheck = (req, res) => {
    return res.status(200).json({ status: true, message: 'Working fine' });
};


const getQuestions = async (req, res) => {
    try {
        const questionChatGPT = `Provide me an array of ${NUMBER_OF_QUESTIONS} questions which can be asked to a person to know the best locations to visit based on his mood and interests`;

        const response = await askGPT(questionChatGPT);
        const questions = response.split('\n');

        return res.status(200).json({
            status: true,
            questions: questions
        })
    } catch (e) {
        return res.status(400).json({
            status: false,
            message: e.message
        })
    }
}

const getPlaces = async (req, res) => {
    try {
        const { questions, answers, location, days, additionalComments } = req.body;
        const questionChatGPT = 
            `For the below mentioned questions: 
            ${questions}
            These are the respective answers of the above questions:
            ${answers},
            Based on the above questions and answers, Provide me an array of ${NUMBER_OF_PLACES} destinations I can visit for ${days} days. I live in ${location}.
            ${additionalComments.length ? additionalComments : ''}
            `
        const response = await askGPT(questionChatGPT);

        return res.status(200).json({
            status: true,
            places: response
        })
    } catch (e) {
        return res.status(400).json({
            status: false,
            message: e.message
        })
    }
}




module.exports = {
    healthCheck,
    getQuestions,
    getPlaces,
}