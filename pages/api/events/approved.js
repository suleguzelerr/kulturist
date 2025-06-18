// pages/api/events/approved.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Sadece GET isteklerine izin verilir.' });
  }

  try {
    const approvedEvents = await prisma.event.findMany({
      where: { status: 'approved' },
      orderBy: { date: 'asc' } // Tarihe göre sıralama
    });

    res.status(200).json(approvedEvents);
  } catch (error) {
    console.error('Etkinlik listeleme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
}
