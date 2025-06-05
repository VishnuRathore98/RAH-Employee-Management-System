import { AuthProvider } from "@/app/context/AuthContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthProvider>
          {/* <ThemeProvider theme={theme} > */}
            <CssBaseline />
            {children}
          {/* </ThemeProvider> */}
        </AuthProvider>
      </body>
    </html>
  );
}
