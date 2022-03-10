import express from 'express';
import Lobby from './Lobby';
import { createServer } from 'http';
import routes from '../routes';

/** Manages listing, creation, and deletion of lobbies. */
export default class ServerHub {
    public readonly app = express();

    private readonly _lobbies: Record<string, Lobby> = {};
    private readonly _httpServer = createServer(this.app);
    /** Whether the server is ready to start accepting lobby creation requests. */
    private _ready = false;

    public constructor(port: number) {
        this.app.use(express.json());
        this.app.use(routes);

        this._httpServer.listen(port, () => {
            const msg = `SudoCluedo server started on port ${port}`;
            console.log(msg);
            this._ready = true;
        });
    }

    public get numLobbies(): number {
        return Object.keys(this._lobbies).length;
    }
}
