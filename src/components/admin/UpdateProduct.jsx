import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MetaDeta from "../layout/MetaDeta";
import LoadingPage from "../layout/loading/LoadingPage";
import { allCategory, updateProduct } from "../../actions/admin/productsAction";
import { UPDATE_PRODUCT_RESET } from "../../constance/admin/productConstant";
import { getProductDetails } from "../../actions/productAction";
import GlobalState from "../../GlobalState";

const UpdateProduct = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const params = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  const navigate = useNavigate();
  const { loading, error, isUpdated } = useSelector(
    (state) => state.adminProduct
  );

  const { product } = useSelector((state) => state.productDetails);

  const { categories } = useSelector((state) => state.categories);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    dispatch(getProductDetails(token, params.id));

    dispatch(allCategory(token));
  }, []);

  useEffect(() => {
    if (error) {
      if (error === "Could not decode base64") {
        setErr("Image is too large");
        dispatch({ type: UPDATE_PRODUCT_RESET });
      } else {
        setErr(error);
        dispatch({ type: UPDATE_PRODUCT_RESET });
      }
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

      setImagesPreview(imagesArray);
    }
  }, [error, dispatch, isUpdated, product]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const id = params.id;
    const myForm = new FormData();

    myForm.set("name", name);

    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);

    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateProduct(token, id, myForm));
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
  const handleCategorySelect = () => {
    if (category.length != 24) {
      setErr("Choose a Category");
    }
  };

  return (
    <>
      <MetaDeta title="Update Product" />
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="signUpPage" style={{ padding: "2rem 0" }}>
          <div className="productCreate">
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
                onClick={handleCategorySelect}
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
