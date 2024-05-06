import express, { Request, Response } from "express";
import { User, UserStore } from "../models/users";
import jwt from "jsonwebtoken";

const store = new UserStore();

const create = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    };

    try {
        const newUser = await store.create(user);
        var token = jwt.sign(
            { user: newUser },
            process.env.TOKEN_SECRET as string
        );
        res.json(token);
    } catch (error) {
        res.status(400).json(error);
    }
};

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    };

    try {
        const u = await store.authenticate(user.username, user.password);
        var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
        res.json(token);
    } catch (error) {
        res.status(401).json(error);
    }
};
