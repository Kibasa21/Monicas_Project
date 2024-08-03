
import Link from "next/link";

import logoImg from "../../public/logo.png";
import Image from "next/image";
import NavLink from "./NavLink";
import classes from "./Header.module.css";

const Header: React.FC = () => {

    return (
        <header className={classes.header}>
            <Link href="/" className={classes.logo}>
                <Image
                width={50}
                height={50}
                style={{ borderRadius: "50%" , border: "1px solid black" }}
                src={logoImg}
                alt="A plate with food on it."
                priority />
                <span>Ella the Housekeeper</span>
            </Link>

            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink href="/meals">Virtual Shelf</NavLink>
                    </li>
                    <li>
                        <NavLink href="/community">Book of recipes</NavLink>
                    </li>
                    <li>
                        <NavLink href="/community">To-do List</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;