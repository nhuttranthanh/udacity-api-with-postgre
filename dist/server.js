"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mythical_weapons_1 = __importDefault(require("./handlers/mythical_weapons"));
const app = (0, express_1.default)();
const address = "http://localhost:3007";
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
(0, mythical_weapons_1.default)(app);
app.listen(3007, () => {
    console.log(`[server]: Server is running at ${address}`);
});
