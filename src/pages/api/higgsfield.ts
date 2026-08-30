// API route para geração de imagens via Higgsfield
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, width, height } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // Placeholder: integração com Higgsfield AI
  res.status(200).json({
    success: true,
    imageUrl: `https://higgsfield.ai/api/generate?prompt=${encodeURIComponent(prompt)}&w=${width || 512}&h=${height || 512}`,
    prompt,
    width: width || 512,
    height: height || 512,
  });
}
