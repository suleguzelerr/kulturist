// pages/api/messages/send.js
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST isteği desteklenir.' });
  }

  const session = await getServerSession(req, res, authOptions);
  const userId = parseInt(session?.user?.id);

  if (!userId) {
    return res.status(401).json({ error: 'Giriş yapmalısınız.' });
  }

  const { content, eventId, receiverId, parentMessageId } = req.body;

  if (!content || !eventId || !receiverId) {
    return res.status(400).json({ error: 'İçerik, etkinlik ID ve alıcı ID zorunludur.' });
  }

  try {
    // Mesajı kaydet (cevap varsa ona göre kaydeder)
    const message = await prisma.message.create({
      data: {
        content,
        eventId,
        senderId: userId,
        receiverId,
        parentMessageId: parentMessageId || null,
      },
    });

    // Bildirim oluştur
    await prisma.notification.create({
      data: {
        userId: receiverId,
        message: `Etkinlik hakkında bir mesaj aldınız: "${content.slice(0, 50)}..."`,
        type: "message",
        eventId: eventId,
      },
    });

    return res.status(200).json({ message: 'Mesaj gönderildi.', data: message });
  } catch (error) {
    console.error('❌ Mesaj gönderme hatası:', error);
    return res.status(500).json({ error: 'Sunucu hatası' });
  }
}
