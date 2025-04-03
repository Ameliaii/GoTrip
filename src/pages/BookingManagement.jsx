import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { getBookingPhotoSrc } from "../utils/photoDb";

// 查看照片组件
const ViewBookingPhoto = ({ id }) => {
  const photoSrc = getBookingPhotoSrc(id);

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-semibold mb-4">ID Photo</h2>
      {photoSrc ? (
        <img
          src={photoSrc}
          alt="ID Photo"
          className="max-w-md mx-auto rounded-md"
        />
      ) : (
        <div className="bg-gray-100 p-8 rounded-md">
          <p className="text-gray-500">No photo found</p>
        </div>
      )}
    </div>
  );
};

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const destinationId = queryParams.get("destination");

  // 从localStorage加载预订数据
  useEffect(() => {
    const savedBookings = localStorage.getItem("bookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
    setLoading(false);
  }, []);

  // 保存预订数据到localStorage
  const saveBookings = (updatedBookings) => {
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  // 删除预订
  const deleteBooking = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      const updatedBookings = bookings.filter((booking) => booking.id !== id);
      saveBookings(updatedBookings);
    }
  };

  // 更新预订状态
  const updateBookingStatus = (id, status) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status } : booking
    );
    saveBookings(updatedBookings);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <button
          onClick={() =>
            navigate(
              "/bookings/new" +
                (destinationId ? `?destination=${destinationId}` : "")
            )
          }
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          New Booking
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h2 className="text-xl font-semibold mb-2">No Bookings</h2>
          <p className="text-gray-600 mb-6">
            You don't have any travel bookings yet. Start planning your trip
            now!
          </p>
          <button
            onClick={() =>
              navigate(
                "/bookings/new" +
                  (destinationId ? `?destination=${destinationId}` : "")
              )
            }
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New Booking
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guests
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Photo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {booking.destinationName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.startDate} - {booking.endDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.guests} guests
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${booking.totalPrice.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status === "confirmed"
                          ? "Confirmed"
                          : booking.status === "cancelled"
                          ? "Cancelled"
                          : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.hasPhoto ? (
                        <Popup
                          trigger={
                            <button className="text-blue-600 hover:text-blue-900">
                              View Photo
                            </button>
                          }
                          modal
                        >
                          {/* @ts-ignore */}
                          {(close) => (
                            <div className="p-2">
                              <ViewBookingPhoto id={booking.id} />
                              <button
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mt-4 float-right"
                                onClick={close}
                              >
                                Close
                              </button>
                            </div>
                          )}
                        </Popup>
                      ) : (
                        <span className="text-gray-400">Not uploaded</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() =>
                            navigate(`/bookings/edit/${booking.id}`)
                          }
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                        {booking.status === "pending" && (
                          <button
                            onClick={() =>
                              updateBookingStatus(booking.id, "confirmed")
                            }
                            className="text-green-600 hover:text-green-900"
                          >
                            Confirm
                          </button>
                        )}
                        {booking.status === "pending" && (
                          <button
                            onClick={() =>
                              updateBookingStatus(booking.id, "cancelled")
                            }
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
