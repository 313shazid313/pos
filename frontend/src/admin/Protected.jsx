import AdminLogin from "./AdminLogin";
import AdminNav from "./AdminNav";

import { useSelector } from "react-redux";
const Protected = () => {
  const { user } = useSelector((state) => state.auth);

  const getingAdminDataFromLocalStorage = localStorage.getItem("user");
  console.log(getingAdminDataFromLocalStorage);
  console.log(user);

  return <>{getingAdminDataFromLocalStorage ? <AdminNav /> : <AdminLogin />}</>;
};

export default Protected;
