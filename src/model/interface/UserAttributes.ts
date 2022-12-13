
export interface UserAttributes {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    salt: string;
    address: string;
    otp?: number;
    otp_expiry?: Date;
    lng: number;
    lat: number;
    verified: boolean;
    role: string
    profileImage: string
    gender: string,
    date_birth: Date,
    // createdAt: Date,
    country?: string,
    lan: string,
    currency?: string,
    isAceptedPrivacy?: boolean,
    isAceptedTerms?: boolean,
    socials?:Array<String>
    
  }