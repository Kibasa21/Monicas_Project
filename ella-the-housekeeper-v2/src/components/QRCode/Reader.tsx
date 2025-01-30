"use client";

import React, { useState, useCallback, Dispatch, SetStateAction } from "react";
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

interface IDetectedBarcode {
  boundingBox: IBoundingBox;
  cornerPoints: IPoint[];
  format: string;
  rawValue: string;
}

export type Product = {
  name: string;
  code: number;
  quantity: number;
  unit: string;
  pricePerUnit: number;
};

const Reader = ({
  setProducts,
}: {
  setProducts: Dispatch<SetStateAction<Product[]>>;
}) => {
  const handleScan = useCallback((data: IDetectedBarcode[]) => {
    if (data && data.length > 0) {
      const scannedUrl = data[0].rawValue;

      // Make a POST request to the API endpoint
      fetch("/api/fetchData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiptLink: scannedUrl }),
      })
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          console.log(data); // For debugging
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
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
              onError={handleError}
              styles={{
                video: { width: "100%", height: "100%" },
                container: { width: "100%", height: "100%" },
                finderBorder: 0,
              }}
              components={{ finder: false }}
            />
            <AlertDialogDescription>
              Put the QR code on the screen
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Organize</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Reader;
