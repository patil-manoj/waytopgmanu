import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Star, ArrowRight, Shield, Clock, Building,
  Heart, Sparkles, CheckCircle, Coffee, Wifi, Snowflake,
  GraduationCap, DollarSign
} from 'lucide-react';
import Footer from './Footer';
import Button from './Button';
import Navbar from './navbar';

const cities = [
  { name: "Mumbai", count: "500+", image: "/placeholder.svg?height=300&width=400" },
  { name: "Bangalore", count: "450+", image: "/placeholder.svg?height=300&width=400" },
  { name: "Delhi", count: "400+", image: "/placeholder.svg?height=300&width=400" },
  { name: "Pune", count: "350+", image: "/placeholder.svg?height=300&width=400" }
];

const testimonials = [
  {
    name: "Priya Singh",
    role: "Engineering Student",
    image: "/placeholder.svg?height=100&width=100",
    text: "Way2PG made finding my dream accommodation so easy! The verified listings gave me peace of mind.",
    university: "IIT Mumbai"
  },
  {
    name: "Rahul Sharma",
    role: "Medical Student",
    image: "/placeholder.svg?height=100&width=100",
    text: "Best platform for students! Found an amazing PG near my college within my budget.",
    university: "AIIMS Delhi"
  },
  {
    name: "Aisha Patel",
    role: "MBA Student",
    image: "/placeholder.svg?height=100&width=100",
    text: "The booking process was smooth and the support team was incredibly helpful!",
    university: "IIM Bangalore"
  }
];

const featuredAccommodations = [
  { 
    id: 1, 
    name: "Emerald Heights Premium", 
    location: "Near IIT Mumbai", 
    rating: 4.8,
    reviews: 124,
    price: "₹15,000/month",
    discount: "10% off on semester booking",
    amenities: ["WiFi", "AC", "Gym", "Study Room"],
    tags: ["Trending", "Premium"],
    image: "/placeholder.svg?height=300&width=400",
    saved: false
  },
  { 
    id: 2, 
    name: "Serene Student Suites", 
    location: "South Delhi", 
    rating: 4.7,
    reviews: 98,
    price: "₹12,000/month",
    discount: "First month free",
    amenities: ["WiFi", "Laundry", "Cafeteria", "Security"],
    tags: ["Best Value", "Female Only"],
    image: "/placeholder.svg?height=300&width=400",
    saved: false
  },
  { 
    id: 3, 
    name: "Tech Valley Residences", 
    location: "Electronic City, Bangalore", 
    rating: 4.9,
    reviews: 156,
    price: "₹18,000/month",
    discount: "20% off for yearly booking",
    amenities: ["WiFi", "AC", "Pool", "Gaming Room"],
    tags: ["Luxury", "Co-living"],
    image: "/placeholder.svg?height=300&width=400",
    saved: false
  }
];

const stats = [
  { number: "20,000+", label: "Happy Students", icon: GraduationCap },
  { number: "1,500+", label: "Verified Properties", icon: CheckCircle },
  { number: "50+", label: "Cities Covered", icon: Building },
  { number: "100%", label: "Satisfaction Rate", icon: Heart }
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [savedAccommodations, setSavedAccommodations] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    navigate('/accommodations', { state: { search: searchQuery } });
  };

  const toggleSave = (id: number) => {
    setSavedAccommodations(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-600/90 mix-blend-multiply" />
            <div className="h-full w-full bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center bg-fixed" />
          </div>
          
          <div className="relative container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block mb-6"
              >
                <span className="inline-flex items-center px-6 py-2 rounded-full bg-green-400/20 backdrop-blur-sm text-green-100 text-sm font-medium">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Trusted by 20,000+ Students Across India
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Find Your Dream
                <span className="block text-green-400">Student Accommodation</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-12 text-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Discover verified, affordable, and comfortable PGs & hostels
                near your college
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-3 transform hover:scale-102 transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search by college, area or city..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-transparent text-gray-800 focus:outline-none text-lg"
                      />
                    </div>
                    <Button 
                      variant="primary" 
                      size="large" 
                      onClick={handleSearch}
                      className="md:w-auto w-full rounded-xl px-8 py-4 text-lg font-semibold"
                    >
                      Find Accommodation
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-wrap justify-center gap-4 text-gray-200">
                  <span className="flex items-center text-sm">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Verified Listings
                  </span>
                  <span className="flex items-center text-sm">
                    <Shield className="w-5 h-5 mr-2 text-green-400" />
                    Secure Payments
                  </span>
                  <span className="flex items-center text-sm">
                    <Clock className="w-5 h-5 mr-2 text-green-400" />
                    24/7 Support
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <stat.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Cities */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Popular Cities</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover student accommodations in these top educational hubs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cities.map((city, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => navigate('/accommodations', { state: { city: city.name } })}
                >
                  <div className="aspect-w-4 aspect-h-3">
                    <img 
                      src={city.image} 
                      alt={city.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{city.name}</h3>
                      <p className="text-green-400 font-medium">{city.count} Properties</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Accommodations */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-4">
                Featured Listings
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Popular Student Accommodations
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our handpicked selection of premium accommodations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredAccommodations.map((accommodation, index) => (
                <motion.div
                  key={accommodation.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative group">
                    <img 
                      src={accommodation.image} 
                      alt={accommodation.name} 
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      {accommodation.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-green-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => toggleSave(accommodation.id)}
                      className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-colors duration-200 hover:bg-green-50"
                    >
                      <Heart 
                        className={`w-5 h-5 ${savedAccommodations.includes(accommodation.id) ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
                      />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">{accommodation.name}</h4>
                        <p className="text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-green-500" />
                          {accommodation.location}
                        </p>
                      </div>
                      <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-bold text-gray-800">{accommodation.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({accommodation.reviews})</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {accommodation.amenities.map((amenity, i) => (
                          <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                            {amenity === 'WiFi' && <Wifi className="w-3 h-3 mr-1" />}
                            {amenity === 'AC' && <Snowflake className="w-3 h-3 mr-1" />}
                            {amenity === 'Study Room' && <GraduationCap className="w-3 h-3 mr-1" />}
                            {amenity === 'Cafeteria' && <Coffee className="w-3 h-3 mr-1" />}
                            {amenity}
                          </span>
                        ))}
                      </div>

                      {accommodation.discount && (
                        <div className="mb-4 px-3 py-2 bg-green-50 rounded-lg">
                          <p className="text-green-600 text-sm font-medium flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {accommodation.discount}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-green-600">{accommodation.price}</span>
                          <span className="text-gray-500 text-sm">/month</span>
                        </div>
                        <Button 
                          variant="primary" 
                          size="small"
                          onClick={() => navigate(`/accommodation/${accommodation.id}`)}
                          className="flex items-center"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                What Our Students Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hear from students who found their perfect accommodation through Way2PG
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="flex-shrink-0">
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-xl text-gray-700 mb-6 italic">
                        "{testimonials[currentTestimonial].text}"
                      </p>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          {testimonials[currentTestimonial].name}
                        </h4>
                        <p className="text-green-600">{testimonials[currentTestimonial].role}</p>
                        <p className="text-gray-500 text-sm">{testimonials[currentTestimonial].university}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                      index === currentTestimonial ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1600')] bg-cover bg-center opacity-20" />
          </div>

          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Find Your Perfect Home?
              </h3>
              <p className="text-xl text-gray-100 mb-10">
                Join thousands of students who have found their ideal accommodation through Way2PG
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary" 
                  size="large" 
                  onClick={() => navigate('/signup')}
                  className="bg-grey text-green-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 inline-block" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="large" 
                  onClick={() => navigate('/about')}
                  className="border-2 border-white text-green hover:bg-white/20 text-lg hover:text-white px-8 py-4 rounded-xl transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full overflow-hidden">
            <div className="relative h-20">
              <div className="absolute bottom-0 left-0 right-0">
                <svg
                  viewBox="0 0 1440 320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillOpacity="0.05"
                    d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;