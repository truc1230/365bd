export interface TypeLoginPayload {
  email: string;
  password: string;
}
export type TypeUser = any
export interface TypeResLoginPayload {
  token: tring;
  user: TypeUser;
}
