const axios = require('axios');

const TutorController = {
  askQuestion: async (req, res) => {
    const { question } = req.body;
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: question,
          max_tokens: 150
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
          }
        }
      );

      const answer = response.data.choices[0].text;
      res.json({ answer });
    } catch (error) {
      res.status(500).json({ error: 'AI Tutor request failed' });
    }
  }
};

module.exports = TutorController;
