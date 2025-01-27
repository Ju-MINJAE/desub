'use client';
import { AccountFound } from '@/app/components/login/AccountFound';
import { AccountNotFound } from '@/app/components/login/AccountNotFound';

type AccountResultProps = {
  isFound?: boolean;
};

const Account = ({ isFound }: AccountResultProps) => {
  console.log(isFound);
  return <>{isFound ? <AccountFound /> : <AccountNotFound />}</>;
};

export default Account;
