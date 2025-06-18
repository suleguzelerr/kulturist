import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]'; // Session alabilmek için gerekli

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST isteği desteklenir.' });
  }

  // Sunucuda oturum kontrolü
  const session = await getServerSession(req, res, authOptions);
  console.log("🔥 SUNUCUDA GELEN SESSION:", session);

  if (!session || !session.user || !session.user.id) {
    return res.status(401).json({ error: 'Yetkisiz erişim. Giriş yapmalısınız.' });
  }

  const { title, description, date, location, image, category } = req.body;

  // Formda boş alan var mı kontrolü
  if (!title || !description || !date || !location) {
    return res.status(400).json({ error: 'Tüm alanlar zorunludur.' });
  }

  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date), // string değil Date olarak kaydedilmeli
        location,
        image,
        category,
        createdById: session.user.id, // Oturumdan gelen kullanıcı ID
        status: 'pending' // Varsayılan olarak "onay bekliyor"
      
      }
    });

    return res.status(200).json({ message: 'Etkinlik başarıyla eklendi.', event: newEvent });
  } catch (error) {
    console.error('🚨 Etkinlik ekleme hatası:', error);
    return res.status(500).json({ error: 'Sunucu hatası oluştu.' });
  }
}
