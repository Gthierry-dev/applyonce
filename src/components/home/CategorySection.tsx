import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const categories = [ 
    { title: 'workspaces', jobs: '48 Jobs Available', icon: '💻' },
    { title: 'permits', jobs: '78 Jobs Available', icon: '🎨' },
    { title: 'competition', jobs: '120 Jobs Available', icon: '👥' },
  { title: 'Jobs', jobs: '10K+ Opportunities Available', icon: '💼' },
  { title: 'Internships', jobs: '5K+ Opportunities Available', icon: '🎓' },
  { title: 'volluntee', jobs: '2K+ Opportunities Available', icon: '🏆' },
  { title: 'Scholarships', jobs: '3K+ Opportunities Available', icon: '📚' }
];

const CategorySection = () => {
  return (
    <section className="py-20 mx-28">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">One platform Many Solutions</h2>
          <Link 
            to="/opportunities" 
            className="text-primary hover:text-primary/80 font-medium"
          >
            See All Platform
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              to={`/opportunities?category=${category.title}`}
              className="p-2 px-4 rounded-3xl border transition-all duration-300 hover:bg-primary hover:bg-opacity-10 hover:border-primary"
            >
              <div className="flex items-center   ">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="font-medium text-lg">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.jobs}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;