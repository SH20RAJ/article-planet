// pages/edit.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push('/index.html');
  }, []);

  return null; // This component doesn't render anything, it only performs the redirection
}
