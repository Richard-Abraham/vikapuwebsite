"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Calendar, Check, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Training() {
  const packages = [
    {
      title: "Registration Fee",
      price: "ksh 2500",
      features: [
        "Unlimited Sessions",
        "Free Jersey",
        "Free Basketball",
        "Free Water Bottle",
        "Free Drawstring Bag"
      ]
    },
    {
      title: "Daily charge per session",
      price: "ksh 1500",
      features: [
        "8 Sessions",
        "Free Jersey",
        "Free Basketball",
        "Free Water Bottle",
        "Free Drawstring Bag"
      ]
    },
    {
      title: "Monthly Charge",
      price: "ksh 10,000",
      features: [
        "4 Sessions",
        "Free Jersey",
        "Free Basketball",
        "Free Water Bottle",
        "Free Drawstring Bag"
      ]
    }
  ];

  const sessions = [
    { id: 1, number: "1", date: "Mon 4:00 - 6:00 PM" },
    { id: 2, number: "2", date: "Wed 4:00 - 6:00 PM" },
    { id: 3, number: "3", date: "Fri 4:00 - 6:00 PM" },
    { id: 4, number: "4", date: "Sat 8:00 - 10:30 AM & 11:00 AM - 1:00 PM" },
    { id: 5, number: "5", date: "Sun 2:00 - 4:00 PM" }
  ];

  const coaches = [
    {
      id: 1,
      name: "John Smith",
      role: "Head Coach",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      alt: "Coach John Smith"
    },
    {
      id: 2,
      name: "Alex Brown",
      role: "Assistant Coach",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      alt: "Coach Alex Brown"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardHover = {
    whileHover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#181411] to-[#1f1915] pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[580px] flex items-center justify-center px-4 mb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070")`
          }}
        />
        
        <div className="relative z-10 max-w-[960px] mx-auto w-full text-center">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="flex flex-col items-center gap-4"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-black text-white tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Elite Training Programs
            </motion.h1>
            <motion.p 
              className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Designed for players who are serious about their game, our programs focus on skill development and player performance.
            </motion.p>
            <Button 
              className="bg-[#f2800d] hover:bg-[#f2800d]/90 text-white px-10 py-7 text-lg rounded-xl transform transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-[#f2800d]/20"
              onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
            >
              View Packages
              <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[960px] mx-auto px-4 space-y-24 pb-16">
        {/* Session Schedule */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 relative">
            Training Schedule
            <span className="absolute -bottom-2 left-0 w-20 h-1 bg-[#f2800d]"></span>
          </h2>
          <motion.div className="grid gap-4" variants={staggerContainer}>
            {sessions.map((session) => (
              <motion.div 
                key={session.id} 
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-[#27211b] border-[#54473b] hover:border-[#f2800d] transition-all duration-300">
                  <CardContent className="flex items-center p-6">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#f2800d] to-[#ff9933] text-white font-bold text-xl shadow-lg">
                      {session.number}
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold text-white mb-1">Session {session.number}</h3>
                      <p className="text-[#baab9c] text-base">{session.date}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Coaches */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 relative">
            Meet Your Coaches
            <span className="absolute -bottom-2 left-0 w-20 h-1 bg-[#f2800d]"></span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {coaches.map((coach) => (
              <motion.div 
                key={coach.id} 
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-[#27211b] border-[#54473b] hover:border-[#f2800d] transition-all duration-300">
                  <CardContent className="flex items-center p-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-[#f2800d]">
                      <Image
                        src={coach.image}
                        alt={coach.alt}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold text-white">{coach.name}</h3>
                      <p className="text-[#baab9c]">{coach.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Packages */}
        <motion.section
          id="packages"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 relative">
            Training Packages
            <span className="absolute -bottom-2 left-0 w-20 h-1 bg-[#f2800d]"></span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <motion.div 
                key={pkg.title} 
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-[#27211b] border-[#54473b] hover:border-[#f2800d] transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white">{pkg.title}</CardTitle>
                    <div className="text-3xl font-black text-white mt-2">
                      {pkg.price}
                      <span className="text-lg text-[#baab9c]">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-[#393028] hover:bg-[#393028]/80 text-white mb-6">
                      Select Package
                    </Button>
                    <ul className="space-y-3">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-center text-white text-sm">
                          <Check className="mr-2 h-5 w-5 text-[#f2800d]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}