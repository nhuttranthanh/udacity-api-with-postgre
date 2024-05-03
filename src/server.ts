import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app: express.Application = express();
const address: string = "http://localhost:3007";

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.listen(3007, () => {
    console.log(`[server]: Server is running at ${address}`);
});
