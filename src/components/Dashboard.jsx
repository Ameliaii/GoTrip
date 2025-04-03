import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const updatedSearches = [
        searchQuery,
        ...recentSearches.filter((s) => s !== searchQuery),
      ].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      setSearchQuery("");
    }
  };

  const popularDestinations = [
    {
      id: "paris",
      name: "Paris",
      country: "France",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80",
    },
    {
      id: "santorini",
      name: "Santorini",
      country: "Greece",
      image:
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=500&q=80",
    },
    {
      id: "tokyo",
      name: "Tokyo",
      country: "Japan",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80",
    },
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      ),
      title: "Flights",
      description: "Best deals on flights worldwide",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
        </svg>
      ),
      title: "Hotels",
      description: "Luxurious stays at great prices",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Tours",
      description: "Guided experiences by locals",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      ),
      title: "Activities",
      description: "Unforgettable experiences",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[80vh] md:h-[70vh] bg-cover bg-center w-full">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-16">
          <div className="h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold mb-6 leading-tight max-w-4xl px-4">
              Your Journey Begins Here
            </h1>
            <p className="text-xl sm:text-2xl text-white mb-12 max-w-2xl px-4">
              Discover amazing destinations around the world
            </p>
            <form
              onSubmit={handleSearch}
              className="relative w-full max-w-xl mx-auto px-4"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where would you like to go?"
                  className="w-full p-5 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
              {recentSearches.length > 0 && (
                <div className="mt-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-lg">
                  <p className="text-sm text-gray-700 mb-2">最近搜索:</p>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <span
                        key={index}
                        onClick={() => setSearchQuery(search)}
                        className="cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-sm"
                      >
                        {search}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-20 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="py-16 sm:py-20 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {popularDestinations.map((destination) => (
              <Link
                to={`/destination/${destination.id}`}
                key={destination.id}
                className="block rounded-xl overflow-hidden shadow-xl bg-white transform hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 sm:h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600 text-lg">{destination.country}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-16 sm:py-20 bg-blue-600 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl text-white font-bold mb-8">
            Ready for Your Next Adventure?
          </h2>
          <button className="bg-white text-blue-600 font-semibold text-lg px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
            Start Planning Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
