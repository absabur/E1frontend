import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MetaDeta from "../layout/MetaDeta";
import LoadingPage from "../layout/loading/LoadingPage";
import { allCategory, updateProduct } from "../../actions/admin/productsAction";
import { UPDATE_PRODUCT_RESET } from "../../constance/admin/productConstant";
import { getProductDetails } from "../../actions/productAction";
import GlobalState from "../../GlobalState";
import { BiSolidUpArrow } from 'react-icons/bi';
import { BiSolidDownArrow } from 'react-icons/bi';
import { BsFillTrash3Fill } from 'react-icons/bs';

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

  const [cancelDiv, setCancelDiv] = useState({});

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [specification, setSpecification] = useState([])
  
  const [tempHead, setTempHead] = useState("")
  const [tempSubHead, setTempSubHead] = useState("")
  const [tempSpec, setTempSpec] = useState("")

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
      categories.map((cate)=> {
        if (cate.name === product.category) {
          setCategory(cate._id);
        }
      })
      setStock(product.Stock);
      let imagesArray = [];
      product.images.forEach((element) => {
        imagesArray.push(element.url);
      });
      setSpecification(product.specification)
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
    myForm.set("specification", JSON.stringify(specification));
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

  const handleSpec = () => {
    if (tempHead === "") {
      setMsg("Fill Heading first")
      return
    }
    if (tempSubHead === "") {
      setMsg("Fill Heading first")
      return
    }
    if (tempSpec === "") {
      setMsg("Fill Heading first")
      return
    }
    
    let newSpec = true;
    specification.forEach((spec)=> {
      if (spec.heading === tempHead) {
        spec.details.push({
          name: tempSubHead,
          spec: tempSpec
        });
        newSpec = false
        return;
      }
    })
    if (newSpec) {
      let spec = specification
      spec.push({
        heading: tempHead,
        details: [
          {
            name: tempSubHead,
            spec: tempSpec
          },
        ]
      })
      setSpecification(spec)
    }
    setTempSpec("")
    setTempSubHead("")
  }
  
  const handleIndexUpSpec = (id, spec) => {
    let changeIndex = specification
    changeIndex.map((spec)=>{
      if (spec._id === id) {
        const curentIndex = changeIndex.indexOf(spec)
        if (curentIndex === 0) {
          return
        }
        changeIndex.splice(curentIndex, 1);
        changeIndex.splice(curentIndex-1, 0, spec);
      }
    })
    setSpecification(changeIndex)
    navigate("#specification")
  }
  const handleIndexDownSpec = (id, spec) => {
    let changeIndex = specification
    changeIndex.map((spec)=>{
      if (spec._id === id) {
        const curentIndex = changeIndex.indexOf(spec)
        if (curentIndex === changeIndex.length-1) {
          return
        }
        changeIndex.splice(curentIndex, 1);
        changeIndex.splice(curentIndex+1, 0, spec);
      }
    })
    setSpecification(changeIndex)
    navigate("#specification")
  }

  const handleIndexUp = (id, sub) => {
    let changeIndex = specification
    changeIndex.map((spec)=>{
      if (spec._id === id) {
        const curentIndex = spec.details.indexOf(sub)
        if (curentIndex === 0) {
          return
        }
        spec.details.splice(curentIndex, 1);
        spec.details.splice(curentIndex-1, 0, sub);
      }
    })
    setSpecification(changeIndex)
    navigate("#specification")
  }
  const handleIndexDown = (id, sub) => {
    let changeIndex = specification
    changeIndex.map((spec)=>{
      if (spec._id === id) {
        const curentIndex = spec.details.indexOf(sub)
        if (curentIndex === spec.details.length-1) {
          return
        }
        spec.details.splice(curentIndex, 1);
        spec.details.splice(curentIndex+1, 0, sub);
      }
    })
    setSpecification(changeIndex)
    navigate("#specification")
  }
  const specDelete = () => {
    const final = specification.filter(function (letter) {
      return letter !== cancelDiv;
    });
    setSpecification(final)
    setCancelDiv({})
    navigate("#specification")
  }
  const subSpecDelete = (id) => {
    let process = specification
    process.map((spec)=> {
      if (spec._id === id) {
        const final = spec.details.filter(function (letter) {
          return letter !== cancelDiv;
        });
        spec.details = final
      }
      setSpecification(process)
      setCancelDiv({})
      navigate("#specification")
    })
  }
  // console.log(specification);
  return (
    <>
      <MetaDeta title="Update Product" />
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="signUpPage">
          <div className="productCreate">
            <h1>Update Product</h1>
            <form
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
            >
              <div className="div1">
                <div className="innerDiv1">
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
                </div>
                <div className="productDescription">
                  <label htmlFor="description">Product Desciption</label>
                  <textarea
                    placeholder="Description"
                    required
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={12}
                  ></textarea>
                </div>
              </div>

              {
                JSON.stringify(specification) && specification ? 
                  <div id="specification" className="specification" style={{boxShadow: "0 0 2px var(--black)"}}>
                    <h1 className="spch-head" style={{fontSize: "20px", margin: "10px"}}>Specification Preview</h1>
                    {
                      specification && specification.map((spec)=> (
                        <div className="spec-body">
                          <h2 className="spec-body-head" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span>
                              {spec.heading}
                            </span>
                            <div className="spec-action">
                              {cancelDiv === spec ? (
                                <div id="cancel" className="cancelDiv cancel-div-admin">
                                  <div className="cancelButtons">
                                    <p
                                      onClick={() => setCancelDiv(false)}
                                      style={{
                                        fontSize: "16px",
                                        padding: "10px",
                                        border: "1px solid var(--black)",
                                        color: "var(--black)",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Cancel
                                    </p>
                                    <p
                                      onClick={specDelete}
                                      className="v1button"
                                      style={{ fontSize: "16px", padding: "10px" }}
                                    >
                                      Delete
                                    </p>
                                  </div>
                                </div>
                              ) : null}
                              <div className="spec-order">
                                <div className="uparrow" onClick={()=> handleIndexUpSpec(spec._id, spec)}><BiSolidUpArrow /></div>
                                <div className="downarrow" onClick={()=> handleIndexDownSpec(spec._id, spec)}><BiSolidDownArrow /></div>
                              </div>
                              <div className="trash" onClick={()=> setCancelDiv(spec)}><BsFillTrash3Fill /></div>
                            </div>
                          </h2>
                          {
                            spec.details.map((sub)=> (
                              <div className="spec-sub-body" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <h3>{sub.name}</h3>
                                <div className="border-line"></div>
                                <pre>{sub.spec}</pre>
                                <div className="spec-action">
                                  {cancelDiv === sub ? (
                                    <div id="cancel" className="cancelDiv cancel-div-admin">
                                      <div className="cancelButtons">
                                        <p
                                          onClick={() => setCancelDiv(false)}
                                          style={{
                                            fontSize: "16px",
                                            padding: "10px",
                                            border: "1px solid var(--black)",
                                            cursor: "pointer",
                                          }}
                                        >
                                          Cancel
                                        </p>
                                        <p
                                          onClick={() => subSpecDelete(spec._id)}
                                          className="v1button"
                                          style={{ fontSize: "16px", padding: "10px" }}
                                        >
                                          Delete
                                        </p>
                                      </div>
                                    </div>
                                  ) : null}
                                  <div className="spec-order">
                                    <div className="uparrow" onClick={()=> handleIndexUp(spec._id, sub)}><BiSolidUpArrow /></div>
                                    <div className="downarrow" onClick={()=> handleIndexDown(spec._id, sub)}><BiSolidDownArrow /></div>
                                  </div>
                                  <div className="trash" onClick={()=> setCancelDiv(sub)}><BsFillTrash3Fill /></div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      ))
                    }
                  </div>
                : null
              }
              
              <div className="productSpecification">
                <label htmlFor="specification">Add Specification</label>
                <input type="text" className="heading" placeholder="Heading"  onChange={(e)=> setTempHead(e.target.value)} value={tempHead}/>
                <div className="sub-head">
                  <input type="text" className="subheading" placeholder="Sub-Heading"  onChange={(e)=> setTempSubHead(e.target.value)} value={tempSubHead}/>
                  <textarea
                    placeholder="Specification"
                    name="specification"
                    onChange={(e)=> setTempSpec(e.target.value)} value={tempSpec}
                    rows={6}
                  ></textarea>
                </div>
                <p className="v1button" style={{padding: "5px", margin: "5px"}} onClick={handleSpec}>Add</p>
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
