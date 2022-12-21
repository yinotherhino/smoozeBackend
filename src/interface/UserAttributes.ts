export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  salt: string;
  address?: string;
  otp?: string;
  otp_expiry?: Date;
  lng?: number;
  lat?: number;
  verified?: boolean;
  role?: string;
  profileImage?: string;
  gender?: string;
  date_birth?: Date;
  googleId?: string;
  country?: string;
  lan?: string;
  currency?: string;
  isAceptedPrivacy?: boolean;
  isAceptedTerms?: boolean;
  socials?: Array<String>;
}
