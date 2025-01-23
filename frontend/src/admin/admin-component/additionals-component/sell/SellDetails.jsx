import { useParams } from "react-router-dom";
import { useSingleSellQuery } from "../../../../redux/additionals-state/sellApi";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const SellDetails = () => {
  const componentRef = useRef();
  const { id } = useParams();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { data: sellData, isLoading, isError } = useSingleSellQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  if (!sellData) return <div>No data found</div>;

  return (
    <div ref={componentRef} className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Invoice</h1>
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Print PDF
        </button>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Customer Details</h2>
        <p>
          <strong>Name:</strong> {sellData.customerName?.name}
        </p>
        <p>
          <strong>Phone:</strong> {sellData.customerName?.phone}
        </p>
        <p>
          <strong>Email:</strong> {sellData.customerName?.email}
        </p>
        <p>
          <strong>Address:</strong> {sellData.customerName?.address}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Sell Details</h2>
        <p>
          <strong>sellData No:</strong> {sellData.sellDataNo}
        </p>
        <p>
          <strong>Date:</strong> {new Date(sellData.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Reference:</strong> {sellData.reference}
        </p>
        <p>
          <strong>Payment Type:</strong> {sellData.paymentType?.name}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Product List</th>
              <th className="p-2 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {sellData.products?.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p>
          <strong>Subtotal:</strong> ${sellData.subtotal?.toFixed(2)}
        </p>
        <p>
          <strong>Discount:</strong> ${sellData.discount?.toFixed(2)}
        </p>
        <p>
          <strong>VAT:</strong> ${sellData.vat?.toFixed(2)}
        </p>
        <p>
          <strong>Total:</strong> ${sellData.total?.toFixed(2)}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Notes</h2>
        <p>{sellData.note}</p>
      </div>
    </div>
  );
};

export default SellDetails;
