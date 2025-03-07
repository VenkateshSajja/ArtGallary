import React from "react";
import Delete from "@mui/icons-material/Delete";
import { useCart, useDispatch } from "../components/ContextReducer";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatch();
  const navigate = useNavigate();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3 text-light">The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    try {
      let response = await fetch(`http://localhost:3100/api/orderData`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      console.log("Order Response:", response);

      if (response.ok) {
        navigate("/invoice", { state: { order: data, total: totalPrice } }); // Navigate to invoice page
      } else {
        console.log("Error in order submission:", response.statusText);
      }
    } catch (error) {
      console.error("Error in order submission:", error);
    }
  };

  let totalPrice = data.reduce((total, art) => total + art.price, 0);
  return (
    <div>
      {console.log(data)}
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table">
          <thead className=" text-warning fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="text-light">
            {data.map((art, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{art.name}</td>
                <td>{art.qty}</td>
                <td>{art.size}</td>
                <td>{art.price}</td>
                <td>
                  <button type="button" className="btn-danger btn p-0">
                    <Delete
                      onClick={() => dispatch({ type: "REMOVE", index })}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 text-light">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-warning mt-5 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
