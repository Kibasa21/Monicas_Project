"use client"

import Image from "next/image"
import Link from "next/link"
import logoImgLight from "../../public/logo_light.png"
import logoImgDark from "../../public/logo_dark.png"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const Logo: React.FC = () => {

    const { theme, systemTheme } = useTheme();
    const [logoTheme, setLogoTheme] = useState<string | undefined>("light");

    useEffect(() => {
        if (theme === "system") {
            setLogoTheme(systemTheme);
        } else {
            setLogoTheme(theme);
        }
    }, [theme, systemTheme]);

    return (
        <Link href="/" className="flex justify-center items-center w-32">
            {
                (logoTheme === "light") ? (
                    <Image src={logoImgLight} alt="Ella the Housekeeper" width={60} height={60} />
                ) : (
                    <Image src={logoImgDark} alt="Ella the Housekeeper" width={60} height={60} />
                )
            }
        </Link>
    )
}

export default Logo;