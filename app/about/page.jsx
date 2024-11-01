"use client";

import { motion } from "framer-motion";
import { Target, Heart, Users } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#181411] to-[#1f1915] pt-16">
      {/* Hero Section with History */}
      <section className="relative min-h-[580px] flex items-center justify-center px-4 mb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.8) 100%), url("/images/IMG_6883.jpg")`,
            backgroundSize: 'cover'
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-black text-white mb-6"
          >
            Our <span className="text-[#f2800d]">Story</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/90 leading-relaxed"
          >
            Founded in 2023, Vikapu Elite Basketball Academy emerged from a passion for basketball and a vision to transform young talents. Starting with just a handful of dedicated players, we've grown into a community that believes in the power of sports to shape character and create opportunities.
          </motion.p>
        </div>
      </section>

      {/* Vision, Mission, Goals Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#27211b] border border-[#54473b] rounded-xl p-8 text-center"
            >
              <div className="h-16 w-16 bg-[#f2800d]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-[#f2800d]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Vision</h3>
              <p className="text-gray-400">
                To be the premier basketball academy in Kenya, developing not just elite athletes, but future leaders who excel both on and off the court.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#27211b] border border-[#54473b] rounded-xl p-8 text-center"
            >
              <div className="h-16 w-16 bg-[#f2800d]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-[#f2800d]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Mission</h3>
              <p className="text-gray-400">
                To provide comprehensive basketball training that develops physical skills, mental toughness, and character while fostering a supportive community environment.
              </p>
            </motion.div>

            {/* Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#27211b] border border-[#54473b] rounded-xl p-8 text-center"
            >
              <div className="h-16 w-16 bg-[#f2800d]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-[#f2800d]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Goals</h3>
              <p className="text-gray-400">
                To create pathways for young athletes to achieve their basketball dreams while building essential life skills and strong community connections.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="py-20 px-4 bg-[#1f1915]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#27211b] border border-[#54473b] rounded-2xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Basketball as a <span className="text-[#f2800d]">Force for Good</span>
                </h2>
                <div className="space-y-4 text-gray-400">
                  <p>
                    At Vikapu Elite Basketball, we believe basketball is more than just a game. It's a tool for positive change in our community. Through our programs, we:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Create opportunities for youth development and leadership</li>
                    <li>Foster teamwork and communication skills</li>
                    <li>Build confidence and self-discipline</li>
                    <li>Promote healthy lifestyle choices</li>
                    <li>Create pathways for academic and athletic excellence</li>
                  </ul>
                </div>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="/images/IMG_6883.jpg"
                  alt="Community Impact"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 