export interface ClientToServerEvents {
    connectAction: (action: 'login' | 'signup') => void;
}

export interface ServerToClientEvents {
    ligmaBalls: () => void;
}
