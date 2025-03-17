import BackButton from "../_components/BackButton";
import Transfer from "../_components/TransferRequest";

export default function TransferPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4 relative">
      <BackButton />
      <Transfer />
    </div>
  );
}
