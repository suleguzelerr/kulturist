// pages/api/events/index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Sadece GET isteği desteklenir.' });
  }

  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' }, // tarihe göre sırala
    });
    res.status(200).json(events);
  } catch (error) {
    console.error('Etkinlikleri alma hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
}
