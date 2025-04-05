import React from 'react';
import { motion } from 'framer-motion';
import { Users, Home, GraduationCap, Building2, ShieldCheck } from 'lucide-react';
import Navbar from './navbar';
import Footer from './Footer';

const AboutPage: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { number: '1000+', label: 'Happy Students', icon: GraduationCap },
    { number: '500+', label: 'Accommodations', icon: Building2 },
    { number: '50+', label: 'Cities', icon: Home },
    { number: '100%', label: 'Verified Listings', icon: ShieldCheck },
  ];

  const values = [
    {
      title: 'Trust & Safety',
      description: 'We verify every listing and owner to ensure a safe experience for our students.',
      icon: ShieldCheck,
    },
    {
      title: 'Student-First',
      description: 'Every decision we make puts students\' needs and well-being first.',
      icon: GraduationCap,
    },
    {
      title: 'Community',
      description: 'Building connections and fostering a supportive environment for everyone.',
      icon: Users,
    },
    {
      title: 'Quality Living',
      description: 'Ensuring comfortable and well-maintained accommodations for the best experience.',
      icon: Home,
    },
  ];

  const team = [
    {
      name: 'Manoj Patil',
      role: 'Founder & CEO',
      image: '/placeholder.svg?height=400&width=400',
    },
    {
      name: 'lol',
      role: 'Head of Operations',
      image: '/placeholder.svg?height=400&width=400',
    },
    {
      name: 'lol',
      role: 'Student Success Lead',
      image: '/placeholder.svg?height=400&width=400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Making Student Housing Simple
          </motion.h1>
          <motion.p 
            className="text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're on a mission to revolutionize how students find their perfect home away from home.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-green-600" />
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            {...fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Way2pg started with a simple idea: make student housing search stress-free. We understand the challenges students face when looking for accommodation in a new city. That's why we've created a platform that connects students with verified property owners, ensuring a smooth and reliable housing experience.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we're proud to serve thousands of students across multiple cities, helping them find their perfect home away from home. Our commitment to trust, safety, and student satisfaction remains at the heart of everything we do.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <value.icon className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;