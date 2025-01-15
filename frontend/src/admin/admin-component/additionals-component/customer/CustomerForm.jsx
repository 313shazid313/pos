import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useCreateCustomerMutation,
  useGetAllCustomersQuery,
} from "../../../../redux/additionals-state/customerApi.js";

const CustomerForm = () => {
  const navigate = useNavigate();
  const { refetch } = useGetAllCustomersQuery();
  const [createCustomer] = useCreateCustomerMutation();

  const [element, setElement] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

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
    const requiredFields = ["name", "phone"];
    const missingFields = requiredFields.filter((field) => !element[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    try {
      await createCustomer(element).unwrap();
      console.log(element);
      refetch();
      toast.success("New Customer Created Successfully");
      navigate(-1);
    } catch (error) {
      toast.error(error.data?.message || "Please Fill the fields Correctly");
    }
  };

  return (
    <div>
      <div>
        <p className="text-2xl font-bold mb-6 text-center">Add New Customer</p>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quantity Input */}
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Name *
              </label>
              <div className="mt-2">
                <input
                  name="name"
                  type="text"
                  value={element.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Unit Price Input */}
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Phone *
              </label>
              <div className="mt-2">
                <input
                  name="phone"
                  type="number"
                  value={element.phone}
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
                  name="email"
                  type="email"
                  value={element.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-50 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  name="address"
                  type="text"
                  value={element.address}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-50 sm:text-sm/6"
                />
              </div>
            </div>
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
    </div>
  );
};

export default CustomerForm;
