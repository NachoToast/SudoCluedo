# SudoCludeo Server Docs

This is documentation for the [server](../../server/) portion of SudoCluedo.

## Endpoints

I _might_ get round to using OpenAPI to make a cool YAML file for this, but for now heres a markdown table.

Base URL: `http://localhost:3001`

<table>
    <tr>
        <th>Method</th>
        <th>Endpoint</th>
        <th>Description</th>
        <th>Response Code</th>
        <th>Example Response</th>
    <tr>
    <tr>
        <td>GET</td>
        <td>/</td>
        <td>Use to check if the server is up.</td>
        <td>200</td>
        <td>n/a</td>
    </tr>
        <tr>
        <td>GET</td>
        <td>/numLobbies</td>
        <td>Check number of lobbies currently ongoing.</td>
        <td>200</td>
        <td>

```json
{ "numGames": 2 }
```

</td>
    </tr>
</table>

## Login/Registering System

Both signup and login should (on success) give the client a JWT made out of the server secret and the client's username, which they can then store and give on socket connections and elevated actions.

1. Client requests signup or login using a POST request to the `/signup` or `/login` endpoint respectively, with user details in the request body.

2. Server checks user details. Responds with `200` (and JWT) on success or:
    - `401` (unauthorized) if details are invalid on login.
    - `400` (bad request) if details are invalid on signup.

## Socket Connection System

Users _must_ be given a JWT (made out of their username) before joining a lobby (or entering server hub chat), this is done like so:

1. Check if JWT in local storage, if it is then skip all remaining steps.
2. On lobby enter, ask to **give username**, **log in**, or **sign up** before actually attempting to join lobby.
3. If **give username** is chosen, make a POST request to `/quicksignup`
