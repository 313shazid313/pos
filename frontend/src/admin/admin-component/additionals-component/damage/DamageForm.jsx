import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import {
  useCreateDamageMutation,
  useGetAllDamagesQuery,
} from "../../../../redux/additionals-state/damageApi";
import toast from "react-hot-toast";
import { useGetAllStocksQuery } from "../../../../redux/additionals-state/stockApi";

const DamageForm = () => {
  const navigate = useNavigate();
  const { refetch } = useGetAllDamagesQuery();

  const { data: stockData } = useGetAllStocksQuery();

  const [createDamage] = useCreateDamageMutation();

  const [element, setElement] = useState({
    batchNo: "",
    damageQAT: "",
    productName: "",
  });

  // Map stock data for dropdown options
  const optionsArray = [
    { label: "Select a Batch", value: "", isDisabled: true },
    ...(stockData?.map((item) => ({
      label: item.batchNo,
      value: item.batchNo,
    })) || []),
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle batchNo selection and map it to productName
  useEffect(() => {
    if (element.batchNo) {
      const selectedStock = stockData?.find(
        (stock) => stock.batchNo === element.batchNo
      );
      const productName = selectedStock?.productNameId?.name || "";
      setElement((prev) => ({
        ...prev,
        productName,
      }));
    }
  }, [element.batchNo, stockData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createDamage({
        batchNo: element.batchNo,
        damageQAT: element.damageQAT,
      }).unwrap();
      toast.success("Damage Record Created Successfully");
      refetch();
      navigate(-1);
    } catch (error) {
      toast.error(
        error.data?.message || "Please fill in all fields correctly."
      );
    }
  };

  // Navigate back
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <p className="text-2xl font-bold mb-6 text-center">Add New Damage</p>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        {/* Batch Selection */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Batch No :
          </label>
          <Select
            options={optionsArray}
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
                batchNo: selectedOption?.value || "",
              }))
            }
          />
        </div>

        {/* Product Name (Read-Only) */}
        <div className="mb-5 my-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Name
          </label>
          <input
            name="productName"
            value={element.productName}
            readOnly
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Damaged Quantity */}
        <div className="mb-5 my-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Enter Damaged Quantity
          </label>
          <input
            onChange={handleInputChange}
            name="damageQAT"
            value={element.damageQAT}
            required
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={handleGoBack}
            type="button"
            className="text-sm font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default DamageForm;
