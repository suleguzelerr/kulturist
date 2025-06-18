import { useRouter } from 'next/router'
import withAuth from '../lib/withAuth'
import Link from 'next/link'
import { useState, useEffect } from 'react'

function Profile() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // localStorage sadece client-side'da çalışır
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      setLoading(false)
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
    }
    router.push('/auth/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👤</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Profil Sayfası</h1>
            <p className="text-gray-600">Hesap bilgilerinizi görüntüleyin</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta Adresi
                  </label>
                  <p className="text-gray-800 font-medium">{user?.email || 'Yükleniyor...'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hesap Rolü
                  </label>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user?.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    user?.role === 'user' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user?.role === 'admin' ? '👑 Admin' :
                     user?.role === 'user' ? '👤 Kullanıcı' : 'Bilinmiyor'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleLogout}
                className="btn-danger flex-1"
              >
                🚪 Çıkış Yap
              </button>
              <Link href="/" className="flex-1">
                <button className="w-full btn-secondary">
                  🏠 Ana Sayfaya Dön
                </button>
              </Link>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Hesap Bilgileri</h3>
              <p className="text-blue-700 text-sm">
                Hesabınızla ilgili tüm bilgiler güvenli bir şekilde saklanmaktadır. 
                Herhangi bir değişiklik için lütfen sistem yöneticisi ile iletişime geçin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(Profile)
