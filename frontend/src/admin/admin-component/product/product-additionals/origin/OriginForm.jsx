import { useState } from "react";
import {
  useCreateOriginMutation,
  useGetAllOriginQuery,
} from "../../../../../redux/product-additional-state/originApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OriginForm = () => {
  const handleGoBack = () => {
    navigate(-1);
  };

  const { refetch } = useGetAllOriginQuery();
  const navigate = useNavigate();
  const [createOrigin, { isLoading: loading }] = useCreateOriginMutation();
  // console.log(loading);

  const [element, setElement] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElement({
      ...element,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(element);
    e.preventDefault();
    const data = { ...element };
    try {
      await createOrigin(data).unwrap();
      refetch();
      toast.success("Unit Added Successfully");
      navigate(-1);
    } catch (error) {
      // console.error(error);
      toast.error(error.data.message);
    }
  };

  return (
    <div>
      <p className="text-2xl font-bold  text-center">Add New Origin</p>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto pt-3">
        <div className="sm:col-span-3 py-3">
          <label
            htmlFor="first-name"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Enter Origin Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              value={element.name}
              onChange={handleInputChange}
              type="text"
              autoComplete="given-name"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={handleGoBack}
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OriginForm;
