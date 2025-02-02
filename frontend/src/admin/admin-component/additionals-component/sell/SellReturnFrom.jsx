import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSingleSellQuery } from "../../../../redux/additionals-state/sellApi";
import { useState, useEffect } from "react";
import { useGetAllvatsQuery } from "../../../../redux/additionals-state/vatApi.js";
// import { useCreateSellReturnMutation } from "../../../../redux/additionals-state/sellReturnApi";
import toast from "react-hot-toast";
import Loading from "../../../../component/Loading";

import {
  incrementProduct,
  decrementProduct,
  setProducts,
} from "../../../../redux/feature/returnSelectedProductSlice.js";

const SellReturnForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // API Queries
  const { data: singleSellData, isLoading } = useSingleSellQuery(id);
  const { data: vatData } = useGetAllvatsQuery();
  // const [createSellReturn] = useCreateSellReturnMutation();

  // Local state
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get selected products from Redux
  const selectedProductData = useSelector(
    (state) => state.returnselectedproducts
  );

  useEffect(() => {
    if (singleSellData?.products) {
      dispatch(setProducts(singleSellData.products));
    }
  }, [singleSellData, dispatch]);

  // console.log(singleSellData);
  // Calculate VAT amount
  const vatAmount = vatData?.[0]?.vatAmount ? vatData[0].vatAmount / 100 : 0;

  // Add additional data to selected products
  const selectedProductsWithAdditionalData =
    selectedProductData?.map((product) => ({
      ...product,
      vat: vatAmount,
      vatPerProduct: product.quantity * product.price * vatAmount,
      totalPrice:
        product.price * product.quantity +
        product.quantity * product.price * vatAmount,
    })) || [];

  // Handlers
  const handleQuantityIncrease = (id) => {
    dispatch(incrementProduct(id));
  };

  const handleQuantityDecrease = (id) => {
    dispatch(decrementProduct(id));
  };

  // Calculate discount amount
  const calculateDiscountAmount = (subtotal) => {
    if (!singleSellData?.disCountPercentage) return 0;

    if (singleSellData?.discountType === "percentage") {
      return (subtotal * parseFloat(singleSellData?.disCountPercentage)) / 100;
    }
    return parseFloat(singleSellData?.discount);
  };

  //! Calculate totals ------->
  const calculateTotals = () => {
    const subtotal = selectedProductsWithAdditionalData.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    const discountAmount = calculateDiscountAmount(subtotal);
    // const shipping = parseFloat(items.shipping);
    const totalVat = selectedProductsWithAdditionalData.reduce(
      (acc, item) => acc + item.vatPerProduct,
      0
    );
    const grandTotal = subtotal - discountAmount;
    return {
      subtotal: subtotal.toFixed(2),
      discount: discountAmount.toFixed(2),
      vat: totalVat.toFixed(2),
      total: grandTotal.toFixed(2),
    };
  };

  const totals = calculateTotals();
  //! Calculate totals ------->

  // calculate totals return

  // Process return data
  const processReturn = (originalSale, returnedItems) => {
    if (!originalSale) return null;

    const updated = JSON.parse(JSON.stringify(originalSale));

    returnedItems.products.forEach((returnedProduct) => {
      const productIndex = updated.products.findIndex(
        (p) => p.value === returnedProduct.value
      );

      if (productIndex !== -1) {
        const originalProduct = updated.products[productIndex];
        originalProduct.quantity -= returnedProduct.quantity;
        originalProduct.totalPrice -= returnedProduct.totalPrice;
        originalProduct.vatPerProduct -= returnedProduct.vatPerProduct;

        if (originalProduct.quantity <= 0) {
          updated.products.splice(productIndex, 1);
        }
      }
    });

    updated.subtotal = (
      parseFloat(updated.subtotal) - parseFloat(returnedItems.subtotal)
    ).toFixed(2);
    updated.discount = (
      parseFloat(updated.discount) - parseFloat(returnedItems.discount)
    ).toFixed(2);
    updated.vat = (
      parseFloat(updated.vat) - parseFloat(returnedItems.vat)
    ).toFixed(2);
    updated.total = (
      parseFloat(updated.total) - parseFloat(returnedItems.total)
    ).toFixed(2);

    return updated;
  };
  const formData = {
    originalSaleId: id,
    products: selectedProductsWithAdditionalData,
    reason,
    ...totals,
    customerName: singleSellData?.customerName,
    customerPhone: singleSellData?.customerPhone,
    originalInvoiceNo: singleSellData?.invoiceNo,
    returnDate: new Date().toISOString(),
  };

  const updatedOriginalSale = processReturn(singleSellData, formData);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      toast.error("Please provide a reason for the return");
      return;
    }

    console.log(reason);

    if (selectedProductsWithAdditionalData.length === 0) {
      toast.error("No products selected for return");
      return;
    }

    try {
      setIsSubmitting(true);

      const dataToSubmit = { ...updatedOriginalSale, returnReason: reason };

      console.log(dataToSubmit);

      toast.success("Return processed successfully");
      // navigate("/sales/returns");
    } catch (error) {
      toast.error(error.message || "Failed to process return");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-4">Return Form</h2>
      <div>
        {/* Customer Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {singleSellData?.customerName || "N/A"}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {singleSellData?.customerPhone || "N/A"}
            </p>
            <p>
              <span className="font-medium">Invoice No:</span>{" "}
              {singleSellData?.invoiceNo || "N/A"}
            </p>
            <p>
              <span className="font-medium">Reference:</span>{" "}
              {singleSellData?.reference || "N/A"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Products</h2>
          {/* Products Table */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Product name",
                    "Previous Quantity",
                    "Quantity",
                    "Unit Price",
                    "Vat",
                    "Vat Amount",
                    "Total Price",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedProductsWithAdditionalData?.map((item) => {
                  const isAddDisabled = item.quantity >= item.originalQuantity;
                  return (
                    <tr key={item.value}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.label}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.originalQuantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleQuantityDecrease(item.value)}
                            className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => handleQuantityIncrease(item.value)}
                            className={`px-2 py-1 text-sm rounded ${
                              isAddDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                            disabled={isAddDisabled}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {(item.vat * 100).toFixed(0)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${item.vatPerProduct.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${item.totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Return Details and Summary */}
          <div className="grid grid-cols-1 gap-6">
            {/* Return Reason Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Return Reason Note
              </label>
              <textarea
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter the reason for return"
                required
              />
            </div>

            {/* Summary Sections (side by side) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Existing Sell Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Existing Sell Summary
                </h2>
                <p className="text-sm text-red-700 mb-4">
                  *Note : The Price of Products You Have Sold
                </p>
                <dl className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-700">
                    <dt>Subtotal</dt>
                    <dd className="font-medium">
                      ${totals?.subtotal || "0.00"}
                    </dd>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <dt>Discount</dt>
                    <dd className="font-medium text-red-500">
                      -${totals?.discount || "0.00"}
                    </dd>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <dt>VAT</dt>
                    <dd className="font-medium">${totals?.vat || "0.00"}</dd>
                  </div>
                </dl>
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between text-base font-semibold text-gray-900">
                    <span>Total Sell Amount</span>
                    <span>${totals?.total || "0.00"}</span>
                  </div>
                </div>
              </div>

              {/* Return Sell Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Return Summary
                </h2>
                <p className="text-sm text-red-700 mb-4">
                  *Note: The money you will get back.
                </p>
                <dl className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-700">
                    <dt>Subtotal</dt>
                    <dd className="font-medium">
                      ${updatedOriginalSale?.subtotal || "0.00"}
                    </dd>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <dt>Discount</dt>
                    <dd className="font-medium text-red-500">
                      -${updatedOriginalSale?.discount || "0.00"}
                    </dd>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <dt>VAT</dt>
                    <dd className="font-medium">
                      ${updatedOriginalSale?.vat || "0.00"}
                    </dd>
                  </div>
                </dl>
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between text-base font-semibold text-gray-900">
                    <span>Total Return Amount</span>
                    <span>${updatedOriginalSale?.total || "0.00"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-6 flex items-center justify-end gap-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-sm font-semibold text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus:visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-300"
            >
              {isSubmitting ? "Processing..." : "Process Return"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellReturnForm;
