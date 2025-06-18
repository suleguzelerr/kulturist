// pages/api/notifications/read.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Sadece POST isteği kabul edilir." });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Giriş yapmalısınız." });
  }

  const { id } = req.body;

  try {
    const updated = await prisma.notification.update({
      where: { id },
      data: { read: true },
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Güncelleme hatası", error });
  }
}
