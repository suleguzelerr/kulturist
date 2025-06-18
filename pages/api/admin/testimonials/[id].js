import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== "admin") {
    return res.status(401).json({ error: "Yetkisiz erişim" });
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      await prisma.testimonial.delete({
        where: { id: parseInt(id) },
      });

      res.status(200).json({ message: "Yorum başarıyla silindi" });
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ error: "Yorum silinirken hata oluştu" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 