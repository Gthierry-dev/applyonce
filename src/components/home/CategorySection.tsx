import { ArrowRight, Briefcase, Building, LineChart, Lock, PenTool, UserSearch, Wallet } from "lucide-react";

const categories = [
  { title: 'scholarships', jobs: '58 Jobs Available', icon: <PenTool size={20} /> },
  { title: 'Grants', jobs: '48 Jobs Available', icon: <Briefcase size={20} /> },
  { title: 'Interneship', jobs: '78 Jobs Available', icon: <PenTool size={20} /> },
  { title: 'felowship', jobs: '120 Jobs Available', icon: <UserSearch size={20} /> },
  { title: 'competition', jobs: '90 Jobs Available', icon: <Lock size={20} /> },
  { title: 'workshops', jobs: '31 Jobs Available', icon: <Building size={20} /> },
  { title: 'studies abroad', jobs: '52 Jobs Available', icon: <LineChart size={20} /> },
  { title: 'volunteer', jobs: '80 Jobs Available', icon: <Wallet size={20} /> },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-800">One platform Many Solutions</h2>
          <a 
            href="#" 
            className="text-blue-600 hover:text-gray-900 font-medium flex items-center gap-1"
          >
            See All Platform
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a
              key={category.title}
              href="#"
              className="flex items-center gap-4 p-4 pr-8 rounded-xl border bg-white hover:border-blue-600 hover:bg-blue-50 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 group-hover:bg-blue-600 group-hover:text-white">
                {category.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{category.title}</h3>
                <p className="text-sm text-gray-500">{category.jobs}</p>
              </div>
              <div className="ml-auto">
                <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-600" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;