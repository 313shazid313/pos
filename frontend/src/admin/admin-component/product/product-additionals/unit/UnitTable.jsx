import { Link } from "react-router-dom";
import { useGetAllUnitQuery } from "../../../../../redux/product-additional-state/unitApi";
import Loading from "../../../../../component/Loading";
import Error404 from "../../../../../component/RouteDoesNotExist";

//icons
import { FaEdit } from "react-icons/fa";

const UnitTable = () => {
  const { data, isError, isLoading } = useGetAllUnitQuery();
  // const [deleteaBrand] = useDeleteaBrandMutation();
  let serial = 0;

  console.log(data);

  if (isLoading) return <Loading />;
  if (isError) return <Error404 />;

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <p className="text-2xl font-bold mb-6">Manage Unit</p>
        </div>
        <div className="">
          <Link
            to="unit-form"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Add New Brand
            </span>
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Unit name
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item._id}
              >
                <td className="px-6 py-4">{(serial = serial + 1)}</td>
                <td className="px-6 py-4">{item.name}</td>

                <td className="px-6 py-4">
                  <Link to={`unit-update/${item._id}`}>
                  <FaEdit className="text-xl text-blue-500" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnitTable;
