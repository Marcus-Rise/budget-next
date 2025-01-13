import type { FC } from 'react';
import Link from 'next/link';
import { UserProfileImage } from '@/user/components/profile/user-profile-image.component';
import { userService } from '@/user/service';

const PHOTO_SIZE = 35;

const UserProfile: FC = async () => {
  const user = await userService.getCurrentUser();

  return (
    <div className={'flex justify-between items-center gap-2'}>
      <UserProfileImage
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

export { UserProfile };
