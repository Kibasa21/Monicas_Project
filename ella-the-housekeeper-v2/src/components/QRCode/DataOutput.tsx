import type React from "react";
import { Suspense } from "react";
import {
  type IBoundingBox,
  type IPoint,
  Scanner as QRScanner,
} from "@yudiel/react-qr-scanner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import ProductsOrganizer from "./ProductsOrganizer";
import Reader from "./Reader";
import {
  QRCodeStoreProvider,
  useQRCodeStore,
} from "@/store/qrcode-scanner-context";

interface IDetectedBarcode {
  boundingBox: IBoundingBox;
  cornerPoints: IPoint[];
  format: string;
  rawValue: string;
}

const DataOutput = ({ result }: { result: string }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsOrganizer data={result} />
    </Suspense>
  );
};

export default DataOutput;
