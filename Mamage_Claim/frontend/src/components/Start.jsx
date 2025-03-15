import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const images = [
    'https://media.istockphoto.com/id/1298817878/photo/sales-executive-stock-photo.jpg?s=612x612&w=0&k=20&c=hsFU7q6tXfAPs6HY47Zb02TGB4K59UdyOdklIq1FZcY=',
    'https://media.istockphoto.com/id/1204852703/photo/real-estate-agent-with-client-at-village.jpg?s=612x612&w=0&k=20&c=Beo8_XQXLstHBv5vV6lHCz_jvtKPx26kFLaHuuZFEA4=',
    'https://www.csrbox.org/media/HDFC_RURAL_1.PNG',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZWHSroDAOYpmn0LhIFRjQ7_J8YdfwDwZ7bf2aKlczLJlCOTuKIiUtzY26uuCfjzt5UQk&usqp=CAU',
    'https://bsmedia.business-standard.com/_media/bs/img/article/2024-04/04/full/1712228621-9858.jpg?im=FeatureCrop,size=(826,465)'
];

const Start = () => {
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex flex-col items-center text-center p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">
        Join <span className="text-yellow-500">Insurance</span> Today!
      </h1>


      <div className="flex space-x-4 mb-6">
        <Link to="/register">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition">
            Login
          </button>
        </Link>
      </div>

      <div className="relative w-full max-w-3xl mt-6 overflow-hidden">
        <div className="w-full h-[320px] md:h-[420px] rounded-lg shadow-lg flex items-center justify-center bg-gray-200">
          <img
            src={images[currentIndex]}
            alt="Insurance Ad"
            className="w-full h-full object-cover rounded-lg transition-opacity duration-1000 ease-in-out"
          />
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-full shadow-md hover:bg-gray-700 transition"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-full shadow-md hover:bg-gray-700 transition"
        >
          ›
        </button>
      </div>

      <div className="mt-8 text-center text-lg max-w-2xl">
        <p className="bg-white text-blue-900 py-3 px-6 rounded-lg shadow-md font-semibold">
          ✅ Get **lifetime coverage** with affordable premiums!  
          ✅ **Save tax under Section 80C** with LIC-approved plans!  
        </p>
      </div>
    </div>
  );
};

export default Start;
