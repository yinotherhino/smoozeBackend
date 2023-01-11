export interface UserPayload {
  id: string;
  email: string;
  verified?: boolean;
  isLoggedIn: boolean;
  role?: String;
  is_premium?: boolean;
}
