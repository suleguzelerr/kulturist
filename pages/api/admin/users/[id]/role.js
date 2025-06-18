import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]";
import prisma from "../../../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ error: "Yetkisiz." });
  }

  const userId = parseInt(req.query.id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Geçersiz kullanıcı ID." });
  }

  if (req.method === "PUT") {
    const { role } = req.body;
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ error: "Geçersiz rol." });
    }
    // Admin kendi rolünü değiştiremez
    if (userId === session.user.id) {
      return res.status(400).json({ error: "Kendi rolünüzü değiştiremezsiniz." });
    }
    await prisma.user.update({ where: { id: userId }, data: { role } });
    return res.status(200).json({ message: "Rol güncellendi." });
  }

  return res.status(405).json({ error: "Yalnızca PUT destekleniyor." });
} 