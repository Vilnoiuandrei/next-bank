import Balance from "../_components/Balance";
import Loan from "../_components/LoanRequest";
import Transfer from "../_components/TransferRequest";
import SignIn from "../_components/SignIn";
import SignOut from "../_components/SignOut";
import TransactionsList from "../_components/TransactionsList";
import { auth } from "../_lib/auth";

export default async function Account() {
  const session = await auth();
  const user = session?.user;
  if (!session) {
    return <SignIn />;
  }
  return (
    <div>
      <div className="flex items-center justify-between p-4 gap-1 ">
        <h1 className="text-xl text-clip px-2 2xl:text-4xl lg:text-3xl md:text-2xl ">
          Welcome {user?.name}{" "}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center gap-4 mt-4  ">
        <div className=" flex flex-col gap-3 w-72">
          <Balance />
          <button className="bg-customLight text-customDark  h-10 w-52 shadow-md rounded-md ">
            Loan
          </button>
          <button className="bg-customLight text-customDark  h-10 w-52 shadow-md rounded-md ">
            Transfer
          </button>
          <SignOut />
        </div>
        <TransactionsList />
      </div>
    </div>
  );
}
