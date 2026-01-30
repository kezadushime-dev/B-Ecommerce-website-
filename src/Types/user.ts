export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  profileImage?: string | null;
  phoneNumber?: string | null;
  resetPasswordExpires?: string | null;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
