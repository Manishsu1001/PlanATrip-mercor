const { askGPT, getAdditionalInfo } = require('./helper');
const { NUMBER_OF_QUESTIONS, NUMBER_OF_PLACES } = require('./utils');



const healthCheck = (req, res) => {
    return res.status(200).json({ status: true, message: 'Working fine' });
};


const getQuestions = async (req, res) => {
    try {
        const questionChatGPT = `Provide me an array of ${NUMBER_OF_QUESTIONS} questions which can be asked to a person to know the best locations to visit based on his mood and interests`;

        const response = await askGPT(questionChatGPT);
        let questions = response.split('\n');
        questions = questions.filter(question => question.includes('?'));
        questions.push(`${questions.length + 1}. What is your current Location?`);
        questions.push(`${questions.length + 1}. How long can the trip be?`);
        questions.push(`${questions.length + 1}. Any other additional comments to keep in mind while searching for places?`);
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
        const { questions, answers } = req.body;
        const {updatedQuestions,updatedAnswers, days, location, additionalComments} = getAdditionalInfo(questions,answers);
        const questionChatGPT =
            `For the below mentioned questions: 
            ${updatedQuestions}
            These are the respective answers of the above questions:
            ${updatedAnswers},
            Based on the above questions and answers, Provide me an array of ${NUMBER_OF_PLACES} destinations I can visit for ${days} days with keys as 'destination' and 'description'. I live in ${location}.
            ${additionalComments}
            `
        const response = await askGPT(questionChatGPT);
        let structuredResponse = await askGPT(`${response}\n  create the above text in form of an array of objects`);
        const startIndex = structuredResponse.indexOf("[");
        const endIndex = structuredResponse.indexOf("]"); 
        structuredResponse = structuredResponse.slice(startIndex,endIndex+1);
        console.log(structuredResponse);
        const places = JSON.parse(structuredResponse);

        return res.status(200).json({
            status: true,
            places: places
        })
    } catch (e) {
        return res.status(400).json({
            status: false,
            message: e.message
        })
    }
}


const createItinerary = async (req, res) => {
    try {
        const {questions, answers, place } = req.body;
        const {updatedQuestions,updatedAnswers,days,additionalComments} = getAdditionalInfo(questions,answers);
        let answer_string = "";
        answers.forEach(answer => answer_string += answer + '\n');
        questionChatGPT = `
            Create an itinerary for me to travel ${place} for ${days} days based on the below statements:
            ${answer_string}\n
            ${additionalComments}\n\n.
            Describe the activities in 100-200 words.
        `
        const response = await askGPT(questionChatGPT);
        
        let structuredResponse = await askGPT(`
        ${response}\n
        Convert the above text in the form of array of objects in the following format:
        [{
            "day",
            "activities": [
                {
                    "time",
                    "activity",
                    "description": (this should be minimum of 150 words)
                }
            ] 
        }]
        
        `);
        const startIndex = structuredResponse.indexOf("[");
        const endIndex = structuredResponse.lastIndexOf("]"); 
        structuredResponse = structuredResponse.slice(startIndex,endIndex+1);
        const itinerary = JSON.parse(structuredResponse);

        return res.status(200).json({
            status: true,
            itinerary: itinerary
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
    createItinerary
}