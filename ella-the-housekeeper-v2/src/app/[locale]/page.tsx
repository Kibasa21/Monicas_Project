import Scanner from "@/components/QRCode/Scanner";
import Image from "next/image";

export default async function Home() {
  return (
    <main>
      <h1>Welcome to Ella the Housekeeper</h1>
      <Scanner />
    </main>
  );
}
