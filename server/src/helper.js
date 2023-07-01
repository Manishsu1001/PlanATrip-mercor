const { Configuration, OpenAIApi } = require('openai');

// Creating an instance of Open AI
const openAI = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY
}))


const askGPT = async ( question )=>{
    const response = await openAI.createChatCompletion(
        {
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: question,
            }]
        }
    )
    console.log(response.data);
    return response.data.choices[0].message.content;
}

module.exports = {
    askGPT
}