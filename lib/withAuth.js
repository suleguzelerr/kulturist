import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuth(Component) {
  return function ProtectedComponent(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return;
      if (!session) {
        router.replace('/auth/login');
      }
    }, [session, status, router]);

    if (status === 'loading' || !session) {
      return null;
    }

    return <Component {...props} />;
  };
}
