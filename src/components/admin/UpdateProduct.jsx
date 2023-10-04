import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MetaDeta from "../layout/MetaDeta";
import LoadingPage from "../layout/loading/LoadingPage";
import {
  allCategory,
  updateProduct,
} from "../../actions/admin/productsAction";
import {
  UPDATE_PRODUCT_RESET,
} from "../../constance/admin/productConstant";
import { getProductDetails } from "../../actions/productAction";
import GlobalState from "../../GlobalState";

const UpdateProduct = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isUpdated } = useSelector(
    // @ts-ignore
    (state) => state.adminProduct
  );
  // @ts-ignore
  const { product } = useSelector((state) => state.productDetails);
  // @ts-ignore
  const { categories } = useSelector((state) => state.categories);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    // @ts-ignore
    dispatch(getProductDetails(params.id));
    // @ts-ignore
    dispatch(allCategory());
  }, []);

  useEffect(() => {
    if (error) {
      setErr(error);
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
    if (isUpdated) {
      setMsg("Product Updated Successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate("/admin/products");
    }
    if (JSON.stringify(product) !== "{}") {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.Stock);
      let imagesArray = [];
      product.images.forEach((element) => {
        imagesArray.push(element.url);
      });
      // @ts-ignore
      setImagesPreview(imagesArray);
    }
  }, [error, dispatch, isUpdated, product]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const id = params.id;
    const myForm = new FormData();

    myForm.set("name", name);
    // @ts-ignore
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    // @ts-ignore
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    // @ts-ignore
    dispatch(updateProduct(id, myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          // @ts-ignore
          setImagesPreview((old) => [...old, reader.result]);
          // @ts-ignore
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
    <MetaDeta title="Update Product" />
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="signUpPage" style={{ padding: "2rem 0" }}>
          <div className="productCreate">
            <MetaDeta title="Create Product" />
            <h1>Update Product</h1>
            <form
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
            >
              <div className="productName">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="productPrice">
                <label htmlFor="price">Enter Price</label>
                <input
                  type="text"
                  placeholder="price"
                  required
                  name="price"
                  value={price}
                  // @ts-ignore
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="productStock">
                <label htmlFor="stock">Product Stock</label>
                <input
                  type="text"
                  placeholder="stock"
                  required
                  name="stock"
                  value={Stock}
                  // @ts-ignore
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="productCategory">
                <label htmlFor="stock">Select Category</label>
                <select
                  required
                  className="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Category</option>

                  {categories &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="productDescription">
                <label htmlFor="description">Product Desciption</label>
                <textarea
                  placeholder="Description"
                  required
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                ></textarea>
              </div>
              <div id="createProductFormFile">
                <label htmlFor="avatar">Product Images</label>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                />
              </div>

              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Product Preview"
                    className="productImages"
                  />
                ))}
              </div>

              <input
                style={{ padding: "10px" }}
                type="submit"
                value="Update"
                className="v2button submitButton"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
