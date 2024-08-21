export default function Transaction({ transaction }: any) {
  function formatDate(dateStr: string) {
    const date = new Date(dateStr);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  return (
    <li className="bg-white shadow-md rounded-lg p-4 border-l-4 border-red-700 text-customDark2 flex gap-8 w-72 ">
      <div className="w-12">{transaction.amount}$</div>
      <div className="w-12">{transaction.type}</div>
      <div>{formatDate(transaction.date)}</div>
    </li>
  );
}
