"use client";

import React, { useState, useCallback } from "react";
import QrReader from "react-qr-scanner";
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

const Scanner: React.FC = () => {
  const [result, setResult] = useState<string>("No result");

  const handleScan = useCallback((data: string | null) => {
    if (data) {
      setResult(data.text);
      console.log(data);
    }
  }, []);

  const handleError = useCallback((err: Error) => {
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
            <QrReader
              delay={300}
              facingMode="environment"
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%", height: "100%" }}
            />
            <AlertDialogDescription>{result}</AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Scanner;
