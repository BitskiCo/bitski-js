export interface UserInfoResponse {
  sub: string;
  accounts?: string[];
  email?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  email_verified?: boolean;
}

export class User {

  public static fromJson(json: UserInfoResponse): User {
    return new User(json.sub, json.accounts, json.email, json.email_verified, json.phone_number, json.phone_number_verified);
  }

  public static fromString(s: string): User | undefined {
    let parsed;
    try {
      parsed = JSON.parse(s);
    } catch (e) {
      return;
    }
    if (parsed.id) {
      return new User(parsed.id, parsed.accounts, parsed.email, parsed.emailVerified, parsed.phoneNumber, parsed.phoneNumberVerified);
    }
    return;
  }

  public id: string;
  public accounts?: string[];
  public email?: string;
  public emailVerified?: boolean;
  public phoneNumber?: string;
  public phoneNumberVerified?: boolean;

  constructor(id: string, accounts?: string[], email?: string, emailVerified?: boolean, phone?: string, phoneNumberVerified?: boolean) {
    this.id = id;
    this.accounts = accounts;
    this.email = email;
    this.emailVerified = emailVerified;
    this.phoneNumber = phone;
    this.phoneNumberVerified = phoneNumberVerified;
  }

  public toStorageString() {
    return JSON.stringify({
      accounts: this.accounts,
      email: this.email,
      emailVerified: this.emailVerified,
      id: this.id,
      phoneNumber: this.phoneNumber,
      phoneNumberVerified: this.phoneNumberVerified,
    });
  }
}
