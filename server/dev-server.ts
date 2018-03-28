import { Server } from "boardgame.io/server";
import CrystalHunt from "../src/Game";

const server = Server({ games: [CrystalHunt] });
server.run(7000);
