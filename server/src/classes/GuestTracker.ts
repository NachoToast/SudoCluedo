// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GuestUser } from '../../../shared/User';

/** Manages {@link GuestUser} accounts. */
export default class GuestTracker {
    private _timeoutMap: Record<string, NodeJS.Timeout> = {};

    /** Add a guest name to the tracker, scheduling cleanup in 1 hour. */
    public add(name: string): void {
        this._timeoutMap[name.toLowerCase()] = setTimeout(() => this.remove(name), 1000 * 60 * 60); // 1 hour
    }

    /** Refresh a guest session, delaying their cleanup for another hour.
     *
     * Will error if the name is untracked.
     */
    public refresh(name: string): void {
        clearTimeout(this._timeoutMap[name.toLowerCase()]);
        this.add(name);
    }

    /** Remove a guest session.
     *
     * Will error if the name is untracked.
     */
    public remove(name: string): void {
        clearTimeout(this._timeoutMap[name.toLowerCase()]);
        delete this._timeoutMap[name.toLowerCase()];
    }

    public has(name: string): boolean {
        return !!this._timeoutMap[name.toLowerCase()];
    }
}
