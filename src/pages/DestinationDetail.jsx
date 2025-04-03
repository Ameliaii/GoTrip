import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// Mock data
const destinations = {
  paris: {
    id: "paris",
    name: "Paris",
    englishName: "Paris",
    country: "France",
    rating: 4.8,
    reviewCount: 1243,
    description:
      "Paris is the capital and largest city of France, and one of Europe's most important centers of politics, culture, and art. The city is renowned for its romantic atmosphere, art museums, historic architecture, and cuisine.",
    longDescription:
      "Known as the 'City of Light', Paris boasts numerous world-class attractions and cultural heritage sites. The Eiffel Tower, Paris's iconic landmark, attracts millions of visitors annually. The Louvre, one of the world's largest art museums, houses countless artistic treasures including the Mona Lisa. Notre-Dame Cathedral, a masterpiece of Gothic architecture, remains an integral part of Paris despite damage from the 2019 fire. The Champs-Élysées is one of the world's most famous shopping streets, connecting the Arc de Triomphe to Place de la Concorde. Montmartre is famous for its artistic atmosphere and the Sacré-Cœur Basilica. Paris is also celebrated for its refined cuisine, fashion, and café culture.",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80",
      "https://images.unsplash.com/photo-1541778480-81d5d2aa4bbe?w=1200&q=80",
      "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=1200&q=80",
    ],
    attractions: [
    
      {
        name: "The Louvre",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?w=500&q=80",
      },
      {
        name: "Notre-Dame Cathedral",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=500&q=80",
      },
      {
        name: "Arc de Triomphe",
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?w=500&q=80",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Michael Smith",
        date: "2023-10-15",
        rating: 5,
        comment:
          "Paris is one of the most beautiful cities I've ever visited. The night view of the Eiffel Tower is unforgettable!",
      },
      {
        id: 2,
        user: "Emma Wilson",
        date: "2023-09-22",
        rating: 4,
        comment:
          "The art collection at the Louvre is amazing, though the queues can be quite long.",
      },
      {
        id: 3,
        user: "Sophie Martin",
        date: "2023-08-05",
        rating: 5,
        comment:
          "Shopping on the Champs-Élysées was fantastic, albeit expensive.",
      },
    ],
  },
  santorini: {
    id: "santorini",
    name: "Santorini",
    englishName: "Santorini",
    country: "Greece",
    rating: 4.9,
    reviewCount: 987,
    description:
      "Santorini is an island in Greece's Cyclades islands in the Aegean Sea, famous for its spectacular ocean views, white-washed buildings, and blue-domed churches.",
    longDescription:
      "Santorini is a volcanic island that creates breathtaking landscapes. Its most famous features are the white buildings and blue-domed churches perched on cliffs, particularly in the towns of Oia and Fira. The sunsets here are considered among the most beautiful in the world, drawing crowds of visitors daily. The island also features unique red and black sand beaches, as well as the ancient site of Akrotiri, a well-preserved prehistoric settlement. Santorini's cuisine is known for its fresh seafood and locally produced wines.",
    images: [
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=80",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80",
    ],
    attractions: [
      {
        name: "Oia Village",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500&q=80",
      },
      {
        name: "Red Beach",
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80",
      },
      {
        name: "Akrotiri Ruins",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=500&q=80",
      },
      {
        name: "Fira Town",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=500&q=80",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "David Brown",
        date: "2023-07-20",
        rating: 5,
        comment:
          "The sunset in Santorini is the most beautiful I've ever seen. Absolutely worth visiting!",
      },
      {
        id: 2,
        user: "Laura Taylor",
        date: "2023-06-15",
        rating: 5,
        comment:
          "The white buildings against the blue sea create a stunning view that looks unreal.",
      },
      {
        id: 3,
        user: "James Anderson",
        date: "2023-05-10",
        rating: 4,
        comment:
          "Oia is beautiful but gets very crowded. I recommend visiting early in the morning.",
      },
    ],
  },
  tokyo: {
    id: "tokyo",
    name: "Tokyo",
    englishName: "Tokyo",
    country: "Japan",
    rating: 4.7,
    reviewCount: 1567,
    description:
      "Tokyo is Japan's capital and largest city, a metropolis that perfectly blends tradition with modernity, offering rich culture, cuisine, and shopping experiences.",
    longDescription:
      "Tokyo is a vibrant city featuring modern skyscrapers alongside ancient temples and gardens. Shinjuku and Shibuya are Tokyo's busiest commercial districts, packed with shopping centers, restaurants, and entertainment venues. Senso-ji is one of Tokyo's oldest temples, attracting numerous visitors. The city also has many beautiful parks and gardens, such as Ueno Park and Shinjuku Gyoen. Tokyo Disneyland is one of Asia's most popular theme parks. Tokyo's food culture is incredibly diverse, from Michelin-starred restaurants to street food. The city is also a paradise for anime fans and electronics enthusiasts, with Akihabara Electric Town being the perfect place to shop for the latest electronics and anime merchandise.",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1200&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&q=80",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&q=80",
    ],
    attractions: [
      {
        name: "Tokyo Tower",
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=500&q=80",
      },
     
      {
        name: "Shibuya Crossing",
        rating: 4.5,
        image:
          "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=500&q=80",
      },
     
    ],
    reviews: [
      {
        id: 1,
        user: "Alex Johnson",
        date: "2023-09-05",
        rating: 5,
        comment:
          "Tokyo perfectly blends technology with tradition. The Shibuya Crossing is mind-blowing!",
      },
      {
        id: 2,
        user: "Maria Garcia",
        date: "2023-08-12",
        rating: 4,
        comment:
          "Amazing food everywhere - ramen, sushi, yakitori, all delicious!",
      },
      {
        id: 3,
        user: "Tom Wilson",
        date: "2023-07-25",
        rating: 5,
        comment:
          "Akihabara is an anime fan's paradise. Bought lots of merchandise!",
      },
    ],
  },
};

const DestinationDetail = () => {
  const { id } = useParams();
  const destination = destinations[id];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Destination Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === destination.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? destination.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="pb-12 bg-gray-50">
      {/* Image carousel */}
      <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={destination.images[currentImageIndex]}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 focus:outline-none"
          aria-label="Previous image"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 focus:outline-none"
          aria-label="Next image"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {destination.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex
                  ? "bg-white"
                  : "bg-white bg-opacity-50"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Title and basic information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {destination.englishName}
              </h1>
              <p className="text-gray-600 mt-2 flex items-center">
                <span>{destination.country}</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1">{destination.rating}</span>
                </span>
                <span className="mx-2">•</span>
                <span>{destination.reviewCount} reviews</span>
              </p>
            </div>
            <button
              onClick={() =>
                navigate(`/bookings/new?destination=${destination.id}`)
              }
              className="mt-4 md:mt-0 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book
            </button>
          </div>

          {/* Detailed description */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">
              About {destination.englishName}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {destination.longDescription}
            </p>
          </div>

          {/* Attractions list */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-6">Popular Attractions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destination.attractions.map((attraction, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium">{attraction.name}</h3>
                    <div className="flex items-center mt-1">
                      <svg
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm text-gray-600">
                        {attraction.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Reviews</h2>
            <div className="space-y-6">
              {destination.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {review.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{review.user}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <div className="ml-auto flex items-center">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
