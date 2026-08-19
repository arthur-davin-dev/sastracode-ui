// import NextAuth from "next-auth";
// import Keycloak from "next-auth/providers/keycloak";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     Keycloak({
//       clientId: process.env.AUTH_KEYCLOAK_ID!,
//       clientSecret: process.env.AUTH_KEYCLOAK_SECRET!,
//       issuer: process.env.AUTH_KEYCLOAK_ISSUER!,
//     }),
//   ],

//   secret: process.env.AUTH_SECRET,
//   trustHost: true,

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt({ token, account, profile }) {
//       if (account) {
//         token.accessToken = account.access_token;
//         token.refreshToken = account.refresh_token;
//         token.idToken = account.id_token;
//       }

//       if (profile) {
//         const keycloakProfile = profile as {
//           name?: string;
//           preferred_username?: string;
//           email?: string;
//         };

//         token.name =
//           keycloakProfile.name ??
//           keycloakProfile.preferred_username ??
//           token.name;

//         token.email = keycloakProfile.email ?? token.email;
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       session.accessToken =
//         typeof token.accessToken === "string" ? token.accessToken : undefined;

//       if (session.user) {
//         session.user.name =
//           typeof token.name === "string" ? token.name : "User";

//         session.user.email = typeof token.email === "string" ? token.email : "";
//       }

//       return session;
//     },
//   },
// });
