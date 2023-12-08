type User = {
  name: string;
  avatar: string;
};

type UserGetResponseDto = {
  response: Array<{
    id: number;
    photo: string;
    first_name: string;
  }>;
};

export type { User, UserGetResponseDto };
