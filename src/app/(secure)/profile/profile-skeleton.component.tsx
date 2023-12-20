import type { FC } from 'react';

type ProfileSkeletonProps = {};

const ProfileSkeleton: FC<ProfileSkeletonProps> = ({}) => {
  return (
    <div className="animate-pulse flex flex-row items-center gap-3">
      <div className="rounded-full bg-slate-700 h-9 w-9"></div>
      <div className="bg-slate-700 rounded w-10 h-5"></div>
    </div>
  );
};

export { ProfileSkeleton };
