import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]";
import prisma from "../../../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== "admin") {
    return res.status(401).json({ error: "Yetkisiz erişim" });
  }

  if (req.method === "PUT") {
    try {
      const { id } = req.query;

      const testimonial = await prisma.testimonial.update({
        where: { id: parseInt(id) },
        data: { approved: true },
      });

      res.status(200).json(testimonial);
    } catch (error) {
      console.error("Error approving testimonial:", error);
      res.status(500).json({ error: "Yorum onaylanırken hata oluştu" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 