import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/day-night-toggle";
import { NavigationMenuComponent } from "@/components/Navigation-Menu";
import Logo from "@/components/Logo-Toggle";

export const metadata: Metadata = {
  title: "Ella the Housekeeper",
  description: "A virtual assistant for your Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col">{/* the classname means that the body will have a minimum height of the screen, a background color of background, and a font of sans-serif */}
        <ThemeProvider
          attribute="class"//the attribute that will be used to store the theme
          defaultTheme="System"//the default theme
          enableSystem//enables the system theme
          disableTransitionOnChange//disables the transition when the theme changes
        >
          <header className="flex flex-row gap-0 justify-start items-center h-24">
            <Logo />
            <NavigationMenuComponent />
          </header>
          <div className="absolute right-2 top-2">
            <ModeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
