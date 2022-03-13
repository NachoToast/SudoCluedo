export interface ClientToServerEvents {
    hereIsToken: (token: string) => void;
}

export interface ServerToClientEvents {
    giveMeToken: () => void;
}
