import type { FC, PropsWithChildren } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Profile } from '@/app/(secure)/profile';
import Logo from '@/app/icon.png';
import { Footer } from '@/app/footer.component';
import metaConfig from '@/meta-config.cjs';

const SecureLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className={'w-full flex flex-col'}>
    <header className={'shadow sticky top-0 left-0 bg-background'}>
      <div className={'container mx-auto px-2 py-2 basis-1 flex justify-between items-center'}>
        <Link href={'/'} className={'inline-flex items-center gap-2'}>
          <Image alt={'logo'} src={Logo} width={30} height={30} />
          <h1 className={'font-medium'}>{metaConfig.title}</h1>
        </Link>
        <Suspense fallback={<div>Profile loading...</div>}>
          <Profile />
        </Suspense>
      </div>
    </header>
    <main className={'min-h-[calc(100dvh)] bg-background basis-full'}>{children}</main>
    <Footer
      authorName={metaConfig.author.name}
      authorUrl={metaConfig.author.url}
      className={'bg-background basis-auto'}
    />
  </div>
);

export default SecureLayout;
