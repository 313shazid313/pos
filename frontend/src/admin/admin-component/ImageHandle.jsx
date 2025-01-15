import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// eslint-disable-next-line no-unused-vars, react/prop-types
const ImageHandle = ({ name, setImage, label, id, value }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadSingleImage = async (base64) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:7230/uploadimage", {
        image: base64,
      });
      const imageURL = res.data;
      console.log(imageURL);
      setUrl(imageURL);
      toast.success("Uploading image successful");
      setImage(imageURL);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (e) => {
    const imageFiles = e.target.files;
    console.log(imageFiles);
    if (imageFiles.length === 1) {
      const base64 = await convertBase64(imageFiles[0]);
      uploadSingleImage(base64);
      return;
    }

    const base64s = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const base = await convertBase64(imageFiles[i]);
      base64s.push(base);
    }
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>

      <input
        multiple
        onChange={uploadImage}
        name={name}
        id={name}
        type="file"
        className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      />

      {loading && <p>Loading...</p>}
      {url && (
        <div>
          <p>Image uploaded successfully!</p>
          <img src={url} alt="uploaded image" />
        </div>
      )}
    </div>
  );
};

export default ImageHandle;
