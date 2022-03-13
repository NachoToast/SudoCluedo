import { serverHub } from '..';
import Lobby from '../classes/Lobby';
import httpClient from '../tests/httpClient';

describe('GET /numLobbies', () => {
    it('should return number of lobbies', async () => {
        const { data: data0 } = await httpClient.get('/numLobbies');
        expect(data0).toBe(0);

        serverHub['_lobbies']['fakeLobbyA'] = {} as Lobby;

        const { data: data1 } = await httpClient.get('/numLobbies');
        expect(data1).toBe(1);

        serverHub['_lobbies']['fakeLobbyB'] = {} as Lobby;
        serverHub['_lobbies']['fakeLobbyC'] = {} as Lobby;
        serverHub['_lobbies']['fakeLobbyD'] = {} as Lobby;

        const { data: data2 } = await httpClient.get('/numLobbies');
        expect(data2).toBe(4);

        serverHub['_httpServer'].close();
    });
});
