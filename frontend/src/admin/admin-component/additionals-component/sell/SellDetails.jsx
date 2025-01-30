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
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Invoice Details</h1>

      {/* Customer Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
        <p>
          <span className="font-medium">Name:</span> {sellData.customerName}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {sellData.customerPhone}
        </p>
        <p>
          <span className="font-medium">Invoice No:</span> {sellData.invoiceNo}
        </p>
        {/* <p><span className="font-medium">Date:</span> {formatDate(sellData.date.$date)}</p> */}
        <p>
          <span className="font-medium">Reference:</span> {sellData.reference}
        </p>
      </div>

      {/* Product Details */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Product Details</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">VAT</th>
              <th className="p-2 border">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {sellData.products.map((product, index) => (
              <tr key={index} className="border">
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border text-center">{product.quantity}</td>
                <td className="p-2 border text-right">
                  ${product.price.toFixed(2)}
                </td>
                <td className="p-2 border text-right">
                  ${product.vatPerProduct.toFixed(2)}
                </td>
                <td className="p-2 border text-right">
                  ${product.totalPrice.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p>
          <span className="font-medium">Subtotal:</span> $
          {sellData.subtotal.toFixed(2)}
        </p>
        <p>
          <span className="font-medium">Discount:</span> {sellData.discount}%
        </p>
        <p>
          <span className="font-medium">VAT:</span> ${sellData.vat.toFixed(2)}
        </p>
        <p>
          <span className="font-medium">Total:</span> $
          {sellData.total.toFixed(2)}
        </p>
      </div>

      {/* Notes */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Notes</h2>
        <p>{sellData.note}</p>
      </div>
    </div>
  );
};

export default SellDetails;
