export class User {

  public static  fromFirebase({email, uid, name}: User){
    return new User(uid, name, email)
  }

  constructor(
    public uid: string,
    public name: string,
    public email: string
  ) {}

}
