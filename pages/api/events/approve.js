// pages/api/events/approve.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Yalnızca POST isteği desteklenir.' });

  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'Etkinlik ID gerekli.' });

  try {
    const updated = await prisma.event.update({
      where: { id },
      data: { status: 'approved' },
      include: { createdBy: true }, // Kullanıcı bilgisine ulaşabilmek için
    });

    // Bildirim oluştur
    await prisma.notification.create({
      data: {
        userId: updated.createdById,
        message: `"${updated.title}" adlı etkinliğiniz onaylandı.`,
      },
    });

    res.status(200).json({ message: 'Etkinlik onaylandı ve bildirim gönderildi.', event: updated });
  } catch (error) {
    console.error('Onay hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
}
