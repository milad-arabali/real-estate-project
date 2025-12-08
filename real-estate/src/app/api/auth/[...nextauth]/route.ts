import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDb from "@/utils/connect-db";
import User from "@/models/users";
import {comparePassword} from "@/utils/auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },

            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password)
                    throw new Error("Email and password are required!");

                await connectDb();
                const user = await User.findOne({email: credentials.email});

                if (!user) throw new Error("No user found with this email!");

                const isValid = await comparePassword(credentials.password, user.password);
                if (!isValid) throw new Error("Incorrect password!");

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],

    callbacks: {
        async signIn({user, account}) {
            try {
                if (account?.provider === "google") {
                    await connectDb();
                    const existingUser = await User.findOne({email: user.email});

                    if (!existingUser) {
                        const newUser = await User.create({
                            email: user.email,
                            name: user.name || "",
                            password: "",
                            family: "",
                        });

                        user.id = newUser._id.toString();
                    } else {
                        user.id = existingUser._id.toString();
                    }
                }

                return true;
            } catch (err) {
                console.error("❌ signIn ERROR:", err);
                return false;
            }
        },
        async jwt({token, user, account}) {
            if (user) {
                token.sub =
                    user.id ||
                    user._id ||
                    account?.providerAccountId ||
                    token.sub;
            }
            return token;
        },

        async session({session, token}: { session: any; token: any }) {
            if (session?.user) {
                if (typeof token.sub === "string" && token.sub.length > 0) {
                    session.user.id = token.sub;
                } else {
                    session.user.id = session.user.id ?? "";
                }
            }
            return session;
        },
    },

    session: {strategy: "jwt"},
    secret: process.env.SECRET_KEY,
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
