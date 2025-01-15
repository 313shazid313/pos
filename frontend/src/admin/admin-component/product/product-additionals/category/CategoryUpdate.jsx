import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";
import {
  useSingleCategoryQuery,
  useUpdateCategoriesMutation,
  useGetAllCategoriesQuery,
} from "../../../../../redux/product-additional-state/categoryApi";

import toast from "react-hot-toast";

const CategoryUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const {
    data,
    isLoading: isProductLoading,
    error,
  } = useSingleCategoryQuery(id);
  const { data: allCategories } = useGetAllCategoriesQuery();

  const [updateCategories] = useUpdateCategoriesMutation();
  // console.log(data);
  const [element, setElement] = useState({
    name: "",
    isPublished: false,
    parentCategoryId: null,
  });

  useEffect(() => {
    if (data) {
      setElement({
        name: data.name || "",
        isPublished: data.isPublished || false,
        parentCategoryId: data.parentCategoryId || null,
      });
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
      console.log(element);
      await updateCategories({
        id: id,
        status: { ...element },
      }).unwrap();

      toast.success("Category Updated Successfully");
      navigate(-1);
    } catch (err) {
      console.error("Failed to update Category:", err);
      toast.error("Update Category Failed");
    }
  };

  if (isProductLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading brand details: {error.message}</p>;

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

  const parentChildPaths = buildParentChildPaths(allCategories);
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
      <div>
        <p className="text-2xl font-bold mb-6 text-center">Add New Category</p>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto ">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Enter New Category Name
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
              value={optionsArray.find(
                (option) => option.value === element.parentCategoryId
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
                setElement({
                  ...element,
                  parentCategoryId: selectedOption?.value || null,
                })
              }
            />
          </div>

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

export default CategoryUpdate;
