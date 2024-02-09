// pages/new.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function New() {
  const router = useRouter();

  useEffect(() => {
    router.push('/new/index.html');
  }, []);

  return null; // This component doesn't render anything, it only performs the redirection
}
