"use client";

import React from 'react';
import { Circle as Basketball, Mail, MapPin, Phone, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/vikapuelitebasketballacademy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "Youtube" }
  ];

  const contactInfo = [
    { icon: MapPin, text: "209 state House rd, Lava Latte, Nairobi Kenya" },
    { icon: Phone, text: "+254 726 970839" },
    { icon: Phone, text: "+254 727 292121" },
    { icon: Mail, text: "info@vikapuelite.com" }
  ];

  return (
    <footer className="bg-gradient-to-br from-[#181411] via-black to-[#1f1915] relative overflow-hidden py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute blur-3xl opacity-20 animate-pulse -top-24 -left-24 w-96 h-96 rounded-full bg-[#f2800d]" />
        <div className="absolute blur-3xl opacity-10 animate-pulse delay-700 top-1/2 -right-24 w-80 h-80 rounded-full bg-[#f2800d]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="group cursor-pointer">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <Basketball className="h-10 w-10 text-[#f2800d] transform transition-transform group-hover:rotate-180 duration-700" />
                  <div className="absolute inset-0 bg-[#f2800d]/20 rounded-full blur animate-ping" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Vikapu Elite Basketball Academy
                </h2>
              </div>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed">
              Elevating basketball skills through professional training and personalized coaching. Join us in our journey to excellence.
            </p>
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative p-3 rounded-full bg-[#27211b] hover:bg-[#f2800d] transition-all duration-300"
                >
                  <social.icon className="h-5 w-5 text-gray-300 group-hover:text-white transform transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 rounded-full bg-[#f2800d]/20 group-hover:animate-ping" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            <h3 className="text-xl font-semibold text-white border-b border-[#f2800d]/20 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index} className="group flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                  <div className="p-2 rounded-lg bg-[#27211b] group-hover:bg-[#f2800d] transition-colors duration-300">
                    <contact.icon className="h-5 w-5 text-[#f2800d] group-hover:text-white" />
                  </div>
                  <span className="text-sm">{contact.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-4"
          >
            <Card className="p-6 bg-[#27211b] border-[#54473b]">
              <h3 className="text-xl font-semibold text-white mb-4">
                Join Our Newsletter
              </h3>
              <p className="text-gray-400 mb-6">
                Stay updated with our latest programs, events, and basketball tips.
              </p>
              <form className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 border-[#54473b] pr-32 focus:ring-[#f2800d] focus:border-[#f2800d]"
                  />
                  <Button className="absolute right-1 top-1 bg-[#f2800d] hover:bg-[#f2800d]/80 text-white">
                    Subscribe
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#54473b]">
          <div className="text-center text-sm text-gray-400">
            <p className="hover:text-white transition-colors duration-300">
              &copy; {new Date().getFullYear()} Vikapu Elite Basketball Academy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}