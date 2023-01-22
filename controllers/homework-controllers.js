// import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const askQuestion = async (req, res, next) => {
  console.log("ask question");

  // console.log(req);
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }
  const query = req.body.query;
  // if (query.trim().length === 0) {
  //   res.status(400).json({
  //     error: {
  //       message: "Please enter a valid query",
  //     }
  //   });
  //   return;
  // }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(query),
      temperature: 0.6,
      max_tokens: 4000
    });
    // console.log(completion.data);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }

}

function generatePrompt(query) {
  let prompt = query;
  return prompt
}



exports.askQuestion = askQuestion;
