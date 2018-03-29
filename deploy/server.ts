import * as path from "path";
import KoaStatic from "koa-static";
import { Server } from "boardgame.io/server";
import CrystalHunt from "../src/Game";

const server = Server({ games: [CrystalHunt] });
const buildPath = path.join(__dirname, ".");
server.app.use(KoaStatic(buildPath));
server.run(8080);
