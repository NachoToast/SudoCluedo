/** Body of a POST request when user authorization is needed. */
export default interface UserRequestBody {
    /** JSON web token. */
    token: string;
    username: string;
}
