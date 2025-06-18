// pages/api/events/delete.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Yalnızca POST isteği desteklenir.' });

  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'Etkinlik ID gerekli.' });

  try {
    // Etkinliği bul (kimin oluşturduğunu öğrenmek için)
    const event = await prisma.event.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        createdById: true,
      },
    });

    if (!event) return res.status(404).json({ error: 'Etkinlik bulunamadı.' });

    // Etkinliği sil
    await prisma.event.delete({ where: { id } });

    // Bildirim oluştur
    await prisma.notification.create({
      data: {
        userId: event.createdById,
        message: `Etkinliğiniz (“${event.title}”) uygun görülmediği için silindi.`,
      },
    });

    res.status(200).json({ message: 'Etkinlik silindi ve bildirim gönderildi.' });
  } catch (error) {
    console.error('Silme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
}
