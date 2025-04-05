import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { Search, MapPin, Star, DollarSign } from 'lucide-react';
import Navbar from './navbar';

interface Accommodation {
  id: string;
  name: string;
  address: string;
  price: number;
  rating: number;
  image: string;
  type: string;
}



const AccommodationListPage: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState<Accommodation[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchAccommodations = async () => {
      // Simulating API call
      const data: Accommodation[] = [
        { id: '1', name: 'Luxury Loft', address: '123 College St', price: 800, rating: 4.8, image: '/placeholder.svg?height=300&width=400', type: 'Apartment' },
        { id: '2', name: 'Cozy Studio', address: '456 University Ave', price: 500, rating: 4.2, image: '/placeholder.svg?height=300&width=400', type: 'Studio' },
        { id: '3', name: 'Spacious Suite', address: '789 Campus Rd', price: 700, rating: 4.6, image: '/placeholder.svg?height=300&width=400', type: 'Suite' },
        { id: '4', name: 'Modern Dorm', address: '101 Dorm Lane', price: 400, rating: 4.0, image: '/placeholder.svg?height=300&width=400', type: 'Dorm' },
        { id: '5', name: 'Eco-Friendly Flat', address: '202 Green St', price: 600, rating: 4.5, image: '/placeholder.svg?height=300&width=400', type: 'Apartment' },
        { id: '6', name: 'Historic Townhouse', address: '303 Heritage Ave', price: 900, rating: 4.7, image: '/placeholder.svg?height=300&width=400', type: 'House' },
      ];
      setAccommodations(data);
      setFilteredAccommodations(data);
    };

    fetchAccommodations();
  }, []);

  useEffect(() => {
    const filtered = accommodations.filter(
      (acc) =>
        acc.price >= priceRange[0] &&
        acc.price <= priceRange[1] &&
        acc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedType === '' || acc.type === selectedType)
    );
    setFilteredAccommodations(filtered);
  }, [priceRange, searchTerm, selectedType, accommodations]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Find Your Perfect Accommodation</h1>
        
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-grow w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search accommodations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full md:w-48"
              />
              <span className="text-sm text-black whitespace-nowrap">Max ${priceRange[1]}</span>
            </div>
            <div className="w-full md:w-auto">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full md:w-auto px-3 py-2 bg-white border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Studio">Studio</option>
                <option value="Suite">Suite</option>
                <option value="Dorm">Dorm</option>
                <option value="House">House</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAccommodations.map((accommodation) => (
            <div key={accommodation.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <img src={accommodation.image} alt={accommodation.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{accommodation.name}</h2>
                <p className="text-gray-600 mb-4 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" /> {accommodation.address}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-green-600">${accommodation.price}/month</span>
                  <div className="flex items-center bg-green-100 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="font-semibold">{accommodation.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{accommodation.type}</span>
                  <Link to={`/accommodation/${accommodation.id}`}>
                    <Button variant="primary" size="small">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccommodationListPage;