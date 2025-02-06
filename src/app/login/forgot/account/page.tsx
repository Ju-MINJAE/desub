'use client';

import { useSearchParams } from 'next/navigation';
import { AccountFound } from '@/app/components/login/AccountFound';
import { AccountNotFound } from '@/app/components/login/AccountNotFound';

export default function AccountPage() {
  const searchParams = useSearchParams();
  const isFound = searchParams.get('found') === 'true';

  return <>{isFound ? <AccountFound /> : <AccountNotFound />}</>;
}
