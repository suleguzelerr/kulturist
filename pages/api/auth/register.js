import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body

  // Kullanıcı zaten var mı kontrol et
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return res.status(400).json({ error: 'Bu e-posta zaten kayıtlı.' })
  }

  // Şifreyi hash'le
  const hashedPassword = await bcrypt.hash(password, 10)

  // Yeni kullanıcı oluştur
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  })

  res.status(201).json({ message: 'Kayıt başarılı', user: newUser })
}
