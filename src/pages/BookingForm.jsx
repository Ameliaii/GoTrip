import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Webcam from "react-webcam";
import { addBookingPhoto } from "../utils/photoDb";

// Import destination data
const destinations = {
  paris: {
    id: "paris",
    name: "Paris",
    englishName: "Paris",
    country: "France",
    pricePerNight: 1200,
  },
  santorini: {
    id: "santorini",
    name: "Santorini",
    englishName: "Santorini",
    country: "Greece",
    pricePerNight: 1500,
  },
  tokyo: {
    id: "tokyo",
    name: "Tokyo",
    englishName: "Tokyo",
    country: "Japan",
    pricePerNight: 1000,
  },
};

// Camera component
const WebcamCapture = ({ bookingId, onPhotoTaken }) => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isWebcamSupported, setIsWebcamSupported] = useState(true);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setImgSrc(base64String);
      console.log(
        "Photo file uploaded successfully, size:",
        base64String.length
      );
    };
    reader.onerror = () => {
      console.error("Failed to read file");
      setError("Failed to read file, please try again");
    };
    reader.readAsDataURL(file);
  };

  // Handle mobile device photo capture
  const handleMobileCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*";
      fileInputRef.current.capture = "environment";
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      return mobileRegex.test(userAgent);
    };

    const isMobileDevice = checkMobile();
    setIsMobile(isMobileDevice);

    // Check if browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log("Camera API not supported, switching to mobile device input mode");
      setIsWebcamSupported(false);
      return;
    }

    // Check camera permission when component loads
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        console.log("Camera permission obtained");
        setError(null);
      })
      .catch((err) => {
        console.error("Camera access error:", err);
        setIsWebcamSupported(false);
        if (err.name === "NotAllowedError") {
          setError("Please allow camera access to take a photo");
        } else if (err.name === "NotFoundError") {
          setError("No camera device found");
        } else if (err.name === "NotReadableError") {
          setError(
            "Camera may be in use by another application, please close other applications using the camera"
          );
        } else {
          setError(`Camera access failed: ${err.name || String(err)}`);
        }
      });
  }, []);

  const capture = useCallback(() => {
    console.log("Taking photo");
    if (webcamRef.current) {
      try {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(
          "Photo taken successfully, size:",
          imageSrc ? imageSrc.length : 0
        );
        setImgSrc(imageSrc);
      } catch (err) {
        console.error("Photo capture failed:", err);
        setError(`Photo capture failed: ${err}`);
      }
    } else {
      console.log("Camera reference does not exist");
      setError("Camera not initialized");
    }
  }, [webcamRef, setImgSrc]);

  const savePhoto = async () => {
    console.log("Saving photo", bookingId);
    if (imgSrc && bookingId) {
      try {
        await addBookingPhoto(bookingId, imgSrc);
        console.log("Photo saved successfully");
        onPhotoTaken();
      } catch (err) {
        console.error("Failed to save photo:", err);
        setError(`Failed to save photo: ${err}`);
      }
    }
  };

  const resetPhoto = () => {
    console.log("Resetting photo");
    setImgSrc(null);
    setError(null);
  };

  const videoConstraints = {
    width: 720,
    height: 480,
    facingMode: "user",
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-semibold mb-4">Take or upload ID photo</h2>

      {error && !isWebcamSupported && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>
            Camera function is not available, please use device camera directly
          </p>
        </div>
      )}

      {error && isWebcamSupported && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
          {isMobile && (
            <p className="mt-2 text-sm">
              Tips for mobile devices:
              <ul className="list-disc list-inside mt-1">
                <li>Use the latest version of Chrome, Firefox or Safari</li>
                <li>Grant camera permission to the browser</li>
                <li>Make sure camera is not in use by other applications</li>
              </ul>
            </p>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm underline"
          >
            Retry
          </button>
        </div>
      )}

      <div className="mb-4">
        {!imgSrc && isWebcamSupported && !error && (
          <Webcam
            audio={false}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg"
            className="w-full max-w-md mx-auto rounded-md"
            onUserMediaError={(err) => {
              console.error("Camera media error:", err);
              setIsWebcamSupported(false);
              setError(
                `Camera access failed: ${
                  err instanceof DOMException ? err.name : String(err)
                }`
              );
            }}
          />
        )}

        {!imgSrc && !isWebcamSupported && (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center w-full max-w-md mx-auto">
            <svg
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-gray-500 mb-3">Please use device camera to take photo</p>
            <button
              onClick={handleMobileCameraCapture}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-3"
            >
              Open Camera
            </button>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <p className="text-sm text-gray-500">or</p>
            <label className="mt-3 cursor-pointer">
              <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                Select from gallery
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}

        {imgSrc && (
          <img
            src={imgSrc}
            alt="Taken/uploaded photo"
            className="w-full max-w-md mx-auto rounded-md"
          />
        )}
      </div>

      <div className="flex justify-center space-x-3">
        {!imgSrc && isWebcamSupported && !error && (
          <button
            type="button"
            onClick={capture}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Take Photo
          </button>
        )}

        {imgSrc && (
          <>
            <button
              type="button"
              onClick={savePhoto}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Photo
            </button>
            <button
              type="button"
              onClick={resetPhoto}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const BookingForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const destinationIdFromQuery = queryParams.get("destination");

  const isEditMode = !!id;
  const [bookingId, setBookingId] = useState(id || uuidv4());

  const [formData, setFormData] = useState({
    destinationId: destinationIdFromQuery || "",
    startDate: "",
    endDate: "",
    guests: 1,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(isEditMode);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [locationInfo, setLocationInfo] = useState({
    latitude: null,
    longitude: null,
    address: null,
    error: null,
    isLoading: false,
  });

  const [showPhotoPopup, setShowPhotoPopup] = useState(false);

  // If editing mode, load booking data from localStorage
  useEffect(() => {
    if (isEditMode) {
      const savedBookings = localStorage.getItem("bookings");
      if (savedBookings) {
        const bookings = JSON.parse(savedBookings);
        const booking = bookings.find((b) => b.id === id);

        if (booking) {
          setFormData({
            destinationId: booking.destinationId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            guests: booking.guests,
          });
          setHasPhoto(booking.hasPhoto || false);
          if (booking.location) {
            setLocationInfo({
              ...locationInfo,
              latitude: booking.location.latitude,
              longitude: booking.location.longitude,
              address: booking.location.address || null,
            });
          }
        } else {
          setError("Booking information not found");
        }
      } else {
        setError("Booking information not found");
      }
      setLoading(false);
    }
  }, [id, isEditMode]);

  const handlePhotoTaken = () => {
    setHasPhoto(true);
    setShowPhotoPopup(false);
  };

  // Get user current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      const errorMsg = "Your browser does not support geolocation";
      console.error(errorMsg);
      setLocationInfo({
        ...locationInfo,
        error: errorMsg,
        isLoading: false,
      });
      return;
    }

    setLocationInfo({
      ...locationInfo,
      isLoading: true,
      error: null,
    });

    const handleSuccess = async (position) => {
      try {
        const { latitude, longitude, accuracy } = position.coords;
        console.log("Location details:", {
          latitude,
          longitude,
          accuracy,
          timestamp: position.timestamp,
        });

        setLocationInfo({
          ...locationInfo,
          latitude,
          longitude,
          isLoading: false,
          error: null,
        });

        // Try to get address
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=en`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data && data.display_name) {
            setLocationInfo((prev) => ({
              ...prev,
              address: data.display_name,
            }));
          }
        } catch (err) {
          console.error("Address lookup failed:", err);
          // Don't set error state as we still have coordinates
        }
      } catch (err) {
        console.error("Error processing location:", err);
        setLocationInfo({
          ...locationInfo,
          error: `Error processing location: ${err}`,
          isLoading: false,
        });
      }
    };

    const handleError = (error) => {
      console.error("Geolocation error:", {
        code: error.code,
        message: error.message,
        PERMISSION_DENIED: error.PERMISSION_DENIED,
        POSITION_UNAVAILABLE: error.POSITION_UNAVAILABLE,
        TIMEOUT: error.TIMEOUT,
      });

      let errorMessage = "";
      let detailedMessage = "";

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location access was denied";
          detailedMessage =
            "Please follow these steps to enable location:\n\n" +
            "For iOS Safari:\n" +
            "1. Open Settings\n" +
            "2. Scroll down to Safari\n" +
            "3. Tap Location\n" +
            "4. Select 'Allow' or 'Ask'\n\n" +
            "For Android Chrome:\n" +
            "1. Tap the lock icon (🔒) in the address bar\n" +
            "2. Tap Location\n" +
            "3. Select 'Allow'\n\n" +
            "After enabling, click 'Try Again' below";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable";
          detailedMessage =
            "Please check:\n" +
            "1. Your device's location service is turned on\n" +
            "2. You have a clear view of the sky (if using GPS)\n" +
            "3. You have an active internet connection";
          break;
        case error.TIMEOUT:
          errorMessage = "Location request timed out";
          detailedMessage =
            "The request took too long. This might be due to:\n" +
            "1. Poor GPS signal\n" +
            "2. Slow internet connection\n" +
            "Please try again in a better location";
          break;
        default:
          errorMessage = `Unknown error: ${error.message}`;
          detailedMessage =
            "Please try again or contact support if the issue persists";
      }

      setLocationInfo({
        ...locationInfo,
        error: `${errorMessage}\n\n${detailedMessage}`,
        isLoading: false,
      });
    };

    try {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

      console.log("Requesting location with options:", options);
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        options
      );
    } catch (err) {
      console.error("Error requesting location:", err);
      setLocationInfo({
        ...locationInfo,
        error: `Failed to request location: ${err}`,
        isLoading: false,
      });
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!formData.destinationId || !formData.startDate || !formData.endDate)
      return 0;

    const destination =
      destinations[formData.destinationId];
    if (!destination) return 0;

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const nights = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    return nights * destination.pricePerNight * formData.guests;
  };

  const handleChange = (
    e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Form validation
    if (!formData.destinationId) {
      setError("Please select a destination");
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      setError("Please select check-in and check-out dates");
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (start >= end) {
      setError("Check-out date must be after check-in date");
      return;
    }

    if (formData.guests < 1) {
      setError("At least 1 guest is required");
      return;
    }

    // Prepare booking data
    const destination =
      destinations[formData.destinationId];
    const totalPrice = calculateTotalPrice();

    const newBooking = {
      id: bookingId,
      destinationId: formData.destinationId,
      destinationName: destination.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      guests: formData.guests,
      totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
      hasPhoto,
    };

    // Add location information to booking data if available
    if (locationInfo.latitude && locationInfo.longitude) {
      newBooking.location = {
        latitude: locationInfo.latitude,
        longitude: locationInfo.longitude,
      };
      if (locationInfo.address) {
        newBooking.location.address = locationInfo.address;
      }
    }

    // Save to localStorage
    const savedBookings = localStorage.getItem("bookings");
    let bookings = savedBookings ? JSON.parse(savedBookings) : [];

    if (isEditMode) {
      bookings = bookings.map((booking) =>
        booking.id === id ? newBooking : booking
      );
    } else {
      bookings.push(newBooking);
    }

    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Navigate to bookings list page
    navigate("/bookings");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {isEditMode ? "Edit Booking" : "Create New Booking"}
        </h1>
        <p className="text-gray-600 mt-2">
          {isEditMode
            ? "Modify your travel plan"
            : "Fill in the information below to book your trip"}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Destination selection */}
            <div>
              <label
                htmlFor="destinationId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Destination
              </label>
              <select
                id="destinationId"
                name="destinationId"
                value={formData.destinationId}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                <option value="">Select Destination</option>
                {Object.values(destinations).map((destination) => (
                  <option key={destination.id} value={destination.id}>
                    {destination.name}, {destination.country}
                  </option>
                ))}
              </select>
            </div>

            {/* Date selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Check-in Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Check-out Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={
                    formData.startDate || new Date().toISOString().split("T")[0]
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* Guest count */}
            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Number of Guests
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                min="1"
                max="10"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Price preview */}
            {formData.destinationId &&
              formData.startDate &&
              formData.endDate && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Price Details
                  </h3>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Price per Night</span>
                    <span className="font-medium">
                      $
                      {destinations[
                        formData.destinationId
                      ]?.pricePerNight.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Number of Nights</span>
                    <span className="font-medium">
                      {Math.ceil(
                        (new Date(formData.endDate).getTime() -
                          new Date(formData.startDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      nights
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Number of Guests</span>
                    <span className="font-medium">
                      {formData.guests} guests
                    </span>
                  </div>
                  <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                    <span className="font-medium text-gray-900">
                      Total Price
                    </span>
                    <span className="font-bold text-lg">
                      ${calculateTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

            {/* Location information section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Location Information</h3>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  disabled={locationInfo.isLoading}
                >
                  {locationInfo.isLoading ? (
                    <span>Getting Location...</span>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Get Current Location
                    </>
                  )}
                </button>
              </div>

              {locationInfo.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p className="whitespace-pre-line font-medium mb-2">Error:</p>
                  <p className="whitespace-pre-line text-sm">
                    {locationInfo.error}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setLocationInfo({
                          ...locationInfo,
                          error: null,
                          isLoading: false,
                        });
                        getCurrentLocation();
                      }}
                      className="text-sm bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
                    >
                      Try Again
                    </button>
                    <a
                      href="https://support.google.com/chrome/answer/142065"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-red-700 underline hover:text-red-800"
                    >
                      How to enable location services
                    </a>
                  </div>
                </div>
              )}

              {locationInfo.latitude && locationInfo.longitude && (
                <div className="bg-green-50 border border-green-200 p-3 rounded-md">
                  <p className="font-medium text-green-800 mb-1">
                    Location Information Obtained
                  </p>
                  <p className="text-sm text-gray-600">
                    Longitude: {locationInfo.longitude.toFixed(6)}, Latitude:{" "}
                    {locationInfo.latitude.toFixed(6)}
                  </p>
                  {locationInfo.address && (
                    <p className="text-sm text-gray-600 mt-1">
                      Address: {locationInfo.address}
                    </p>
                  )}
                  <div className="mt-2">
                    <a
                      href={`https://maps.google.com/?q=${locationInfo.latitude},${locationInfo.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">ID Photo</h3>
              <div className="mb-2">
                {hasPhoto ? (
                  <div className="flex flex-col items-center">
                    <div className="bg-green-50 border border-green-200 p-3 rounded-md w-full mb-4">
                      <p className="text-green-800">
                        <svg
                          className="w-5 h-5 inline-block mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        ID Photo Uploaded
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 mb-2">
                    Please upload your ID card or passport photo for
                    verification
                  </p>
                )}
              </div>

              <Popup
                trigger={
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {hasPhoto ? "Retake Photo" : "Take ID Photo"}
                  </button>
                }
                modal
                nested
              >
                {(close) => (
                  <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Take ID Photo</h2>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={close}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <WebcamCapture
                      bookingId={bookingId}
                      onPhotoTaken={() => {
                        handlePhotoTaken();
                        close();
                      }}
                    />
                  </div>
                )}
              </Popup>
            </div>

            {/* Submit button */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate("/bookings")}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isEditMode ? "Update Booking" : "Complete Booking"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
