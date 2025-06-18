import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Giriş yapmalısınız." });
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: parseInt(session.user.id) }, // id'nin int olması gerekebilir
    orderBy: { createdAt: "desc" }
  });

  res.status(200).json(notifications);
}
