import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  customFields: {
    item: [['media:content', 'media:content']]
  }
});

const feeds = {
  nba: [
    'https://www.espn.com/espn/rss/nba/news'
  ],
  jrNba: [
    'https://www.ncaa.com/news/basketball-men/d1/rss.xml'
  ],
  euroleague: [
    'https://www.eurohoops.net/feed',
    'https://www.sportando.basketball/feed/'
  ]
};

const fallbackNews = {
  nba: [
    {
      title: "NBA Season Updates",
      description: "Stay updated with the latest NBA news, scores, and highlights from around the league.",
      urlToImage: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "https://www.nba.com"
    },
    {
      title: "NBA Player Spotlight",
      description: "In-depth analysis of top NBA players and their impact on the game.",
      urlToImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070&auto=format&fit=crop",
      publishedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      url: "https://www.nba.com/players"
    },
    {
      title: "NBA League Standings",
      description: "Current NBA standings and playoff race analysis.",
      urlToImage: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=2070&auto=format&fit=crop",
      publishedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      url: "https://www.nba.com/standings"
    }
  ],
  jrNba: [
    {
      title: "Youth Basketball Development",
      description: "Latest updates on youth basketball programs and development initiatives.",
      urlToImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070&auto=format&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "https://jr.nba.com"
    },
    {
      title: "College Basketball Highlights",
      description: "Recent highlights and updates from college basketball.",
      urlToImage: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2071&auto=format&fit=crop",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      url: "https://www.ncaa.com/sports/basketball-men"
    }
  ],
  euroleague: [
    {
      title: "EuroLeague Latest",
      description: "Recent updates and highlights from EuroLeague basketball.",
      urlToImage: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=2070&auto=format&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "https://www.euroleague.net"
    },
    {
      title: "European Basketball Roundup",
      description: "Weekly roundup of European basketball news and highlights.",
      urlToImage: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=2070&auto=format&fit=crop",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      url: "https://www.euroleague.net/news"
    }
  ]
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'nba';

  try {
    const feedUrls = feeds[category];
    const articles = [];
    let hasSuccessfulFeed = false;

    for (const url of feedUrls) {
      try {
        const feed = await parser.parseURL(url);
        const feedArticles = await Promise.all(feed.items
          .slice(0, 4)
          .filter(item => item.title)
          .map(async item => {
            // Try to fetch the actual page to get the image
            let imageUrl = null;
            try {
              const response = await fetch(item.link);
              const html = await response.text();
              
              // Try to find OpenGraph image first
              const ogMatch = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/);
              if (ogMatch) {
                imageUrl = ogMatch[1];
              }
              
              // Fallback to other image sources if no OG image
              if (!imageUrl) {
                const imgMatch = html.match(/<img[^>]+src="([^"]+\.(?:jpg|jpeg|png|webp))[^"]*"/i);
                if (imgMatch) {
                  imageUrl = imgMatch[1];
                }
              }
            } catch (error) {
              console.error('Error fetching article page:', error);
            }

            return {
              title: item.title?.trim(),
              description: cleanContent(item.contentSnippet || item.content),
              urlToImage: imageUrl || findBestImage(item, category),
              publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
              url: item.link
            };
          }));

        const validArticles = feedArticles.filter(article => 
          article.title && 
          article.description && 
          article.urlToImage && 
          isValidImageUrl(article.urlToImage)
        );

        if (validArticles.length > 0) {
          hasSuccessfulFeed = true;
          articles.push(...validArticles);
        }
      } catch (feedError) {
        console.error(`Feed error for ${url}:`, feedError.message);
      }
    }

    if (!hasSuccessfulFeed) {
      console.log(`Using fallback news for ${category}`);
      return NextResponse.json({ articles: fallbackNews[category] });
    }

    const sortedArticles = articles
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 6);

    return NextResponse.json({ articles: sortedArticles });

  } catch (error) {
    console.error('RSS Feed Error:', error);
    return NextResponse.json({ articles: fallbackNews[category] });
  }
}

function findBestImage(item, category) {
  const imageUrl = 
    item['media:content']?.$.url ||
    extractImageFromContent(item.content) ||
    extractImageFromContent(item.description);

  if (imageUrl && isValidImageUrl(imageUrl)) {
    return imageUrl;
  }

  const fallbackImages = {
    nba: "https://images.unsplash.com/photo-1504450758481-7338eba7524a",
    jrNba: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    euroleague: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2"
  };

  return fallbackImages[category] || fallbackImages.nba;
}

function extractImageFromContent(content) {
  if (!content) return null;
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : null;
}

function cleanContent(content) {
  if (!content) return '';
  return content
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200) + '...';
}

function isValidImageUrl(url) {
  try {
    const parsed = new URL(url);
    // Add common news domains to the validation
    const validDomains = [
      'espn.com',
      'espncdn.com',
      'nba.com',
      'nbcsports.com',
      'eurohoops.net',
      'sportando.basketball',
      'ncaa.com'
    ];
    
    return (
      /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(parsed.pathname) ||
      validDomains.some(domain => parsed.hostname.includes(domain)) ||
      parsed.hostname.includes('media') ||
      parsed.hostname.includes('images')
    );
  } catch {
    return false;
  }
}