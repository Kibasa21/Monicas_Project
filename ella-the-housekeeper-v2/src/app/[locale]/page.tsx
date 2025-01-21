import dataRetrieval from "@/components/QRCode/DataRetrieval";
import Scanner from "@/components/QRCode/Scanner";
import Image from "next/image";

export default async function Home() {
  const products = await dataRetrieval();

  return (
    <main>
      <h1>Welcome to Ella the Housekeeper</h1>
      <Scanner />
    </main>
  );
}
