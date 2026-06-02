// General Auth props
export type AuthProps = {
  email: string;
  username: string;
  password: string;
};

export type LoginProps = Omit<AuthProps, "email">;
