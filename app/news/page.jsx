"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy,
  Award,
  Newspaper,
  CircleDot
} from 'lucide-react';
import Image from 'next/image';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NewsCard = ({ article }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={article.urlToImage || 'https://images.unsplash.com/photo-1546519638-68e109498ffc'}
          alt={article.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <CardContent className="p-6">
        <p className="text-sm text-gray-500 mb-2">
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.description}
        </p>
        <Button
          className="w-full bg-[#f2800d] hover:bg-[#f2800d]/90"
          onClick={() => window.open(article.url, '_blank')}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

export default function NewsPage() {
  const [news, setNews] = useState({
    nba: [],
    jrNba: [],
    euroleague: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const categories = ['nba', 'jrNba', 'euroleague'];
        const results = {};

        await Promise.all(
          categories.map(async (category) => {
            const response = await fetch(`/api/news?category=${category}`, {
              signal: AbortSignal.timeout(30000) // 30 second timeout
            });
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            results[category] = data.articles || [];
          })
        );

        setNews(results);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <main className="min-h-screen pt-20 bg-[#fff3e6]">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center mb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069")`,
            backgroundAttachment: 'fixed'
          }}
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Basketball News
          </h1>
          <p className="text-xl text-white/80">
            Stay Updated with Latest Basketball News
          </p>
        </motion.div>
      </section>

      {/* News Content */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <Tabs defaultValue="nba" className="w-full">
          <TabsList className="w-full justify-center mb-8">
            <TabsTrigger value="nba" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              NBA
            </TabsTrigger>
            <TabsTrigger value="jrNba" className="flex items-center gap-2">
              <CircleDot className="h-4 w-4" />
              Jr NBA
            </TabsTrigger>
            <TabsTrigger value="euroleague" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Euroleague
            </TabsTrigger>
          </TabsList>

          {Object.keys(news).map((category) => (
            <TabsContent key={category} value={category}>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((n) => (
                    <Card key={n} className="h-[400px] animate-pulse">
                      <div className="h-48 bg-gray-200" />
                      <CardContent className="p-6">
                        <div className="h-4 bg-gray-200 rounded mb-4" />
                        <div className="h-8 bg-gray-200 rounded mb-4" />
                        <div className="h-20 bg-gray-200 rounded" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {news[category]?.map((article, index) => (
                    <NewsCard key={index} article={article} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
}
