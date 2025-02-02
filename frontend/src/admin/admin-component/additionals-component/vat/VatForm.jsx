import {
  useGetAllvatsQuery,
  useUpdatevatsMutation,
} from "../../../../redux/additionals-state/vatApi";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VatForm = () => {
  const navigate = useNavigate();
  const { data: vatData } = useGetAllvatsQuery();
  console.log(vatData);

  const [updatevats] = useUpdatevatsMutation();

  const [items, setItems] = useState({
    vatAmount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItems((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ["vatAmount"];
    const missingFields = requiredFields.filter((field) => !items[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    if (items.vatAmount > 100) {
      toast.error("Vat amount should not be greater than 100%");
    }

    if (items.vatAmount < 100) {
      try {
        await updatevats({
          id: vatData[0]?._id,
          status: { ...items },
        }).unwrap();
        toast.success("Vat Updated Successfully");
      } catch (err) {
        console.error("Failed to update Vat:", err);
        toast.error("Updating Vat Failed");
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <p className="text-2xl font-bold mb-4 text-gray-800">Update VAT Amount</p>
      <div className="sm:col-span-3">
        <label
          htmlFor="vatAmount"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Add New VAT
        </label>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="mt-2">
            <input
              id="vatAmount"
              name="vatAmount"
              type="number"
              autoComplete="family-name"
              value={items.vatAmount}
              onChange={handleInputChange}
              placeholder="Enter VAT amount"
              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mt-6 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Save
            </button>
          </div>

          <p className="mt-4 text-sm text-blue-700">
            {Array.isArray(vatData) && vatData[0]
              ? `Current VAT Amount is: ${vatData[0].vatAmount}`
              : "Loading or no VAT data available"}
          </p>

          <div className="mt-4 text-sm text-red-500">
            *Note: Changes will not be saved until the &quot;Save&quot; button is clicked.
          </div>
        </form>
      </div>
    </div>
  );
};

export default VatForm;
