import Loan from "../_components/LoanRequest";
import SignIn from "../_components/SignIn";
import SignOut from "../_components/SignOut";
import Transactions from "../_components/Transactions";
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
      <h1>Account</h1>
      <p>Welcome {user?.name}</p>

      <Transfer />
      <Loan />
      <SignOut />
    </div>
  );
}
