import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useCart } from "./ContextReducer";
export default function Card(props) {
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  

  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }

  const handleAddToCart = async () => {
    // Find the item in the cart with the same ID and size
    let art = data.find((item) => item.id === props.articles._id && item.size === size);
  
    if (art) {
      // If the art with the same size already exists, update the quantity and price
      await dispatch({
        type: "UPDATE",
        id: props.articles._id,
        size: size,         // Include size in the update
        price: finalPrice,  // Ensure the price is correctly calculated based on the qty and size
        qty: qty,           // New quantity to be added
      });
    } else {
      // If the size is different or the art is not in the cart, add it as a new item
      await dispatch({
        type: "ADD",
        id: props.articles._id,
        name: props.articles.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };
  
  
  


  useEffect(() => {
    setSize(priceRef.current.value);
    
  }, []);

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]); //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)
  return (
    <div>
      <div className="card mt-3" style={{ width: "17rem", maxHeight: "360px" }}>
        <img
          src={props.ImgSrc}
          className="card-img-top"
          alt="..."
          style={{ height: "190px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.artName}</h5>
          {/* <p className="card-text">This is some random text. This is description.</p> */}
          <div className="container w-100 p-0" style={{ height: "38px" }}>
            <select
              className="m-2 h-100 w-20 bg-warning text-black rounded"
              style={{ select: "#FF0000" }}
              onChange={handleQty}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 w-20 bg-warning text-black rounded"
              style={{ select: "#FF0000" }}
              ref={priceRef}
              onChange={handleOptions}
            >
              {priceOptions.map((i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </select>
            <div className=" d-inline ms-2 h-100 w-20 fs-5">
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button
            className={`btn btn-warning justify-center ms-2 `}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
//
