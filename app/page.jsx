"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
import { 
  Trophy, 
  Brain, 
  Users, 
  Heart, 
  Handshake, 
  GraduationCap 
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070",
    "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=2070",
    "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=2070"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const coaches = [
    {
      name: "John Smith",
      role: "Head Coach",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
      achievements: "20+ Years Experience, NBA Development Coach",
      description: "Former professional player with extensive coaching experience at all levels."
    },
    {
      name: "Sarah Johnson",
      role: "Assistant Coach",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974",
      achievements: "NCAA Division I Coach, Youth Development Specialist",
      description: "Specializes in player development and fundamental skills training."
    }
  ];

  return (
    <main className="min-h-screen">
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${heroImages[currentImageIndex]})`,
              }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
            >
              Elevate Your <span className="text-[#f2800d]">Game</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/80 mb-8"
            >
              Master the fundamentals and compete at the highest level with elite training
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button 
                className="bg-[#f2800d] hover:bg-[#f2800d]/90 text-white font-semibold text-lg px-8 py-6"
                onClick={() => router.push('/training')}
              >
                Join Us!
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-[#fff3e6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-black">
              Latest <span className="text-[#f2800d]">Updates</span>
            </h2>
            <p className="mt-2 text-black/60">Stay informed about our latest events and announcements</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Summer Camp 2024",
                description: "Join our intensive 6-week summer training program. Early bird registration now open!",
                image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070",
                date: "June 15 - July 30",
                tag: "Upcoming Camp"
              },
              {
                title: "State Tournament",
                description: "Prepare for the upcoming state championship. View schedule and registration details.",
                image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069",
                date: "May 1-3, 2024",
                tag: "Tournament"
              },
              {
                title: "Away Games Schedule",
                description: "Check out our upcoming away games schedule and support our teams on the road.",
                image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=2070",
                date: "Ongoing",
                tag: "Trip Games"
              },
              {
                title: "2024 Team Rosters",
                description: "Updated team rosters for all divisions now available. View player assignments and schedules.",
                image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2071",
                date: "Updated Weekly",
                tag: "Rosters"
              }
            ].map((news, index) => (
              <motion.div
                key={news.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#f2800d] text-white text-sm px-3 py-1 rounded-full">
                    {news.tag}
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="text-sm text-[#f2800d] font-medium mb-2">
                    {news.date}
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-[#f2800d] transition-colors duration-300">
                    {news.title}
                  </h3>
                  <p className="text-black/60 text-sm line-clamp-2">
                    {news.description}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    className="mt-4 p-0 h-auto text-[#f2800d] hover:text-[#f2800d]/80 hover:bg-transparent"
                  >
                    Learn more →
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Smaller Version */}
      <section className="py-12 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Success Rate", value: "94%" },
              { label: "Pro Athletes", value: "50+" },
              { label: "Championships", value: "120+" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-xl border border-white/10 hover:border-[#f2800d]/50 transition-colors"
              >
                <div className="text-3xl font-bold text-[#f2800d] mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trophy Gallery Section */}
      <section className="py-16 bg-black/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-4 text-white"
          >
            Our <span className="text-[#f2800d]">Achievements</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-center mb-12 max-w-2xl mx-auto"
          >
            Celebrating excellence and dedication in basketball through our achievements and recognition
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2",
                title: "National Championship 2023",
                description: "Overall Champions"
              },
              {
                image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4",
                title: "Regional Tournament",
                description: "First Place"
              },
              {
                image: "https://images.unsplash.com/photo-1579187707643-35646d22b596",
                title: "Youth League Champions",
                description: "Under-18 Division"
              },
              {
                image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1",
                title: "Coach of the Year",
                description: "Excellence in Leadership"
              }
            ].map((trophy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-white/5 p-4"
              >
                <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                  <Image
                    src={trophy.image}
                    alt={trophy.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="mt-4">
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {trophy.title}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {trophy.description}
                  </p>
                </div>

                <div className="absolute inset-0 border-2 border-[#f2800d]/0 group-hover:border-[#f2800d]/100 rounded-xl transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-[#fff3e6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div
              className="flex min-h-[300px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 mb-12"
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-black tracking-tight text-white text-center"
              >
                Our Core Values
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  Icon: Trophy,
                  title: "Discipline",
                  description: "Building champions through consistent dedication"
                },
                {
                  Icon: Brain,
                  title: "Work Ethic",
                  description: "Going above and beyond in everything we do"
                },
                {
                  Icon: Users,
                  title: "Teamwork",
                  description: "Success through collaboration and unity"
                },
                {
                  Icon: Heart,
                  title: "Integrity",
                  description: "Leading by example on and off the court"
                },
                {
                  Icon: Handshake,
                  title: "Sportsmanship",
                  description: "Respect for the game and all participants"
                },
                {
                  Icon: GraduationCap,
                  title: "Education",
                  description: "Developing both mind and body"
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-white p-6 hover:bg-accent/5 transition-colors duration-300"
                >
                  <div className="flex flex-col gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#f2800d]/10 text-[#f2800d] group-hover:bg-[#f2800d] group-hover:text-white transition-colors duration-300">
                      <value.Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">
                        {value.title}
                      </h3>
                      <p className="text-black/70">
                        {value.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 border border-[#f2800d]/10 group-hover:border-[#f2800d] rounded-xl transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-4 text-white"
          >
            Meet Our <span className="text-[#f2800d]">Coaches</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-center mb-16 max-w-2xl mx-auto"
          >
            Learn from experienced professionals who have played and coached at the highest levels
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {coaches.map((coach, index) => (
              <motion.div
                key={coach.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative"
              >
                <div className="relative h-[500px] overflow-hidden rounded-2xl">
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {coach.name}
                    </h3>
                    <p className="text-[#f2800d] font-semibold mb-3">
                      {coach.role}
                    </p>
                    <p className="text-white/80 text-sm mb-3">
                      {coach.achievements}
                    </p>
                    <p className="text-white/60 text-sm">
                      {coach.description}
                    </p>
                  </div>
                </div>
                
                <div className="absolute inset-0 border-2 border-[#f2800d]/0 group-hover:border-[#f2800d]/100 rounded-2xl transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}