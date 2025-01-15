"use client";

import React, { useState, useCallback } from "react";
import {
  IBoundingBox,
  IPoint,
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
import dataRetrieval from "./DataRetrieval";
import { useProductsRetrieval } from "@/hooks/use-products-retrieval";

interface IDetectedBarcode {
  boundingBox: IBoundingBox;
  cornerPoints: IPoint[];
  format: string;
  rawValue: string;
}

const Scanner: React.FC = () => {
  const [result, setResult] = useState<string>("No result");
  // const { data, isLoading, isError, error } = useProductsRetrieval();

  // console.log(data);

  const handleScan = useCallback((data: IDetectedBarcode[]) => {
    if (data) {
      setResult("Products extracted from QR code");
    }
  }, []);

  const handleError = useCallback((err: unknown) => {
    console.error(err);
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Scan QR code</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex flex-col gap-y-4">
            <AlertDialogTitle>QR Code Scanner</AlertDialogTitle>
            <QRScanner
              scanDelay={300}
              onScan={handleScan}
              styles={{
                video: { width: "100%", height: "100%" },
                container: { width: "100%", height: "100%" },
                finderBorder: 0,
              }}
              components={{ finder: false }}
            />
            <AlertDialogDescription>{result}</AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={dataRetrieval}>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Scanner;
