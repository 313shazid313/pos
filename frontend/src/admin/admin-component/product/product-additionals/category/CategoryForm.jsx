import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../../../../redux/product-additional-state/categoryApi";
import toast from "react-hot-toast";

const CategoryForm = () => {
  const { data } = useGetAllCategoriesQuery();
  // console.log(data);

  const handleGoBack = () => {
    navigate(-1);
  };

  const { refetch } = useGetAllCategoriesQuery();
  const navigate = useNavigate();
  const [createCategory] = useCreateCategoryMutation();

  const [element, setElement] = useState({
    name: "",
    parentCategoryId: null,
    isPublished: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElement({
      ...element,
      [name]: value,
    });
  };

  // console.log(image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields
    const requiredFields = ["name"];
    const missingFields = requiredFields.filter((field) => !element[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    const data = { ...element };
    console.log(data);
    try {
      await createCategory(data).unwrap();
      refetch();
      toast("New Category Created Successfully");
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Category");
    }
  };

  //? organizing category data -------->
  function buildParentChildPaths(categories, parentPath = "") {
    let paths = [];

    (categories || []).forEach((category) => {
      // Build the current path
      const currentPath = parentPath
        ? `${parentPath} => ${category.name}`
        : category.name;

      // Add the current path as an object with name and id
      paths.push({ name: currentPath, _id: category.id });

      // Recursively process children
      const childPaths = buildParentChildPaths(
        category.children || [],
        currentPath
      );

      // Concatenate the child paths to the main paths
      paths = paths.concat(childPaths);
    });
    return paths;
  }

  const parentChildPaths = buildParentChildPaths(data);
  // console.log(parentChildPaths);

  const optionsArray = [
    { label: "Selected an Option", value: "X", isDisabled: true },
    { label: "No Parent Category", value: null },

    ...parentChildPaths.map((item) => ({
      label: item.name,
      value: item._id,
    })),
  ];

  // console.log(optionsArray);

  return (
    <div>
      <p className="text-2xl font-bold mb-6 text-center">Add New Category</p>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto ">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Enter New Category Name *
          </label>
          <input
            onChange={handleInputChange}
            name="name"
            value={element.name}
            required
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Parent Category
          </label>
          <Select
            options={optionsArray}
            // defaultValue={optionsArray[1]}
            styles={{
              input: (base) => ({
                ...base,
                "input:focus": {
                  boxShadow: "none",
                },
              }),
            }}
            onChange={(selectedOption) =>
              setElement({
                ...element,
                parentCategoryId: selectedOption?.value || null,
              })
            }
          />
        </div>

        {/* publish or not */}
        <div className="space-y-10 my-5">
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
                  defaultChecked={true}
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
                  // defaultChecked={isPublished === false}
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

export default CategoryForm;
