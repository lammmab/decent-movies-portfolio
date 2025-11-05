import {User,Session} from './constants.ts';

// contact decentralized backend and check if email in list of admins 
function isAdmin(user: User) {

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