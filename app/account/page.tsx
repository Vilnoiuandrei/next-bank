import SignIn from "../_components/SignIn";
import SignOut from "../_components/SignOut";
import Transactions from "../_components/Transactions";
import { auth } from "../_lib/auth";

export default async function Account() {
  const session = await auth();
  const user = session?.user;
  console.log(session);
  if (!session) {
    return <SignIn />;
  }
  return (
    <div>
      <h1>Account</h1>
      <p>Welcome {user?.name}</p>
      <SignOut />
      <Transactions />
    </div>
  );
}
