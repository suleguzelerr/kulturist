import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Sadece GET isteği desteklenir." });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { eventId: parseInt(id) },
      include: {
        sender: true,
        receiver: true,
      },
      orderBy: { createdAt: "asc" },
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Mesajlar çekilemedi:", error);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
}
