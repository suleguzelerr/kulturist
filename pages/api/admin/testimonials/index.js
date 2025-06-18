import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== "admin") {
    return res.status(401).json({ error: "Yetkisiz erişim" });
  }

  if (req.method === "GET") {
    try {
      const testimonials = await prisma.testimonial.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      });

      res.status(200).json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Yorumlar yüklenirken hata oluştu" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 