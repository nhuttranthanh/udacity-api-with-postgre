import express, { Request, Response } from "express";
import { DashboardQueries } from "../services/dashboard";

const store = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
    const products = await store.productsInOrders();
    res.json(products);
};

const usersWithOrders = async (_req: Request, res: Response) => {
    const users = await store.usersWithOrders();
    res.json(users);
};

const fiveMostExpensive = async (_req: Request, res: Response) => {
    const users = await store.fiveMostExpensive();
    res.json(users);
};

const dashboardRoutes = (app: express.Application) => {
    app.get("/products_in_orders", productsInOrders);
    app.get("/users-with-orders", usersWithOrders);
    app.get("/five-most-expensive", fiveMostExpensive);
};

export default dashboardRoutes;
