import type { FC, PropsWithChildren } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { Profile, ProfileSkeleton } from '@/app/(secure)/profile';
import { Footer } from '@/app/footer.component';
import metaConfig from '@/meta-config.cjs';
import { LogoIcon } from '@/assets/logo.icon';

const SecureLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className={'w-full flex flex-col'}>
    <header className={'shadow sticky top-0 left-0 bg-background z-[200]'}>
      <div className={'container mx-auto px-2 py-2 basis-1 flex justify-between items-center'}>
        <Link href={'/'} className={'inline-flex items-center gap-2'}>
          <LogoIcon size={30} />
          <h1 className={'font-medium'}>{metaConfig.title}</h1>
        </Link>
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile />
        </Suspense>
      </div>
    </header>
    <main className={'min-h-[calc(100dvh)] bg-background basis-full relative'}>{children}</main>
    <Footer
      authorName={metaConfig.author.name}
      authorUrl={metaConfig.author.url}
      className={'bg-background basis-auto'}
    />
  </div>
);

export default SecureLayout;
