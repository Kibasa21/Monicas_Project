"use client"

import Image from "next/image";
import foodShelf from "../../public/food_shelf.jpg";
import cleaningShelf from "../../public/cleaning_shelf.jpg";
import hygieneShelf from "../../public/hygiene_shelf.jpg";

const ChangeableImage: React.FC<{ item: number }> = ({ item }) => {

    return (
        <Image
            src={item === 1 ? foodShelf : item === 2 ? cleaningShelf : hygieneShelf}
            alt={item === 1 ? "A kitchen with lots of food" : item === 2 ? "Cleaning supplies" : "Hygiene products"}
            className="rounded-md w-full h-full"
        />
    );
}

export default ChangeableImage;