import Client from "../database";

export type Order = {
    id?: string;
    quantity: number;
    order_id: string;
    product_id: string;
};

export class OrderStore {
    async addProduct(
        quantity: number,
        orderId: string,
        productId: string
    ): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const ordersql = "SELECT * FROM orders WHERE id=($1)";
            const result = await conn.query(ordersql, [orderId]);
            const order = result.rows[0];

            if (order.status !== "open") {
                throw new Error(
                    `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
                );
            }
        } catch (error) {
            throw new Error(`${error}`);
        }

        try {
            // @ts-ignore
            const conn = await Client.connect();

            const sql =
                "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [
                quantity,
                orderId,
                productId,
            ]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (error) {
            throw new Error(
                `Could not add product ${productId} to order ${orderId}: ${error}`
            );
        }
    }
}
