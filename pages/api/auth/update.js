import { getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Yalnızca POST isteği desteklenir." });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Yetkisiz." });
  }

  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "E-posta zorunludur." });
  }

  try {
    const updateData = { email };
    if (password && password.length >= 6) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
    });
    return res.status(200).json({ message: "Kullanıcı güncellendi." });
  } catch (err) {
    return res.status(500).json({ error: "Güncelleme sırasında hata oluştu." });
  }
} 