import Client from "../database";
import bcrypt from "bcrypt";

const saltRounds = process.env.SALT_ROUNDS as string;

export type User = {
    username: string;
    password: string;
};

export class UserStore {
    async create(u: User): Promise<User> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql =
                "INSERT INTO users (username, password_digest) VALUES ($1, $2) RETURNING *";

            const hash = bcrypt.hashSync(u.password, parseInt(saltRounds));
            const result = await conn.query(sql, [u.username, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (error) {
            throw new Error(`unable create user (${u.username}): ${error}`);
        }
    }

    async authenticate(
        usename: string,
        password: string
    ): Promise<User | null> {
        // @ts-ignore
        const conn = await Client.connect();
        const sql = "SELECT password_digest FROM users WHERE username=($1)";

        const result = await conn.query(sql, [usename]);

        if (result.rows.length) {
            const user = result.rows[0];

            if (bcrypt.compareSync(password, user.password_digest)) {
                return user;
            }
        }

        return null;
    }
}
