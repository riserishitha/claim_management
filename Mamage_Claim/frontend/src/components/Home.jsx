import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const images = [
  'https://media.istockphoto.com/id/1298817878/photo/sales-executive-stock-photo.jpg?s=612x612&w=0&k=20&c=hsFU7q6tXfAPs6HY47Zb02TGB4K59UdyOdklIq1FZcY=',
  'https://media.istockphoto.com/id/1204852703/photo/real-estate-agent-with-client-at-village.jpg?s=612x612&w=0&k=20&c=Beo8_XQXLstHBv5vV6lHCz_jvtKPx26kFLaHuuZFEA4=',
  'https://www.csrbox.org/media/HDFC_RURAL_1.PNG',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZWHSroDAOYpmn0LhIFRjQ7_J8YdfwDwZ7bf2aKlczLJlCOTuKIiUtzY26uuCfjzt5UQk&usqp=CAU',
  'https://bsmedia.business-standard.com/_media/bs/img/article/2024-04/04/full/1712228621-9858.jpg?im=FeatureCrop,size=(826,465)'
];

const Home = () => {
  const navigate = useNavigate();
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6">

      <h1 className="text-4xl font-bold text-center mb-4">
        Secure Your Future with <span className="text-yellow-300">Saving Insurance</span>
      </h1>
      <p className="text-lg text-center max-w-2xl mb-6">
        Get the best insurance plans to protect your life, family, and assets.  
        <span className="font-semibold"> Trusted by over 10,000+ people worldwide!</span>
      </p>


      <button
        onClick={() => navigate('/start')}
        className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-yellow-500 transition transform hover:scale-105"
      >
        Start Now
      </button>


      <div className="relative w-full max-w-3xl mt-6 overflow-hidden">
        <div className="w-full h-[300px] md:h-[400px] rounded-lg shadow-lg flex items-center justify-center bg-gray-200">
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
    </div>
  );
};

export default Home;
