require('dotenv').config();
const express = require('express');
const { GPT } = require('@openai/gpt-3.5');

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.OPENAI_API_KEY;

const gpt = new GPT({
  apiKey,
  engine: 'davinci', // Используйте модель Davinci для лучших результатов
  timeout: 60 * 1000, // Таймаут запроса (в миллисекундах)
});

app.use(express.json());

app.post('/ask', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await gpt.send({
      prompt: message,
      maxTokens: 100, // Максимальное количество токенов в ответе
      temperature: 0.7, // Параметр температуры для генерации ответа
    });

    res.json({ response: response.choices[0].text.trim() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
