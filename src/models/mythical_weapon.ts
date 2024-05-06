import Client from "../database";

export type Weapon = {
    id: Number;
    name: string;
    type: string;
    weight: number;
};

export class MythicalWeaponStore {
    async index(): Promise<Weapon[]> {
        try {
            const conn = await Client.connect();
            console.log("conn:", conn);
            const sql = "SELECT * FROM mythical_weapons";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get weapons ${error}`);
        }
    }

    async show(id: string): Promise<Weapon> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = "SELECT * FROM mythical_weapons WHERE id=($1)";
            const result = await conn.query(sql, [id]);
            conn.release;
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find weapon ${id}. Error: ${error}`);
        }
    }

    async create(w: Partial<Weapon>): Promise<Weapon> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql =
                "INSERT INTO mythical_weapons(name, type, weight) VALUES($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [w.name, w.type, w.weight]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Could not add new mythical_weapons. Error: ${error}`
            );
        }
    }

    async delete(id: string): Promise<Weapon> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = "DELETE FROM mythical_weapons WHERE id=($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Could not delete mythical_weapon ${id}. Error: ${error}`
            );
        }
    }
}
