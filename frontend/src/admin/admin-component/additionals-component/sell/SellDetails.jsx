import { useParams } from "react-router-dom";
import { useSingleSellQuery } from "../../../../redux/additionals-state/sellApi";

const SellDetails = () => {
  const { id } = useParams();

  const { data: sellData, isLoading, isError } = useSingleSellQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  if (!sellData) return <div>No data found</div>;

  console.log(sellData);
  return (
    <div className="bg-white p-10 rounded-lg shadow-xl max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-800">Invoice</h1>
        {/* <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Print PDF
        </button> */}
      </div>

      {/* Customer Details */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Customer Details
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <p>
            <span className="font-medium">Name:</span>{" "}
            {sellData.customerName?.name}
          </p>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            {sellData.customerName?.phone}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {sellData.customerName?.email}
          </p>
          <p>
            <span className="font-medium">Address:</span>{" "}
            {sellData.customerName?.address}
          </p>
        </div>
      </section>

      {/* Sell Details */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Sell Details</h2>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <p>
            <span className="font-medium">Invoice No:</span>{" "}
            {sellData.invoiceNo}
          </p>
          <p>
            <span className="font-medium">Date:</span>{" "}
            {new Date(sellData.date).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Reference:</span> {sellData.reference}
          </p>
          <p>
            <span className="font-medium">Payment Type:</span>{" "}
            {sellData.paymentType?.name}
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Products</h2>
        <table className="w-full border text-sm text-gray-600">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {sellData.products?.map((product, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Summary */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Summary</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">Subtotal:</span> $
            {sellData.subtotal?.toFixed(2)}
          </p>
          <p>
            <span className="font-medium">Discount:</span> $
            {sellData.discount?.toFixed(2)}
          </p>
          <p>
            <span className="font-medium">VAT:</span> $
            {sellData.vat?.toFixed(2)}
          </p>
          <p className="text-lg font-semibold">
            <span className="font-medium">Total:</span> $
            {sellData.total?.toFixed(2)}
          </p>
        </div>
      </section>

      {/* Notes */}
      <section>
        <h2 className="text-lg font-bold text-gray-700 mb-4">Notes</h2>
        <p className="text-sm text-gray-600">
          {sellData.note || "No additional notes"}
        </p>
      </section>
    </div>
  );
};

export default SellDetails;
