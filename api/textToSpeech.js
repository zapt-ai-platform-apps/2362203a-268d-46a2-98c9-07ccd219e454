import * as Sentry from "@sentry/node";
import { createEvent } from '../src/supabaseClient';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.PROJECT_ID,
    },
  },
});

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const { text } = req.body;
    const result = await createEvent('text_to_speech', { text });
    res.status(200).json({ audioUrl: result });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Error processing text to speech' });
  }
}