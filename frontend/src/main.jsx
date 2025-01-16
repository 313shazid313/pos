import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RouteDoesNotExist from "./component/RouteDoesNotExist.jsx";
import store from "./redux/store.js";
import Protected from "./admin/Protected.jsx";
import ProductTable from "./admin/admin-component/product/ProductTable.jsx";
import ProductForm from "./admin/admin-component/product/ProductForm.jsx";
import ProductUpdate from "./admin/admin-component/product/ProductUpdate.jsx";
import Poster from "./admin/admin-component/Poster.jsx";
import Orders from "./admin/admin-component/Orders.jsx";
import BrandTable from "./admin/admin-component/product/product-additionals/brand/BrandTable.jsx";
import BrandForm from "./admin/admin-component/product/product-additionals/brand/BrandForm.jsx";
import BrandUpdate from "./admin/admin-component/product/product-additionals/brand/BrandUpdate.jsx";
import UnitTable from "./admin/admin-component/product/product-additionals/unit/UnitTable.jsx";
import UnitForm from "./admin/admin-component/product/product-additionals/unit/UnitForm.jsx";
import UnitUpdate from "./admin/admin-component/product/product-additionals/unit/UnitUpdate.jsx";
import TypeTable from "./admin/admin-component/product/product-additionals/type/TypeTable.jsx";
import TypeForm from "./admin/admin-component/product/product-additionals/type/TypeForm.jsx";
import TypeUpdate from "./admin/admin-component/product/product-additionals/type/TypeUpdate.jsx";
import OriginTable from "./admin/admin-component/product/product-additionals/origin/OriginTable.jsx";
import OriginForm from "./admin/admin-component/product/product-additionals/origin/OriginForm.jsx";
import OriginUpdate from "./admin/admin-component/product/product-additionals/origin/OriginUpdate.jsx";
import CategoryTable from "./admin/admin-component/product/product-additionals/category/CategoryTable.jsx";
import CategoryForm from "./admin/admin-component/product/product-additionals/category/CategoryForm.jsx";
import CategoryUpdate from "./admin/admin-component/product/product-additionals/category/CategoryUpdate.jsx";
import StockTable from "./admin/admin-component/additionals-component/stock/StockTable.jsx";
import StockForm from "./admin/admin-component/additionals-component/stock/StockForm.jsx";
import StockUpdate from "./admin/admin-component/additionals-component/stock/StockUpdate.jsx";
import SupplierTable from "./admin/admin-component/additionals-component/supplier/SupplierTable.jsx";
import SupplierForm from "./admin/admin-component/additionals-component/supplier/SupplierForm.jsx";
import SupplierUpdate from "./admin/admin-component/additionals-component/supplier/SupplierUpdate.jsx";
import DamageForm from "./admin/admin-component/additionals-component/damage/DamageForm.jsx";
import DamageTable from "./admin/admin-component/additionals-component/damage/DamageTable.jsx";
import DamageUpdate from "./admin/admin-component/additionals-component/damage/DamageUpdate.jsx";
import CustomerTable from "./admin/admin-component/additionals-component/customer/CustomerTable.jsx";
import CustomerForm from "./admin/admin-component/additionals-component/customer/CustomerForm.jsx";
import CustomerUpdate from "./admin/admin-component/additionals-component/customer/CustomerUpdate.jsx";
import SellTable from "./admin/admin-component/additionals-component/sell/SellTable.jsx";
import SellForm from "./admin/admin-component/additionals-component/sell/SellForm.jsx";
import VatForm from "./admin/admin-component/additionals-component/vat/VatForm.jsx";
import PaymentTable from "./admin/admin-component/additionals-component/payment/PaymentTable.jsx";
import PaymentForm from "./admin/admin-component/additionals-component/payment/PaymentForm.jsx";
import PaymentUpdate from "./admin/admin-component/additionals-component/payment/PaymentUpdate.jsx";

const router = createBrowserRouter([
  //! admin route
  {
    path: "/dashboard",
    element: <Protected />,
    children: [
      {
        path: "product-table",
        element: <ProductTable />,
      },
      {
        path: "product-table/product-form",
        element: <ProductForm />,
      },
      {
        path: "product-table/product-update/:id",
        element: <ProductUpdate />,
      },
      {
        path: "add-new-poster",
        element: <Poster />,
      },
      {
        path: "user-order",
        element: <Orders />,
      },
      {
        path: "brand-table",
        element: <BrandTable />,
      },
      {
        path: "brand-table/brand-form",
        element: <BrandForm />,
      },
      {
        path: "brand-table/brand-update/:id",
        element: <BrandUpdate />,
      },
      {
        path: "unit-table",
        element: <UnitTable />,
      },
      {
        path: "unit-table/unit-form",
        element: <UnitForm />,
      },
      {
        path: "unit-table/unit-update/:id",
        element: <UnitUpdate />,
      },
      {
        path: "type-table",
        element: <TypeTable />,
      },
      {
        path: "type-table/type-form",
        element: <TypeForm />,
      },
      {
        path: "type-table/type-update/:id",
        element: <TypeUpdate />,
      },
      {
        path: "origin-table",
        element: <OriginTable />,
      },
      {
        path: "origin-table/origin-form",
        element: <OriginForm />,
      },
      {
        path: "origin-table/origin-update/:id",
        element: <OriginUpdate />,
      },
      {
        path: "category-table",
        element: <CategoryTable />,
      },
      {
        path: "category-table/category-form",
        element: <CategoryForm />,
      },
      {
        path: "category-table/category-update/:id",
        element: <CategoryUpdate />,
      },
      {
        path: "stock-table",
        element: <StockTable />,
      },
      {
        path: "stock-table/stock-form",
        element: <StockForm />,
      },
      {
        path: "stock-table/stock-update/:id",
        element: <StockUpdate />,
      },
      {
        path: "supplier-table",
        element: <SupplierTable />,
      },
      {
        path: "supplier-table/supplier-form",
        element: <SupplierForm />,
      },
      {
        path: "supplier-table/supplier-update/:id",
        element: <SupplierUpdate />,
      },
      {
        path: "damage-table",
        element: <DamageTable />,
      },
      {
        path: "damage-table/damage-form",
        element: <DamageForm />,
      },
      {
        path: "damage-table/damage-update/:id",
        element: <DamageUpdate />,
      },
      {
        path: "customer-table",
        element: <CustomerTable />,
      },
      {
        path: "customer-table/customer-form",
        element: <CustomerForm />,
      },
      {
        path: "customer-table/customer-update/:id",
        element: <CustomerUpdate />,
      },
      {
        path: "sell-table",
        element: <SellTable />,
      },
      {
        path: "sell-table/sell-form",
        element: <SellForm />,
      },
      {
        path: "vat-form",
        element: <VatForm />,
      },
      {
        path: "payment-table",
        element: <PaymentTable />,
      },
      {
        path: "payment-table/payment-form",
        element: <PaymentForm />,
      },
      {
        path: "payment-table/payment-update/:id",
        element: <PaymentUpdate />,
      },
      {
        path: "*",
        element: <RouteDoesNotExist />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />
  </Provider>
);
