"use client";

import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar,
  GraduationCap,
  Clock,
  Users,
  Target,
  DollarSign,
  ChevronRight,
  Star,
  Camera
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';

export default function Programs() {
  const programs = [
    {
      title: "Skills Training",
      icon: Target,
      shortDesc: "Weekend training sessions focused on fundamental and advanced basketball skills",
      schedule: "Saturday & Sunday: 8:00 AM - 10:30 AM, 11:00 AM - 1:00 PM",
      fullDesc: "Our comprehensive skills training program is designed to develop players' fundamental and advanced basketball skills. Sessions include shooting mechanics, ball handling, footwork, defensive techniques, and game strategy.",
      price: "Ksh 1,500 per session",
      features: [
        "Professional coaching staff",
        "Small group training",
        "Individual skill assessment",
        "Progress tracking",
        "Video analysis",
        "Conditioning drills"
      ]
    },
    {
      title: "After School Training",
      icon: Clock,
      shortDesc: "Structured training program for students after regular school hours",
      schedule: "Monday - Friday: 4:00 PM - 6:00 PM",
      fullDesc: "Perfect for students looking to improve their game while maintaining academic excellence. Our after-school program combines skills development with supervised practice sessions.",
      price: "Ksh 10,000 per month",
      features: [
        "Flexible scheduling",
        "Homework support",
        "Transportation available",
        "Snacks provided",
        "Regular progress reports",
        "Parent-coach meetings"
      ]
    },
    {
      title: "Holiday Training",
      icon: Calendar,
      shortDesc: "Intensive basketball camps during school holidays (April, August, December)",
      schedule: "Monday - Friday: 9:00 AM - 3:00 PM during holiday periods",
      fullDesc: "Immersive basketball experience during school holidays. Players will participate in intensive training sessions, scrimmages, and tournaments while developing their skills and basketball IQ.",
      price: "Ksh 15,000 per week",
      features: [
        "Full-day program",
        "Lunch provided",
        "Tournament play",
        "Guest coaches",
        "Team building activities",
        "End-of-camp showcase"
      ]
    },
    {
      title: "Personal Training / College Prep",
      icon: GraduationCap,
      shortDesc: "One-on-one training and college preparation program",
      schedule: "Flexible scheduling based on player availability",
      fullDesc: "Personalized training program designed for serious players aiming to play at the collegiate level. Includes specialized skill development, recruiting guidance, and academic support.",
      price: "Ksh 3,000 per session",
      features: [
        "One-on-one coaching",
        "College recruitment support",
        "SAT/ACT prep",
        "Highlight reel creation",
        "Scholarship guidance",
        "NCAA eligibility assistance"
      ]
    }
  ];

  const [hoveredCard, setHoveredCard] = React.useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const programImages = {
    "Skills Training": [
      "/images/IMG_6851.jpg",
      "/images/IMG_6861.jpg",
      "/images/IMG_6873.jpg",
    ],
    "After School Training": [
      "/images/IMG_6877.jpg",
      "/images/IMG_6883.jpg",
      "/images/IMG_6899.jpg",
    ],
    "Holiday Training": [
      "/images/IMG_6903.jpg",
      "/images/IMG_6934.jpg",
      "/images/IMG_6986.jpg",
    ],
    "Personal Training / College Prep": [
      "/images/IMG_6994.jpg",
      "/images/IMG_6998.jpg",
      "/images/IMG_7003.jpg",
    ],
  };

  return (
    <main className="min-h-screen pt-16 bg-gradient-to-b from-[#181411] to-[#1f1915]">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center px-4 mb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("/images/IMG_6821.jpg")`,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-[#f2800d]/20 to-transparent"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#f2800d]/10 text-[#f2800d] text-sm font-semibold mb-4">
              Elite Basketball Training
            </span>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Training Programs
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Choose the program that best fits your basketball journey and elevate your game to the next level
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {programs.map((program, index) => (
            <Dialog.Root key={program.title}>
              <Dialog.Trigger asChild>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="cursor-pointer relative"
                >
                  <Card className="bg-[#27211b]/80 backdrop-blur-sm border-[#54473b] hover:border-[#f2800d] transition-all duration-300 overflow-hidden group">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6 relative z-10">
                        <div className="p-4 rounded-xl bg-[#f2800d]/10 transition-all duration-300 group-hover:bg-[#f2800d]/20">
                          <program.icon className="h-8 w-8 text-[#f2800d]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#f2800d] transition-colors duration-300">
                            {program.title}
                          </h3>
                          <p className="text-gray-400 mb-4 line-clamp-2">
                            {program.shortDesc}
                          </p>
                          <div className="flex items-center text-[#f2800d] font-medium">
                            <span>Learn more</span>
                            <motion.div
                              animate={{ x: hoveredCard === index ? 5 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="h-5 w-5 ml-1" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#f2800d]/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:bg-[#f2800d]/10 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#f2800d]/5 rounded-full blur-2xl transform -translate-x-12 translate-y-12 group-hover:bg-[#f2800d]/10 transition-all duration-500" />
                    </CardContent>
                  </Card>
                </motion.div>
              </Dialog.Trigger>
              
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" />
                <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#27211b] border-[#54473b] text-white max-w-3xl w-[90vw] max-h-[90vh] rounded-lg p-6 overflow-y-auto z-[101]">
                  <Dialog.Title className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                    <program.icon className="h-8 w-8 text-[#f2800d]" />
                    {program.title}
                  </Dialog.Title>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#f2800d]/20 scrollbar-track-transparent"
                  >
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {program.fullDesc}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/20 p-6 rounded-xl">
                      <div className="flex items-center gap-3 text-[#f2800d]">
                        <Clock className="h-6 w-6" />
                        <div>
                          <p className="text-sm text-gray-400">Schedule</p>
                          <span className="text-white">{program.schedule}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-[#f2800d]">
                        <DollarSign className="h-6 w-6" />
                        <div>
                          <p className="text-sm text-gray-400">Investment</p>
                          <span className="text-white">{program.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/20 p-6 rounded-xl">
                      <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Star className="h-5 w-5 text-[#f2800d]" />
                        Program Features
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {program.features.map((feature, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="h-2 w-2 rounded-full bg-[#f2800d]" />
                            <span className="text-gray-300">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Program Images Section */}
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold flex items-center gap-2">
                        <Camera className="h-5 w-5 text-[#f2800d]" />
                        Program Gallery
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        {programImages[program.title].map((image, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className="relative aspect-video group overflow-hidden rounded-lg"
                          >
                            <Image
                              src={image}
                              alt={`${program.title} image ${index + 1}`}
                              fill
                              className="object-cover"
                              placeholder="blur"
                              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPENDODM4QkVHSUxTYWJMV2pDRVVpZ2d6aXN4gYF+jYaNY2pzdWX/2wBDARUXFx4aHR4eHWVTQlNlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWX/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                              priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-[#f2800d] hover:bg-[#f2800d]/90 text-white"
                      onClick={() => {
                        window.location.href = '/training#registration';
                      }}
                    >
                      Enroll Now
                    </Button>
                  </motion.div>
                  <Dialog.Close asChild>
                    <button
                      className="absolute top-4 right-4 text-gray-400 hover:text-white"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          ))}
        </motion.div>
      </section>
    </main>
  );
} 