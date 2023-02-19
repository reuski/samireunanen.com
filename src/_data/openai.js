const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  const openaiApiKey = process.env.OPEN_AI_API_KEY;
  const url = "https://api.openai.com/v1/completions";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: "First person introduction for Sami. Experienced, curious and pedantic UI developer. Loves video games, music, movies and books. Thinks owls are cool.",
      temperature: 0.5,
      max_tokens: 80,
    }),
  };

  try {
    const {
      choices: [{ text: intro }],
    } = await EleventyFetch(url, {
      duration: "1d",
      type: "json",
      fetchOptions: options,
    });

    return {
      intro,
    };
  } catch (e) {
    return {
      intro: "Hi! My name is Sami. I am a UI developer. For the past two decades, I have designed and built the web and I still do.",
    };
  }
};
