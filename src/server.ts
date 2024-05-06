import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import mythical_weapons_routes from "./handlers/mythical_weapons";

const app: express.Application = express();
const address: string = "http://localhost:3000";

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

mythical_weapons_routes(app);

app.listen(3000, () => {
    console.log(`[server]: Server is running at ${address}`);
});
