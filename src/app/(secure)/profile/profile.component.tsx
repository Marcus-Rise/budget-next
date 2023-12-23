import type { FC } from 'react';
import Link from 'next/link';
import { ProfileImage } from '@/app/(secure)/profile/profile-image.component';
import { userService } from '@/user/user.service';

const PHOTO_SIZE = 35;

const Profile: FC = async () => {
  const user = await userService.getCurrentUser();

  return (
    <div className={'flex justify-between items-center gap-2'}>
      <ProfileImage
        alt={'user avatar'}
        src={user.avatar}
        height={PHOTO_SIZE}
        width={PHOTO_SIZE}
        className={'rounded-full object-cover border-2 border-gray-300'}
      />
      <Link
        prefetch={false}
        href="/api/account/logout"
        className="block py-2 text-sm"
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
