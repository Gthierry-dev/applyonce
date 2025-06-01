import { useState } from 'react';
import { ChevronDown, Filter, X, Save } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';

export default function CategoryFilter({ children }) {
  const [activeTab, setActiveTab] = useState('categories');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedTags, setSelectedTags] = useState([]);
  const { categories } = useCategories();

  const tags = [
    'Experience', 'Learning', 'Funding', 'Competition', 'Contributing', 
    'Design', 'Development', 'Marketing', 'Business', 'Tech', 'Creative',
    'Remote', 'Startup', 'Community', 'Mentorship', 'Mentor', 'Internship',
  ];

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const updateCategory = (id, field, value) => {
    // Implementation for updating category
    console.log('Updating category', id, field, value);
  };

  return (
    <div className="w-full  bg-white-500  mb-6">
      <div className="flex border-b items-center justify-between px-5 pb-5">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'categories' 
                ? 'bg-white text-[#306C6A] shadow-sm' 
                : 'text-gray-600 hover:text-[#306C6A]'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('auto-apply')}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'auto-apply' 
                ? 'bg-white text-[#306C6A] shadow-sm' 
                : 'text-gray-600 hover:text-[#306C6A]'
            }`}
          >
            Auto Apply
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              showFilters 
                ? 'bg-[#E7F0F0] border-[#306C6A] text-[#306C6A]' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter size={16} />
            <span className="text-sm font-medium">Filter</span>
          </button>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#306C6A] focus:border-[#306C6A]"
            >
              <option value="popularity">Popularity</option>
              <option value="newest">Newest</option>
              <option value="alphabetical">A-Z</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="border-t border-b    bg-gray-50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">Filter by tags</h3>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="text-sm text-[#306C6A] hover:text-[#285856]"
              >
                Clear all
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 pb-3">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-[#E7F0F0] text-[#306C6A] border border-[#306C6A]'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span>{tag}</span>
                {selectedTags.includes(tag) && (
                  <X size={14} className="ml-2 text-[#306C6A]" />
                )}
              </button>
            ))}
          </div>

          {selectedTags.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Conditional rendering based on active tab */}
      {activeTab === 'categories' ? (
        <div className="p-5">
          {children}
        </div>
      ) : (
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auto Apply</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories && categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{category.icon_name}</span>
                        <div className="text-sm font-medium text-gray-900">{category.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={category.auto_apply || false}
                          onChange={(e) => updateCategory(category.id, 'autoApply', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#306C6A]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#306C6A]"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={category.count || 0}
                        onChange={(e) => updateCategory(category.id, 'count', parseInt(e.target.value) || 0)}
                        className="w-20 px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#306C6A] focus:border-transparent"
                        min="0"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="flex items-center gap-2 px-3 py-1 bg-[#306C6A] text-white rounded hover:bg-[#285856] transition-colors text-sm">
                        <Save className="w-3 h-3" />
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}