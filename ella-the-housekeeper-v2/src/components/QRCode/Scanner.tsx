"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import Reader from "./Reader";

const Scanner: React.FC = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Scan QR code</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Reader />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Scanner;
