enum AlertType {
    WARNING = "warn",
    SUCCESS = "success",
    ERROR = "error",
    INFORMATION = "info",
}

enum TitleType {
    MOVIE = 1,
    SHOW = 2
}

export { AlertType,TitleType }

export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Title {
    title_name: string;
    type: TitleType;
    display_url: string;
}

export interface TitleRow {
    row_name: string;
    titles: Title[];
}

export type Field = {
    name: string;
    label: string;
    type?: 'text' | 'email' | 'password' | 'textarea' | 'select';
    placeholder?: string;
    options?: { label: string; value: string }[];
};

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

export function noUser() {
  let user: User = {
    id: -1,
    name: 'Logged Out',
    email: 'none',
    avatarUrl: '/images/default_avatar.png'
  }
  return user;
}