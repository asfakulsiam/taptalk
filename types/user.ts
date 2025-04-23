export interface UserBase {
  name: string;
  email: string;
  username: string;
  profileImageUrl: string;
}

export interface UserDocument extends UserBase {
  clerkUserId: string;
  createdAt: Date;
  updatedAt: Date;
}
