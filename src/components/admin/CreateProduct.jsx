import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import MetaDeta from "../layout/MetaDeta";
import LoadingPage from "../layout/loading/LoadingPage";
import { allCategory, createProduct } from "../../actions/admin/productsAction";
import { CREATE_PRODUCT_RESET } from "../../constance/admin/productConstant";
import GlobalState from "../../GlobalState";

const CreateProduct = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const { categories } = useSelector((state) => state.categories);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(null);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      if (error === "Could not decode base64") {
        setErr("Image is too large");
        dispatch({ type: CREATE_PRODUCT_RESET });
      } else {
        setErr(error);
        dispatch({ type: CREATE_PRODUCT_RESET });
      }
    }
    if (success) {
      setMsg("Product Created Successfully");
      dispatch({ type: CREATE_PRODUCT_RESET });
      navigate("/admin/dashboard");
    }
  }, [error, dispatch, success]);

  useEffect(() => {
    dispatch(allCategory(token));
  }, []);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);

    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);

    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createProduct(token, myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);

          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaDeta title="Create Product" />
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="signUpPage" style={{ padding: "2rem 0" }}>
          <div className="productCreate">
            <MetaDeta title="Create Product" />
            <h1>Create Product</h1>
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
                <p style={{ color: "rgb(153, 153, 0)", margin: "10px" }}>
                  Image should be less than 700kb
                </p>
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
                disabled={loading ? true : false}
                style={{ padding: "10px" }}
                type="submit"
                value="Create"
                className="v2button submitButton"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProduct;
