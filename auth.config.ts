import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  // nếu chưa xác thực, chuyển hướng đến trang đăng nhập
  pages: {
    signIn: "/login",
  },

  // xác thực người dùng
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // kiểm tra xem người dùng có đang ở trên trang dashboard không
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // chuyển huớng đến trang đăng nhập
      } else if (isLoggedIn) {
        // nếu người dùng đã đăng nhập, chuyển hướng đến trang dashboard
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // người dùng chưa đăng nhập => vẫn cho phép truy cập
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
