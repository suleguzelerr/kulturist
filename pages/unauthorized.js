// pages/unauthorized.js
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4">
      <div className="card text-center">
        <div className="text-6xl mb-6">⛔</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Yetkisiz Erişim</h1>
        <p className="text-gray-600 mb-8">Bu sayfayı görmek için yetkiniz yok.</p>
        <Link href="/">
          <button className="btn-primary">Ana Sayfaya Dön</button>
        </Link>
      </div>
    </div>
  );
}
