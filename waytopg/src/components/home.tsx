import React from 'react';
// import { Link } from 'react-router-dom';
import { Search, MapPin, Star, ArrowRight } from 'lucide-react';
// import Footer from './footer';
import Footer from './Footer';
import Button from './Button';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

const featuredAccommodations = [
  { id: 1, name: "Emerald Heights", location: "Near University", rating: 4.8, image: "/placeholder.svg?height=200&width=300" },
  { id: 2, name: "Jade Loft", location: "Downtown", rating: 4.6, image: "/placeholder.svg?height=200&width=300" },
  { id: 3, name: "Verdant View", location: "Riverside Campus", rating: 4.7, image: "/placeholder.svg?height=200&width=300" },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

    const handleclick = () => {
        navigate('/accommodations');
    };
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="hero bg-gradient-to-r from-green-500 to-green-600 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Find Your Perfect<br />Student Home</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">Discover sustainable and comfortable accommodations near your campus</p>
            <div className="max-w-3xl mx-auto bg-white rounded-full shadow-2xl flex items-center p-2">
              <input
                type="text"
                placeholder="Enter university or city..."
                className="flex-grow px-6 py-3 bg-transparent text-gray-800 focus:outline-none text-lg"
              />
              <Button variant="primary" size="large" className="rounded-full">
                <Search className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </section>

        <section className="featured-accommodations py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-12 text-center text-gray-800">Featured Accommodations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {featuredAccommodations.map((accommodation) => (
                <div key={accommodation.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl">
                  <img src={accommodation.image} alt={accommodation.name} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h4 className="text-2xl font-semibold mb-2 text-gray-800">{accommodation.name}</h4>
                    <p className="text-gray-600 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-green-500" /> {accommodation.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 mr-1" />
                        <span className="text-lg font-semibold">{accommodation.rating}</span>
                      </div>
                      <Button variant="secondary" size="small">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta bg-gradient-to-r from-green-100 to-green-200 py-20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-4xl font-bold mb-6 text-gray-800">Ready to Find Your Home?</h3>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Browse our extensive list of sustainable student accommodations and find the perfect match for you and the planet.</p>
            <Button variant="primary" size="large" onClick={handleclick}  className="inline-flex items-center">
              View All Listings
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;