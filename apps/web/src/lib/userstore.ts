import { writable } from 'svelte/store';

// user data
export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  isAdmin: boolean;
}

export function testUser() {
  let user: User = {
    id: 0,
    name: 'Test User',
    email: 'example@gmail.com',
    isAdmin: true,
    avatarUrl: '/images/default_avatar.png'
  }
  return user;
}

// contact decentralized backend and check if email in list of admins 
function isAdmin(user: User) {

}

export class Session {
  user: User;
  token: string;
  startedAt?: Date;
  expiresAt?: Date;

  constructor(user: User, token: string, time: Date, maxDuration: number) {
    this.user = user;
    this.token = token;
    this.startedAt = time;
    this.expiresAt = new Date(this.startedAt.getTime() + (maxDuration*1000));
  }
}

// contact centralized login server and attempt to create an account 
export function createUser(username: string, email: string,password: string) {

}

// contact centralized login and expire token
export function endSession(session: Session) {

}

// contact centralized login server and if userdata, token, and time is provided, return a full session
export function requestSession(email: string,password: string) {

}