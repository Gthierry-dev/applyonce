import React, { useState } from 'react';
import { Search, Briefcase, GraduationCap, Award, Trophy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const categories = [
  {
    icon: Briefcase,
    title: 'Jobs',
    description: 'Find your dream job',
    count: '10K+',
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    icon: GraduationCap,
    title: 'Internships',
    description: 'Gain valuable experience',
    count: '5K+',
    color: 'from-purple-500/20 to-purple-600/20',
  },
  {
    icon: Award,
    title: 'Grants',
    description: 'Secure funding for your projects',
    count: '2K+',
    color: 'from-green-500/20 to-green-600/20',
  },
  {
    icon: Trophy,
    title: 'Scholarships',
    description: 'Fund your education',
    count: '3K+',
    color: 'from-yellow-500/20 to-yellow-600/20',
  },
];

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Find Your Perfect Opportunity
          </h2>
          <p className="text-xl text-muted-foreground">
            Search through thousands of opportunities and find the one that matches your goals
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for jobs, internships, grants..."
              className="pl-10 pr-4 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              size="lg"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              Search
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className={`group relative overflow-hidden rounded-xl border border-border/50 p-6 bg-gradient-to-br ${category.color} hover:shadow-lg transition-all duration-300`}
            >
              <div className="relative z-10">
                <category.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    {category.count} opportunities
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
