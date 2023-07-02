const { Configuration, OpenAIApi } = require('openai');


const askGPT = async (question) => {
    
    const openAI = new OpenAIApi(new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    }))
    const response = await openAI.createChatCompletion(
        {
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: question,
            }]
        }
    )
    return response.data.choices[0].message.content;
}

const getAdditionalInfo = (questions, answers) => {
    const additionalComments = answers.pop();
    const days = answers.pop();
    const location = answers.pop();
    let additionalQuestions = 3;
    while (additionalQuestions !== 0) {
        questions.pop();
        additionalQuestions--;
    }
    return {
        updatedQuestions: questions,
        updatedAnswers: answers,
        location,
        days,
        additionalComments
    }
}

module.exports = {
    askGPT,
    getAdditionalInfo
}