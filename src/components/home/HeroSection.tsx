import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Briefcase, GraduationCap, Trophy, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Apply Once, Get Multiple Opportunities
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Streamline your application process. One profile, multiple opportunities. 
              Jobs, internships, grants, scholarships, and competitions - all in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button
              asChild
              size="lg"
              className="font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-medium hover:bg-primary/10 transition-colors duration-300"
            >
              <Link to="/explore">Browse Opportunities</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { icon: Briefcase, label: 'Jobs', count: '10K+' },
              { icon: GraduationCap, label: 'Internships', count: '5K+' },
              { icon: Award, label: 'Grants', count: '2K+' },
              { icon: Trophy, label: 'Scholarships', count: '3K+' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors duration-300"
              >
                <div className="flex flex-col items-center">
                  <item.icon className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                  <span className="text-lg font-bold">{item.count}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
