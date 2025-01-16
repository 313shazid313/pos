import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useLogoutUserMutation } from "../redux/auth/authApi";
import { logout } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";

// icons
import { IoPeople } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { RiAlignItemBottomFill } from "react-icons/ri";
import { FaChartArea } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaMoneyBill } from "react-icons/fa";

const AdminNav = () => {
  useEffect(() => {
    initFlowbite();
  }, []);

  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      if (confirm("Sure You want to Logout")) {
        await logoutUser().unwrap();
        dispatch(logout());
        alert("Logout successful!");
      }
    } catch (error) {
      console.error("Error to logout", error);
    }
  };

  return (
    <div>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <a
            href="https://flowbite.com/"
            className="flex items-center ps-2.5 mb-5"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 me-3 sm:h-7"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <FaChartArea className="text-xl" />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <NavLink
                exact="true"
                to="sell-table"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <FaMoneyBill className="text-xl" />
                <span className="ms-3">Sell</span>
              </NavLink>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown1"
                data-collapse-toggle="dropdown1"
              >
                <RiAlignItemBottomFill className="text-xl" />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Manage Product
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul id="dropdown1" className="hidden py-2 space-y-2">
                <li>
                  <NavLink
                    exact="true"
                    to="product-table"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true"
                    to="stock-table"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                  >
                    Stock
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true"
                    to="damage-table"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                  >
                    Damages
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown2"
                data-collapse-toggle="dropdown2"
              >
                <MdCategory className="text-xl" />

                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Categories
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul id="dropdown2" className="hidden py-2 space-y-2">
                <li>
                  <NavLink
                    exact="true"
                    to="category-table"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                  >
                    Manage Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true"
                    to="brand-table"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                  >
                    Manage Brand
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true"
                    to="unit-table"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                  >
                    Manage Unit
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true"
                    to="type-table"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                  >
                    Manage Type
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true"
                    to="origin-table"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                  >
                    Manage Origin
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink
                exact="true"
                to="supplier-table"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <FaPeopleGroup className="text-xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Manage Supplier
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                exact="true"
                to="customer-table"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <IoPeople className="text-xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Manage Customer
                </span>
              </NavLink>
            </li>

            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown3"
                data-collapse-toggle="dropdown3"
              >
                <IoMdSettings className="text-xl" />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Settigs
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul id="dropdown3" className="hidden py-2 space-y-2">
                <li>
                  <NavLink
                    exact="true"
                    to="vat-form"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                  >
                    Manage Vat
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true"
                    to="discount-table"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                  >
                    Manage Discount
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <FiLogOut className="text-xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminNav;
