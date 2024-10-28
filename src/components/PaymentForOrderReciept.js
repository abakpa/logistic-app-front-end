import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrderPaymentByIdRequest  } from '../redux/slices/orderSlice';
import { useSelector, useDispatch } from 'react-redux';
import { jsPDF } from "jspdf";

const PaymentForOrderReciept = () => {
    const { id } = useParams();  // Extract orderId from URL params
    const dispatch = useDispatch();
    const { order } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrderPaymentByIdRequest({id}));
      }, [dispatch, id]);

    const handleDownload = () => {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(18);
      doc.text("Receipt", 20, 20);

      // Add order details
      doc.setFontSize(12);
      doc.text(`Order ID:`, 20, 30);
      doc.text(`${order.orderId}`, 80, 30);
      doc.text(`Value:`, 20, 40);
      doc.text(`₦${order.value}`, 80, 40);
      doc.text(`Weight:`, 20, 50);
      doc.text(`${order.weight} kg`, 80, 50);
      doc.text(`Quantity:`, 20, 60);
      doc.text(`${order.quantity}`, 80, 60);
      doc.text(`Shipping Cost:`, 20, 70);
      doc.text(`₦${order.shipping_cost}`, 80, 70);
      doc.text(`Insurance:`, 20, 80);
      doc.text(`₦${order.insurance}`, 80, 80);
      doc.text(`Total Cost:`, 20, 90);
      doc.text(`₦${order.total_cost}`, 80, 90);
      doc.text(`Date:`, 20, 100);
      doc.text(`${new Date(order.updatedAt).toLocaleDateString()}`, 80, 100);

      // Save the PDF
      doc.save("receipt.pdf");
    };

    const printReceipt = () => {
      const printContent = document.getElementById("receipt-content").innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent;
      window.print();

      document.body.innerHTML = originalContent;
      window.location.reload(); // Refresh to restore the original page content
    };

    return (
      <div id="receipt-content" className="max-w-xl mx-auto bg-white mb-24 shadow-lg rounded-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Receipt</h2>

        {/* Order Details */}
        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Order ID:</span>
            <span className="text-gray-600">{order.orderId}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Value:</span>
            <span className="text-gray-600">₦{order.value}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Weight:</span>
            <span className="text-gray-600">{order.weight} kg</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Quantity:</span>
            <span className="text-gray-600">{order.quantity}</span>
          </div>

          <div className="border-t flex justify-between items-center">
            <span className="font-semibold text-gray-700">Shipping Cost:</span>
            <span className="text-gray-600">₦{order.shipping_cost}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Insurance:</span>
            <span className="text-gray-600">₦{order.insurance}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Total Cost:</span>
            <span className="text-gray-600">₦{order.total_cost}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Date:</span>
            <span className="text-gray-600">{new Date(order.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Download and Print Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleDownload}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Download Receipt
          </button>

          <button
            onClick={printReceipt}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Print Receipt
          </button>
        </div>
      </div>
    );
};

export default PaymentForOrderReciept;
