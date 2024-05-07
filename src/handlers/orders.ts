import express, { Request, Response } from "express";
import { OrderStore } from "../models/orders";

const store = new OrderStore();

const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id;
    const productId: string = _req.body.productId;
    const quantity: number = parseInt(_req.body.quantity);

    try {
        const addProduct = await store.addProduct(quantity, orderId, productId);
        res.json(addProduct);
    } catch (error) {
        res.status(400).json(error);
    }
};

const orderRoutes = (app: express.Application) => {
    // add product
    app.post("/orders/:id/products", addProduct);
};

export default orderRoutes;
