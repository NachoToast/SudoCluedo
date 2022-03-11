import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { BaseUser } from '../../../shared/User';
import Game from './Game';

/** A wrapper for a game. All games have a lobby but not all lobbies have games.
 *
 * A lobby can only have 1 game.
 */
export default class Lobby {
    public readonly code: string;
    public readonly createdBy: BaseUser;
    public readonly createdAt: number = Date.now();
    public game?: Game;

    public io: Server;

    public constructor(httpServer: HTTPServer, createdBy: BaseUser, code: string) {
        this.io = new Server(httpServer, { path: `/${code}` });
        this.code = code;
        this.createdBy = createdBy;
        console.log(`Lobby ${code} created by ${createdBy.name}`);
    }
}
