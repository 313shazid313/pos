import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useUpdateBrandMutation,
  useSingleBrandQuery,
} from "../../../../../redux/product-additional-state/brandApi";
import toast from "react-hot-toast";

const BrandUpdate = () => {
  const [image, setImage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { data, isLoading: isProductLoading, error } = useSingleBrandQuery(id);
  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation();

  const [element, setElement] = useState({
    name: "",
    isPublished: false,
  });

  useEffect(() => {
    if (data) {
      setElement({
        name: data.name || "",
        isPublished: data.isPublished || false,
      });
      setImage(data.imageURL || "");
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElement((prevState) => ({
      ...prevState,
      [name]: name === "isPublished" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBrand({
        id: id,
        status: { ...element, imageURL: image },
      }).unwrap();

      toast.success("Brand Updated Successfully");
      navigate(-1);
    } catch (err) {
      console.error("Failed to update brand:", err);
      toast.error("Update Brand Failed");
    }
  };

  if (isProductLoading) return <p>Loading...</p>;
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
            Name
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



        <div className="space-y-10">
          <fieldset>
            <legend className="text-sm font-semibold text-gray-900">
              Status
            </legend>
            <div className="mt-3 space-y-6">
              <div className="flex items-center gap-x-3">
                <input
                  id="publish"
                  name="isPublished"
                  value="true"
                  type="radio"
                  onChange={handleInputChange}
                  checked={element.isPublished === true}
                  className="size-4 border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <label
                  htmlFor="publish"
                  className="block text-sm font-medium text-gray-900"
                >
                  Publish
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="unpublish"
                  name="isPublished"
                  value="false"
                  type="radio"
                  onChange={handleInputChange}
                  checked={element.isPublished === false}
                  className="size-4 border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <label
                  htmlFor="unpublish"
                  className="block text-sm font-medium text-gray-900"
                >
                  Un-Publish
                </label>
              </div>
            </div>
          </fieldset>
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

export default BrandUpdate;
