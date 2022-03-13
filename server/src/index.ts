import ServerHub from './classes/ServerHub';
import { config } from 'dotenv';

config();

export const serverHub = new ServerHub();
serverHub.start();
