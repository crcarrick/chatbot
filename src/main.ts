import dotenv from 'dotenv'
import express from 'express'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config({ path: `.env.development` })

const app = express()

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }),
)

app.get('/', async (_, res) => {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'What is the meaning of the universe?',
      },
    ],
  })

  res.json(response.data)
})

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`),
)
