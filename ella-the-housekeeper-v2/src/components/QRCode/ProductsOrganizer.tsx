import type React from "react";
import {
  type IBoundingBox,
  type IPoint,
  Scanner as QRScanner,
} from "@yudiel/react-qr-scanner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import dataRetrieval, { Product } from "./DataRetrieval";

interface IDetectedBarcode {
  boundingBox: IBoundingBox;
  cornerPoints: IPoint[];
  format: string;
  rawValue: string;
}

const ProductsOrganizer = async ({ data }: { data: string }): Promise<any> => {
  const products: Product[] = await dataRetrieval(data);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Scan QR code</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Receipt</AlertDialogTitle>
          <AlertDialogDescription>{products[0].name}</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction>Organize</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProductsOrganizer;
