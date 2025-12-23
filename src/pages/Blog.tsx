import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { blogPosts, categories } from "@/data/blog";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedPage, FadeInOnScroll, StaggerContainer, StaggerItem } from "@/components/AnimatedPage";
import { motion } from "framer-motion";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="mb-12">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>

              <FadeInOnScroll>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-tight">
                  Blog<span className="text-highlight-4">.</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl border-l-4 border-foreground pl-4">
                  Insights, tutorials, and deep dives into cybersecurity, development,
                  and technology.
                </p>
              </FadeInOnScroll>
            </div>

            {/* Filters */}
            <FadeInOnScroll delay={0.1} className="flex flex-col md:flex-row gap-4 mb-12">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 brutalist-input"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-bold uppercase border-4 border-foreground transition-colors ${
                      selectedCategory === category
                        ? "bg-foreground text-background"
                        : "bg-background text-foreground hover:bg-secondary"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </FadeInOnScroll>

            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <StaggerItem key={post.id}>
                    <motion.div
                      whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to={`/blog/${post.id}`}
                        className="block border-4 border-foreground overflow-hidden shadow-sm"
                      >
                        {/* Post Image */}
                        <div className="h-40 relative overflow-hidden bg-secondary">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-5xl font-display text-foreground/20">
                              {"</>"}
                            </div>
                          </div>
                          {post.featured && (
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-accent text-accent-foreground border-2 border-foreground font-bold uppercase text-xs">
                                Featured
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5 border-t-4 border-foreground">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2 font-mono">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>

                          <h3 className="font-bold uppercase text-sm mb-2 line-clamp-2">
                            {post.title}
                          </h3>

                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          <Badge
                            variant="outline"
                            className="border-2 border-foreground font-mono text-xs"
                          >
                            {post.category}
                          </Badge>
                        </div>
                      </Link>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <FadeInOnScroll className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-bold uppercase mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </FadeInOnScroll>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedPage>
  );
}
