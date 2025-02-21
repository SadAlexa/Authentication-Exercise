import { Entity } from "src/core/entities/entity";

export interface UserProps {
    id?: number;
    name: string;
    surname: string;
  /*   birthdate: Date; */
    image: string;
    email: string;
    password: string;
    /* salt: string; */
}

export class User extends Entity<UserProps>{
  private id?: number;
  private name: string;
  private surname: string;
 /*  private birthdate: Date; */
  private image: string;
  private email: string;
  private password: string;
  /* private salt: string; */

  constructor(props: UserProps) {
    super(props);
    this.id = props.id;
    this.name = props.name;
    this.surname = props.surname;
    /* this.birthdate = props.birthdate; */
    this.image = props.image;
    this.email = props.email;
    this.password = props.password;
    /* this.salt = props.salt; */
  }

  getName(): string {
    return this.name;
  }

  getSurname(): string {
    return this.surname;
  }

  getEmail(): string {
    return this.email;
  }

/*   getBirthdate(): Date {
    return this.birthdate;
  }
 */
  getImage(): string {
    return this.image;
  }

  getPassword(): string {
    return this.password;
  }

 /*  getSalt(): string {
    return this.salt;
  } */

  checkEmail(email: string): boolean {
    return this.email === email;
  }

  checkPassword(password: string): boolean {
    return this.password === password;
  }

  setName(name: string): void {
    this.name = name;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }
}

