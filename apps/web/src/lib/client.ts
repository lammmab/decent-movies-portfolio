import {Session,Backend} from './constants.ts';

export enum API {
    FETCH = "fetch",
    AUTH = "auth",
    PING = "ping",
    ERROR = "error",
}

class Client {
    session: Session | null = null;
    backends: Backend[] = [];

    constructor(backends?: Backend[]) {
        if (backends) {
            this.backends = backends;
        }
    }

    async post(address: string, api: API, data: Record<string,any>, token?: string) {
        try {
            const response = await fetch(`${address}/api/${api}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({}));
                throw new Error(`HTTP ${response.status}: ${JSON.stringify(errorBody)}`);
            }

            return response.json();
        } catch (err) {
            console.error(`Request failed: ${err}`)
        }
    }

    async authenticate_backend(url: string, password: string) {
        const response = await this.post(url,API.AUTH,{password: password});
        if (response.session) {
            const backend: Backend = {address: url, token: response.session};
            this.backends.push(backend);
        }
    }

    async set_session(session: Session) {
        this.session = session;
    }
}

let client: Client | null = null;

export function getClient(): Client {
    if (!client) {
        client = new Client();
    }
    return client;
}