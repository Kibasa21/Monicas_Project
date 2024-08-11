"use client"
 
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"//ThemeProvider is a component that provides the theme to the rest of the app
import { type ThemeProviderProps } from "next-themes/dist/types"
 
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}