import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        _id?: string;
        id?: string;
        family?: string;
    }

    interface Session extends DefaultSession {
        user: {
            id: string;
            family?: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        sub?: string;
    }
}
