import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useGetAllProductsQuery } from "../../../../redux/rtk/productApi.js";
import { useGetAllSuppliersQuery } from "../../../../redux/additionals-state/supplierApi.js";
import toast from "react-hot-toast";
import {
  useCreateStockMutation,
  useGetAllStocksQuery,
} from "../../../../redux/additionals-state/stockApi.js";

const StockForm = () => {
  const navigate = useNavigate();
  const { data: productData } = useGetAllProductsQuery();
  const { data: supplierData } = useGetAllSuppliersQuery();
  const { refetch } = useGetAllStocksQuery();
  const [createStock] = useCreateStockMutation();

  const [element, setElement] = useState({
    productNameId: "",
    supplierId: "",
    quantity: "",
    date: "",
    unitPrice: "",
    totalPrice: "",
    note: "",
    batchNo: "",
  });

  // Calculate total price whenever quantity or unit price changes
  useEffect(() => {
    if (element.quantity && element.unitPrice) {
      const total =
        parseFloat(element.quantity) * parseFloat(element.unitPrice);
      setElement((prev) => ({
        ...prev,
        totalPrice: total.toFixed(2),
      }));
    }
  }, [element.quantity, element.unitPrice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "productNameId",
      "supplierId",
      "quantity",
      "unitPrice",
      "batchNo",
    ];
    const missingFields = requiredFields.filter((field) => !element[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    try {
      await createStock(element).unwrap();
      console.log(element);
      refetch();
      toast.success("New Stock Created Successfully");
      navigate(-1);
    } catch (error) {
      toast.error(error.data?.message || "Please Fill the fields Correctly");
    }
  };

  const optionsArrayProduct = [
    { label: "Select a Product", value: "", isDisabled: true },
    ...(productData?.map((item) => ({
      label: item.name,
      value: item._id,
    })) || []),
  ];

  const optionsArraySupplier = [
    { label: "Select a Supplier", value: "", isDisabled: true },
    ...(supplierData?.map((item) => ({
      label: item.name,
      value: item._id,
    })) || []),
  ];

  return (

      <div>
        <p className="text-2xl font-bold mb-6 text-center">Add New Stock</p>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Selection */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Product *
              </label>
              <Select
                options={optionsArrayProduct}
                value={optionsArrayProduct.find(
                  (option) => option.value === element.productNameId
                )}
                styles={{
                  input: (base) => ({
                    ...base,
                    "input:focus": {
                      boxShadow: "none",
                    },
                  }),
                }}
                onChange={(selectedOption) =>
                  setElement((prev) => ({
                    ...prev,
                    productNameId: selectedOption?.value || "",
                  }))
                }
                className="basic-single"
                classNamePrefix="select"
              />
            </div>

            {/* Supplier Selection */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Supplier *
              </label>
              <Select
                options={optionsArraySupplier}
                value={optionsArraySupplier.find(
                  (option) => option.value === element.supplierId
                )}
                styles={{
                  input: (base) => ({
                    ...base,
                    "input:focus": {
                      boxShadow: "none",
                    },
                  }),
                }}
                onChange={(selectedOption) =>
                  setElement((prev) => ({
                    ...prev,
                    supplierId: selectedOption?.value || "",
                  }))
                }
                className="basic-single"
                classNamePrefix="select"
              />
            </div>

            {/* Batch No Input */}
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Batch No *
              </label>
              <div className="mt-2">
                <input
                  name="batchNo"
                  type="text"
                  min="0"
                  value={element.batchNo}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Quantity *
              </label>
              <div className="mt-2">
                <input
                  name="quantity"
                  type="number"
                  min="0"
                  value={element.quantity}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Unit Price Input */}
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Unit Price *
              </label>
              <div className="mt-2">
                <input
                  name="unitPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={element.unitPrice}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Total Price Input */}
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Total Price
              </label>
              <div className="mt-2">
                <input
                  name="totalPrice"
                  type="number"
                  value={element.totalPrice}
                  readOnly
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-50 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Date Input */}
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Date *
              </label>
              <div className="mt-2">
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={element.date}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          {/* Note Textarea */}
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Note
            </label>
            <textarea
              name="note"
              value={element.note}
              onChange={handleInputChange}
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Add any additional notes here..."
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-sm/6 font-semibold text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
  
  );
};

export default StockForm;
