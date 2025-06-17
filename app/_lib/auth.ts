import NextAuth, { User } from "next-auth";
import Google from "next-auth/providers/google";
import { addUser, getUser } from "./neondb/neonActions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      try {
        if (!user.name || !user.email) return false;

        // Check if user already exists
        const existingUser = await getUser(user.email);

        if (!existingUser) {
          await addUser({ name: user.name, email: user.email });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
});
