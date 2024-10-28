const OrderTable = ({ orders, handleOrder }) => {
    return (
        <div className="overflow-x-auto overscroll-contain w-full"> {/* Enable horizontal scrolling */}
            <table className="w-full min-w-[900px] bg-white border border-gray-300 rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-gray-200 text-gray-700 text-sm">
                        <th className="w-[150px] py-2 px-2 md:py-3 md:px-4 border-b text-left">Email</th>
                        <th className="w-[150px] py-2 px-2 md:py-3 md:px-4 border-b text-left">Pick-Up</th>
                        <th className="w-[150px] py-2 px-2 md:py-3 md:px-4 border-b text-left">Delivery</th>
                        <th className="w-[100px] py-2 px-2 md:py-3 md:px-4 border-b text-left">Desc.</th>
                        <th className="w-[80px] py-2 px-2 md:py-3 md:px-4 border-b text-left">Status</th>
                        <th className="w-[100px] py-2 px-2 md:py-3 md:px-4 border-b text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr
                                onClick={() => handleOrder(order._id)}
                                key={index}
                                className="hover:bg-gray-100 text-sm"
                            >
                                <td className="py-2 px-2 md:py-3 md:px-4 border-b text-left">
                                    {order.user_email}
                                </td>
                                <td className="py-2 px-2 md:py-3 md:px-4 border-b text-left">
                                    {order.pickup_address}
                                </td>
                                <td className="py-2 px-2 md:py-3 md:px-4 border-b text-left">
                                    {order.delivery_address}
                                </td>
                                <td className="py-2 px-2 md:py-3 md:px-4 border-b text-left">
                                    {order.description}
                                </td>
                                <td className="py-2 px-2 md:py-3 md:px-4 border-b text-left">
                                    {order.status}
                                </td>
                                <td className="py-2 px-2 md:py-3 md:px-4 border-b text-left">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs md:text-sm hover:bg-blue-600 transition-colors">
                                        Action
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-xs md:text-sm">
                                No orders available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
