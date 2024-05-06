"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mythical_weapon_1 = require("../models/mythical_weapon");
const store = new mythical_weapon_1.MythicalWeaponStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const weapons = yield store.index();
    res.json(weapons);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const weapon = yield store.show(req.params.id);
    res.json(weapon);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weapon = {
            name: req.body.name,
            type: req.body.type,
            weight: req.body.weight,
        };
        const newWeapon = yield store.create(weapon);
        res.json(newWeapon);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield store.delete(req.params.id);
    res.json(deleted);
});
const mythical_weapon_routes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", create);
    app.delete("/products/:id", destroy);
};
exports.default = mythical_weapon_routes;
