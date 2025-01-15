import { useGetAllProductsQuery } from "../../../../redux/rtk/productApi.js";
import Select from "react-select";
import { useState } from "react";
// import toast from "react-hot-toast";

const SellForm = () => {
  const [table, setTable] = useState([]);
  const [element, setElement] = useState({
    productNameId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setElement((prev) => ({
      ...prev,
      productNameId: selectedOption.value,
    }));
    setTable([
      ...table,
      {
        productNameId: selectedOption.value,
        price: selectedOption.price,
        name: selectedOption.label,
      },
    ]);
  };

  console.log(table);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  // Calculate total price whenever quantity or unit price changes
  const { data: productData } = useGetAllProductsQuery();
  const optionsArrayProduct = [
    { label: "Select a Product", value: "", isDisabled: true },
    ...(productData?.map((item) => ({
      label: item.name,
      value: item._id,
      price: item.price,
    })) || []),
  ];
  console.log(optionsArrayProduct);

  return (
    <div>
      <p className="text-2xl font-bold mb-6 text-center">Add New Sale</p>
      <div className="mt-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
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
            onChange={handleSelectChange}
            className="basic-single"
            classNamePrefix="select"
          />
          {table?.map((item) => {
            return (
              <div key={item?.productNameId}>
                <p>{item?.name}</p>
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
};

export default SellForm;
