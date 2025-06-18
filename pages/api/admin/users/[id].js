import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ error: "Yetkisiz." });
  }

  const userId = parseInt(req.query.id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Geçersiz kullanıcı ID." });
  }

  if (req.method === "DELETE") {
    // Admin kullanıcı silinemez
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı." });
    if (user.role === "admin") {
      return res.status(400).json({ error: "Admin kullanıcı silinemez." });
    }
    await prisma.user.delete({ where: { id: userId } });
    return res.status(200).json({ message: "Kullanıcı silindi." });
  }

  return res.status(405).json({ error: "Yalnızca DELETE destekleniyor." });
} 