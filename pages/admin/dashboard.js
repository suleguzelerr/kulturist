import { useSession } from 'next-auth/react'
import withRole from '../../lib/withRole'
import Link from 'next/link'

function AdminDashboard() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
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
      <div className="max-w-6xl mx-auto">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">👑 Admin Paneli</h1>
            <p className="text-gray-600">Hoş geldin, {session?.user?.email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Etkinlik Onayları</h3>
              <p className="text-green-600 text-sm">Bekleyen etkinlikleri onaylayın</p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Kullanıcı Yönetimi</h3>
              <p className="text-purple-600 text-sm">Kullanıcıları yönetin</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/admin/events">
              <button className="btn-primary">
                🎭 Etkinlikleri Yönet
              </button>
            </Link>
            <Link href="/admin/users">
              <button className="btn-primary">
                👥 Kullanıcıları Yönet
              </button>
            </Link>
            <Link href="/">
              <button className="btn-secondary">
                🏠 Ana Sayfaya Dön
              </button>
            </Link>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Not:</strong> Bu sayfa sadece admin yetkisine sahip kullanıcılara görünür.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRole(AdminDashboard, ['admin'])
