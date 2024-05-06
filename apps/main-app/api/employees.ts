import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
  }
  if (req.method === 'POST') {
  }
  if (req.method === 'PUT') {
  }
  if (req.method === 'DELETE') {
  }

  res.status(200).json({ message: 'Hello from Next.js' });
}
