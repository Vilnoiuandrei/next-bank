import Loan from "../_components/LoanRequest";
import SignIn from "../_components/SignIn";
import SignOut from "../_components/SignOut";
import TransactionsList from "../_components/TransactionsList";
import Transfer from "../_components/TransferRequest";
import { auth } from "../_lib/auth";

export default async function Account() {
  const session = await auth();
  const user = session?.user;
  if (!session) {
    return <SignIn />;
  }
  return (
    <div>
      <div className="flex items-center justify-between py-4 gap-2">
        <h1 className="text-3xl text-clip px-6">Welcome {user?.name}</h1>
        <SignOut />
      </div>
      <div className="flex justify-around mt-4 sm:flex-col ">
        <TransactionsList />

        <Transfer />
        <Loan />
      </div>
    </div>
  );
}
