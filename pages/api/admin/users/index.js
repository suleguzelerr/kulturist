import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ error: "Yetkisiz." });
  }

  if (req.method === "GET") {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, role: true },
      orderBy: { id: "asc" },
    });
    // isSelf alanı ekle
    const usersWithSelf = users.map(u => ({ ...u, isSelf: u.id === session.user.id }));
    return res.status(200).json(usersWithSelf);
  }

  // POST ile yeni kullanıcı ekleme opsiyonel, şimdilik sadece GET
  return res.status(405).json({ error: "Yalnızca GET destekleniyor." });
} 