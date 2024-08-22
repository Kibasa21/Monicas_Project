import type { Metadata } from "next";
import "./styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/day-night-toggle";
import { NavigationMenuComponent } from "@/components/Navigation-Menu";
import Logo from "@/components/Logo-Toggle";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationProvider";
import LanguageChanger from "@/components/LanguageChanger";

export const metadata: Metadata = {
  title: "Ella the Housekeeper",
  description: "A virtual assistant for your Home",
};

const I18Nnamespaces = ['navigation', 'shelf-titles', 'shelf-titles-descriptions'];

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  const { t } = await initTranslations(locale, I18Nnamespaces);

  const content = {
    navegationTitles: [
      t('navigation:shelf'),
      t('navigation:todo'),
      t('navigation:menu'),
      t('navigation:shopping'),
    ],
    navegationDescriptions: {
      shelfTitles: [
        t('shelf-titles:food'),
        t('shelf-titles:cleaning'),
        t('shelf-titles:hygiene'),
      ],
      shelfDescriptions: {
        foodSupplies: t('shelf-titles-descriptions:food'),
        cleaningSupplies: t('shelf-titles-descriptions:cleaning'),
        hygieneSupplies: t('shelf-titles-descriptions:hygiene'),
      }
    },
  };

  return (
    <html lang="en">
      <TranslationsProvider locale={locale} namespaces={I18Nnamespaces}>
        <body className="flex flex-col">{/* the classname means that the body will have a minimum height of the screen, a background color of background, and a font of sans-serif */}
          <ThemeProvider
            attribute="class"//the attribute that will be used to store the theme
            defaultTheme="System"//the default theme
            enableSystem//enables the system theme
            disableTransitionOnChange//disables the transition when the theme changes
          >
            <header className="flex flex-col md:flex-row gap-0 justify-center md:justify-start items-center h-24">
              <Logo />
              <NavigationMenuComponent content={content} />
              <LanguageChanger className="fixed right-1 bottom-1 md:top-1" />
            </header>
            <div className="fixed left-1 bottom-1">
              <ModeToggle />
            </div>
            {children}
          </ThemeProvider>
        </body>
      </TranslationsProvider>
    </html>
  );
}
