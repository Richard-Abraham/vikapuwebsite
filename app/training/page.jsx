"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Calendar, Check, ChevronDown, Phone, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { useRef } from 'react';

export default function Training() {
  const registrationRef = useRef(null);

  const sessions = [
    { id: 1, number: "1", date: "Mon 4:00 - 6:00 PM" },
    { id: 2, number: "2", date: "Wed 4:00 - 6:00 PM" },
    { id: 3, number: "3", date: "Fri 4:00 - 6:00 PM" },
    { id: 4, number: "4", date: "Sat 8:00 - 10:30 AM & 11:00 AM - 1:00 PM" },
    { id: 5, number: "5", date: "Sun 2:00 - 4:00 PM" }
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
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("/images/IMG_6883.jpg")`
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
              onClick={() => registrationRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Enroll Now
              <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Registration Section */}
      <section ref={registrationRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-[#27211b] border border-[#54473b] rounded-2xl p-8 md:p-12 mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to <span className="text-[#f2800d]">Join Us?</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Take the first step towards elevating your game. Register now or contact us for more information.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-black/20 p-8 rounded-xl text-center"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Register Now</h3>
                <p className="text-gray-400 mb-6">
                  Fill out our registration form to secure your spot in our training programs.
                </p>
                <Link href="/register">
                  <Button className="bg-[#f2800d] hover:bg-[#f2800d]/90 text-white px-8 py-6 text-lg">
                    Start Registration
                  </Button>
                </Link>
              </motion.div>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-black/20 p-8 rounded-xl text-center cursor-pointer"
                  >
                    <h3 className="text-2xl font-bold text-white mb-4">Contact Us</h3>
                    <p className="text-gray-400 mb-6">
                      Have questions? Reach out to us directly through phone or Instagram.
                    </p>
                    <Button className="bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-lg">
                      Get in Touch
                    </Button>
                  </motion.div>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" />
                  <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#27211b] border-[#54473b] text-white w-[90vw] max-w-md rounded-lg p-6 z-[101]">
                    <Dialog.Title className="text-2xl font-bold mb-4">
                      Contact Us
                    </Dialog.Title>
                    
                    <div className="space-y-6">
                      <a 
                        href="tel:+254712345678" 
                        className="flex items-center gap-4 p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors"
                      >
                        <Phone className="h-6 w-6 text-[#f2800d]" />
                        <div>
                          <p className="font-medium">Call Us</p>
                          <p className="text-sm text-gray-400">+254 726 970839</p>
                        </div>
                      </a>

                      <a 
                        href="https://www.instagram.com/vikapuelitebasketballacademy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors"
                      >
                        <Instagram className="h-6 w-6 text-[#f2800d]" />
                        <div>
                          <p className="font-medium">DM on Instagram</p>
                          <p className="text-sm text-gray-400">@vikapuelitebasketball</p>
                        </div>
                      </a>
                    </div>

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
            </div>
          </motion.div>

          {/* Sessions Section */}
          <motion.section
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 relative">
              Training Sessions
              <span className="absolute -bottom-2 left-0 w-20 h-1 bg-[#f2800d]"></span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <motion.div
                  key={session.id}
                  variants={fadeInUp}
                  {...cardHover}
                >
                  <Card className="bg-[#27211b] border-[#54473b] hover:border-[#f2800d] transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-[#f2800d]/10 flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-[#f2800d]" />
                        </div>
                        <div>
                          <CardTitle className="text-white">Session {session.number}</CardTitle>
                          <p className="text-sm text-gray-400 mt-1">{session.date}</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </section>
    </main>
  );
}