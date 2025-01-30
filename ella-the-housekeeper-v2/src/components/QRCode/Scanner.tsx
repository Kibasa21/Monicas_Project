"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import Reader, { Product } from "./Reader";
import { Organizer } from "./Organizer";

const Scanner: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <>
      {products.length == 0 ? (
        <Reader setProducts={setProducts} />
      ) : (
        <Organizer products={products} />
      )}
    </>
  );
};

export default Scanner;
