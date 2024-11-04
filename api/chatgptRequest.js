import * as Sentry from '@sentry/node';
import axios from 'axios';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
});

Sentry.configureScope((scope) => {
  scope.setTag('type', 'backend');
  scope.setTag('projectId', process.env.VITE_PUBLIC_APP_ID);
});

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content.trim();
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error('Error fetching AI response:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}