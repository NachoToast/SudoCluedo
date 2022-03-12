import express from 'express';
import Lobby from './Lobby';
import { createServer } from 'http';
import routes from '../routes';
import { BaseUser } from '../../../shared/User';
import { promisify } from 'util';

const wait = promisify(setTimeout);

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
            console.log(`SudoCluedo server started on port ${port}`);
            this._ready = true;
        });
    }

    public get numLobbies(): number {
        return Object.keys(this._lobbies).length;
    }

    private static _alphabet = 'abcdefghijklmnopqrstuvwxyz';
    /** Makes a random lobby code.
     *
     * Collisions are possible.
     * */
    private static makeRandomLobbyCode(): string {
        const codeLength = 3 + Math.floor(Math.random() * 3); // 3 to 5 (inclusive)
        let code = '';
        for (let i = 0; i < codeLength; i++) {
            const index = Math.floor(Math.random() * 26); // 0 to 26 (exclusive)
            code += this._alphabet[index];
        }
        return code;
    }

    /** Attempts to create a lobby.
     *
     * @param {BaseUser} user - The user that invoked lobby creation. Does not have to be a full user.
     *
     * @throws Throws an error if the server is unable to be ready in time.
     */
    public async createLobby(user: BaseUser): Promise<void> {
        let waitAttempts = 0;
        while (!this._ready && waitAttempts < 10) {
            waitAttempts++;
            await wait(100);
        }
        if (!this._ready) throw new Error('Server not ready');

        let lobbyCode = ServerHub.makeRandomLobbyCode();
        let rerollAttempts = 0;
        while (this._lobbies[lobbyCode] !== undefined) {
            lobbyCode = ServerHub.makeRandomLobbyCode();
            rerollAttempts++;
            if (rerollAttempts > 10) throw new Error('Too many lobby code collisions');
        }

        this._lobbies[lobbyCode] = new Lobby(this._httpServer, user, lobbyCode);
    }
}
