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
import { Product } from "./DataRetrieval";

interface IDetectedBarcode {
  boundingBox: IBoundingBox;
  cornerPoints: IPoint[];
  format: string;
  rawValue: string;
}

const Reader: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

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
    <>
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
          {products.length > 0 && (
            <div>
              <h2>Fetched Products:</h2>
              <ul>
                {products.map((product, index) => (
                  <li key={index}>
                    {product.name} - {product.pricePerUnit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Organize</AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
};

export default Reader;
