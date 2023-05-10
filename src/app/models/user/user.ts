// not including password details

export class User {

  public userId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public mobile: string;
  public role : string;
  public status: string;
}

export interface UserResponse {
  success: boolean;
  message?: string;
  data: User[];
}

export class UserDetails {

  public userId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public mobile: string;
  public role : string;
  public status: string;

  public addressId: number;
  public address: string;
  public city: string;
  public state: string;
  public country: string;
  public postalCode: string;

  public companyId: number;
  public companyName: string;
  public companyAccount: string;
  public companyBank: string;
  public bankIFSC: string;
}

export interface UserDetailsResponse {
  success: boolean;
  message?: string;
  data: UserDetails[];
}
