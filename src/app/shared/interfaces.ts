export interface IUser {
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export interface IFbAuthResponse {
  idToken: string,
  expiresIn: string
}
