// pages/api/events/[id].js
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        location: true,
        createdById: true, // ✅ Bu alanı özellikle dahil ettik
      }
    });

    if (!event) {
      return res.status(404).json({ message: "Etkinlik bulunamadı." });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
}
