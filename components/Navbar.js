import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (session) {
      fetch("/api/notifications")
        .then(res => res.json())
        .then(data => {
          const unread = data.filter(n => !n.read).length;
          setUnreadCount(unread);
        });
    }
  }, [session]);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            🏠 Ana Sayfa
          </Link>
          <Link href="/events" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            🎭 Etkinlikler
          </Link>
          <Link href="/notifications" className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative">
            🔔 Bildirimler
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <span className="text-gray-600">{session.user.email}</span>
              <button 
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Çıkış
              </button>
            </>
          ) : (
            <Link 
              href="/auth/login"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Giriş Yap
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
