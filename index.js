const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = 'YOUR_OPENROUTER_API_KEY'; // yahan apni key daalna

app.post('/ask', async (req, res) => {
  const { question } = req.body;

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "mistralai/mistral-7b-instruct",
      messages: [{ role: "user", content: question }]
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const answer = response.data.choices[0].message.content;
    res.json({ answer });

  } catch (err) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

app.listen(10000, () => console.log("Server running on 10000"));
