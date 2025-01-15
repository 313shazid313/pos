import { useState } from "react";
import { useLoginUserMutation } from '../redux/auth/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/auth/authSlice';

const AdminLogin = () => {
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch()


  const [items, setItems] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await loginUser(items).unwrap();
      const { user } = response;
      // console.log(items)
      dispatch(setUser({ user }))

      alert("Login successful!")

    } catch (error) {
      console.error(error)
      alert(error.data?.message || "An error occurred");
    }
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItems({
      ...items,
      [name]: value,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-10 mt-20 border border-gray-200">
      <div className="mb-5">
        <label htmlFor="username" className="block text-gray-800 font-semibold mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={items.username}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-150"
          placeholder="Enter your username"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-800 font-semibold mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={items.password}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-150"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 transform hover:scale-105"
      >
        Submit
      </button>
    </form>


  );
};

export default AdminLogin;
