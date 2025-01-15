import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useUpdateUnitMutation,
  useSingleUnitQuery,
} from "../../../../../redux/product-additional-state/unitApi";

import toast from "react-hot-toast";

const UnitUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { data, error } = useSingleUnitQuery(id);
  console.log(data);
  const [updateUnit, { isLoading: isUpdating }] = useUpdateUnitMutation();

  const [element, setElement] = useState({
    name: "",
  });

  useEffect(() => {
    if (data) {
      setElement({
        name: data.name || "",
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElement((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUnit({
        id: id,
        status: { ...element },
      }).unwrap();

      toast.success("Brand Updated Successfully");
      navigate(-1);
    } catch (err) {
      console.error("Failed to update brand:", err);
      toast.error("Update Brand Failed");
    }
  };

  if (error) return <p>Error loading brand details: {error.message}</p>;

  return (
    <div>
      <p className="text-2xl font-bold text-center">Update Brand</p>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto pt-3">
        <div className="sm:col-span-3 py-3">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-900"
          >
            Unit Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              value={element.name}
              onChange={handleInputChange}
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

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
            disabled={isUpdating}
            className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
          >
            {isUpdating ? "updating" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UnitUpdate;
