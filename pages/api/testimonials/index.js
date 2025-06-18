import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Onaylanmış yorumları getir
      const testimonials = await prisma.testimonial.findMany({
        where: {
          approved: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 6, // En son 6 yorumu al
      });

      res.status(200).json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Yorumlar yüklenirken hata oluştu" });
    }
  } else if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      
      if (!session) {
        return res.status(401).json({ error: "Giriş yapmanız gerekiyor" });
      }

      const { content, rating, author, role } = req.body;

      if (!content || !author || !role) {
        return res.status(400).json({ error: "Tüm alanları doldurun" });
      }

      if (rating && (rating < 1 || rating > 5)) {
        return res.status(400).json({ error: "Puan 1-5 arasında olmalıdır" });
      }

      // Kullanıcı ID'sini al
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      const testimonial = await prisma.testimonial.create({
        data: {
          content,
          rating: rating || 5,
          author,
          role,
          userId: user.id,
          approved: false, // Admin onayı bekler
        },
      });

      res.status(201).json(testimonial);
    } catch (error) {
      console.error("Error creating testimonial:", error);
      res.status(500).json({ error: "Yorum eklenirken hata oluştu" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 