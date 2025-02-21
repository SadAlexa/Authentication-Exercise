export interface User {
    token?: string | null;
    name: string;
    surname: string;
    email: string;
    /* dateOfBirth: Date; */
    /* image: string; */
    password: string;
}