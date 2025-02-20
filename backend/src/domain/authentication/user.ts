import { Entity } from "src/core/entities/entity";

export interface UserProps {
    id: string;
    name: string;
    surname: string;
    birthdate: Date;
    image: string;
    email: string;
    password: string;
    /* salt: string; */
}

export class User extends Entity<UserProps>{
  private id: string;
  private name: string;
  private surname: string;
  private birthdate: Date;
  private image: string;
  private email: string;
  private password: string;
  /* private salt: string; */

  constructor(props: UserProps) {
    super(props);
  }

  getId(): string {
    return this.id;
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

  getBirthdate(): Date {
    return this.birthdate;
  }

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

