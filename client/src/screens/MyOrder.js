import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null); // Start with null for clearer checks

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        console.log("Fetching orders for email:", userEmail); // Log the email
        try {
            const response = await fetch(`http://localhost:3100/api/myOrderData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail })
            });

            // Log the status and response
            console.log("Response Status:", response.status);
            const data = await response.json();
            console.log("Response Data:", data); // Log the returned data
            setOrderData(data.orderData); // Ensure to access the right key
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData && orderData.order_data && orderData.order_data.length > 0 ? (
                        orderData.order_data.slice(0).reverse().map((item, index) => (
                            item.map((arrayData, arrayIndex) => (
                                <div key={arrayIndex}>
                                    {arrayData.Order_date ? (
                                        <div className='m-auto mt-5'>
                                            {arrayData.Order_date}
                                            <hr />
                                        </div>
                                    ) : (
                                        <div className='col-12 col-md-6 col-lg-4'>
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1'>{arrayData.qty}</span>
                                                        <span className='m-1'>{arrayData.size}</span>
                                                        <span className='m-1'>{arrayData.Order_date}</span>
                                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                            ₹{arrayData.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ))
                    ) : (
                        <div className="m-5 w-100 text-center fs-3">No orders found!</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
