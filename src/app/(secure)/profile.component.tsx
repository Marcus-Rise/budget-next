import type { FC } from 'react';
import { UserService } from '@/user/user.service';
import { configFactory } from '@/config';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import Placeholder from './image-placeholder.png';

const PHOTO_SIZE = 35;

const Profile: FC = async () => {
  const auth = cookies().get('Authorization')?.value!;
  const user = await new UserService(configFactory()).getCurrentUser(auth);

  return (
    <div className={'flex justify-between items-center gap-1'}>
      <Image
        alt={'user avatar'}
        src={user.avatar}
        height={PHOTO_SIZE}
        width={PHOTO_SIZE}
        className={'rounded-full object-cover border-2 border-gray-300'}
      />
      <Link
        prefetch={false}
        href="/api/account/logout"
        className="block text-gray-700 bloclassName-4 px-2 py-2 text-sm"
        role="menuitem"
        tabIndex={-1}
        id="menu-item-0"
      >
        Выйти
      </Link>
    </div>
  );
};

export { Profile };
