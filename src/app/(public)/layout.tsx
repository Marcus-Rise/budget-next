import type { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Footer } from '@/app/footer.component';
import metaConfig from '@/meta-config.cjs';

const PublicLayout: FC<PropsWithChildren> = async ({ children }) => {
  const auth = cookies().get('Authorization');
  const userId = cookies().get('UserId');

  if (auth && userId) {
    return redirect('/');
  }

  return (
    <div className={'h-[calc(100dvh)] w-full flex flex-col'}>
      <header className={'bg-background basis-1/2 flex flex-col justify-center'}>
        <Link href="/">
          <h1 className={'font-bold text-center text-4xl'}>{metaConfig.title}</h1>
        </Link>
      </header>
      <main className={'bg-background basis-1/2'}>{children}</main>
      <Footer
        authorName={metaConfig.author.name}
        authorUrl={metaConfig.author.url}
        className={'bg-background basis-auto'}
      />
    </div>
  );
};

export default PublicLayout;
