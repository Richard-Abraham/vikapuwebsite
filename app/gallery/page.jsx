"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from "@/components/ui/dialog";

export default function Gallery() {
  const galleryImages = [
    {
      src: "/images/IMG_6851.jpg",
      caption: "Training Session 1",
      category: "Training"
    },
    {
      src: "/images/IMG_6861.jpg",
      caption: "Team Practice",
      category: "Practice"
    },
    {
      src: "/images/IMG_6873.jpg",
      caption: "Game Day",
      category: "Games"
    },
    {
      src: "/images/IMG_6877.jpg",
      caption: "Team Huddle",
      category: "Team"
    },
    {
      src: "/images/IMG_6883.jpg",
      caption: "Skills Development",
      category: "Training"
    },
    {
      src: "/images/IMG_6899.jpg",
      caption: "Championship Game",
      category: "Games"
    },
    {
      src: "/images/IMG_6903.jpg",
      caption: "Team Strategy",
      category: "Practice"
    },
    {
      src: "/images/IMG_6934.jpg",
      caption: "Victory Celebration",
      category: "Events"
    },
    {
      src: "/images/IMG_6986.jpg",
      caption: "Training Session 2",
      category: "Training"
    },
    {
      src: "/images/IMG_6994.jpg",
      caption: "Team Building",
      category: "Events"
    },
    {
      src: "/images/IMG_6998.jpg",
      caption: "Game Preparation",
      category: "Practice"
    },
    {
      src: "/images/IMG_7003.jpg",
      caption: "Tournament Day",
      category: "Games"
    },
    {
      src: "/images/IMG_7009.jpg",
      caption: "Team Spirit",
      category: "Team"
    }
  ];

  const categories = [...new Set(galleryImages.map(img => img.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <main className="min-h-screen pt-20 bg-[#fff3e6]">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center mb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("/images/IMG_6877.jpg")`,
            backgroundAttachment: 'fixed'
          }}
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Our Gallery
          </h1>
          <p className="text-xl text-white/80">
            Capturing Vikapu Elite Academy Moments
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory('All')}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeCategory === 'All' 
                ? 'bg-[#f2800d] text-white' 
                : 'bg-white/80 text-black hover:bg-[#f2800d]/10'
            }`}
          >
            All
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === category 
                  ? 'bg-[#f2800d] text-white' 
                  : 'bg-white/80 text-black hover:bg-[#f2800d]/10'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredImages.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-black cursor-pointer"
                >
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {image.caption}
                      </h3>
                      <p className="text-white/80">
                        {image.category}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-black border-none p-0">
                <div className="relative aspect-video">
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
