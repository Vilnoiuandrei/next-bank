import Balance from "../_components/Balance";
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
      <div className="flex items-center justify-between py-4 gap-1">
        <h1 className="text-xl text-clip px-2 2xl:text-3xl lg:text-2xl">
          Welcome {user?.name}{" "}
        </h1>
        <SignOut />
      </div>
      <div className="pl-4">
        <Balance />
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center gap-4 mt-4  ">
        <Transfer />
        <Loan />
        <TransactionsList />
      </div>
    </div>
  );
}
