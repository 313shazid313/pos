import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import photo from "./assets/bryan-goff-f7YQo-eYHdM-unsplash.jpg"
import photo2 from "./assets/nasa-rTZW4f02zY8-unsplash.jpg"
import Footer from "./component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/feature/productSlice";
import { addToCart } from "./redux/feature/cartSlice";
import { Link } from "react-router-dom";
const App = () => {
  
  useEffect(() => {
    initFlowbite();
  }, []);

  const { isLoading, products, error } = useSelector((state) => state.productR);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (e)=>{
    dispatch(addToCart(e));
  }

  return (
    <div className="mt-32" >
      <div id="animation-carousel" className="relative w-full" data-carousel="slide">
        {/* <!-- Carousel wrapper --> */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {/* <!-- Item 1 --> */}
          <div className="hidden duration-200 ease-linear" data-carousel-item>
            <img src={photo} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>
          {/* <!-- Item 2 --> */}
          <div className="hidden duration-200 ease-linear" data-carousel-item>
            <img src={photo2} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>
          {/* <!-- Item 3 --> */}
          <div className="hidden duration-200 ease-linear" data-carousel-item="active">
            <img src={photo} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>
          {/* <!-- Item 4 --> */}
          <div className="hidden duration-200 ease-linear" data-carousel-item>
            <img src={photo2} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>
          {/* <!-- Item 5 --> */}
          <div className="hidden duration-200 ease-linear" data-carousel-item>
            <img src={photo2} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>
        </div>
        {/* <!-- Slider controls --> */}
        <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
      <p className="text-center text-4xl py-5">Our Products</p>

      {/* fetching all products  */}
      <>
        {isLoading && <h3 className="text-center text-gray-500">Loading .....</h3>}
        {error && <h3 className="text-center text-red-500">{error}</h3>}

        <div className="container mx-auto m-12 px-4 py-4">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {!isLoading &&
            products.map((product) => (
              <article
                key={product._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200  "
              >
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                  <span className="absolute top-2 right-2 bg-[#FEBD2F] text-white text-xs font-bold px-2 py-1 rounded-md">
                    {product.offer ? `${product.offer} Off` : "New"}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h5 className="text-xl font-bold text-gray-800">{product.name}</h5>
                  <p className="text-gray-600 text-sm font-medium">Category: <span className="font-semibold">{product.category.name}</span></p>
                  <p className="text-gray-800 font-semibold text-lg">Price: ${product.price}</p>

                  <div className="flex justify-between items-center mt-4">
                    <Link
                      to={`/category/${product.category._id}/${product._id}`}
                      className="text-[#bb8b23] font-medium hover:text-[#FEBD2F] transition-colors"
                    >
                      Show Details
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 bg-[#bb8b23] text-white font-semibold rounded-lg hover:bg-[#FEBD2F] transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
      </>
      <Footer />
    </div>
  )
};

export default App;
