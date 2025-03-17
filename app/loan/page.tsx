import BackButton from "../_components/BackButton";
import Loan from "../_components/LoanRequest";

export default function LoanPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4 relative">
      <BackButton />
      <Loan />
    </div>
  );
}
