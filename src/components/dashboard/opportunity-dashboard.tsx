import React, { useState } from 'react';
import { Search, Bell, Clock, CheckCircle, XCircle, Save, Unlock } from 'lucide-react';

const OpportunityDashboard = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [categories, setCategories] = useState([
    { id: 1, name: 'Scholarships', icon: '🎓', autoApply: false, count: 0 },
    { id: 2, name: 'Jobs', icon: '💼', autoApply: true, count: 5 },
    { id: 3, name: 'Hackathons', icon: '💻', autoApply: false, count: 2 },
    { id: 4, name: 'Internships', icon: '🚀', autoApply: false, count: 0 }
    // { id: 5, name: 'Grants', icon: '💰', autoApply: false, count: 1 }
  ]);

  const opportunities = [
    {
      id: 1,
      subject: 'Google Summer of Code 2025',
      assignedTo: { name: 'Tech Opportunities', avatar: '💻', email: 'tech@opportunities.com' },
      relatedTo: 'Program 2025',
      dueDate: '15 Mar',
      status: 'Planned',
      type: 'hackathon'
    },
    {
      id: 2,
      subject: 'Stanford Merit Scholarship',
      assignedTo: { name: 'Education Fund', avatar: '🎓', email: 'edu@fund.com' },
      relatedTo: 'Scholarship 2025',
      dueDate: '28 Feb',
      status: 'Planned',
      type: 'scholarship'
    },
    
    {
      id: 3,
      subject: 'Software Engineer - Meta',
      assignedTo: { name: 'Career Portal', avatar: '💼', email: 'career@portal.com' },
      relatedTo: 'Job Application',
      dueDate: '10 Feb',
      status: 'Overdue',
      type: 'job'
    },
    {
      id: 4,
      subject: 'AWS Cloud Practitioner Cert',
      assignedTo: { name: 'Cert Manager', avatar: '☁️', email: 'cert@aws.com' },
      relatedTo: 'Certification',
      dueDate: '5 Mar',
      status: 'Complete',
      type: 'certification'
    }
    // {
    //   id: 5,
    //   subject: 'Y Combinator Application',
    //   assignedTo: { name: 'Startup Hub', avatar: '🚀', email: 'startup@hub.com' },
    //   relatedTo: 'Accelerator 2025',
    //   dueDate: '20 Mar',
    //   status: 'Complete',
    //   type: 'program'
    // }
    // ,
    // {
    //   id: 6,
    //   subject: 'Y Combinator Application',
    //   assignedTo: { name: 'Startup Hub', avatar: '🚀', email: 'startup@hub.com' },
    //   relatedTo: 'Accelerator 2025',
    //   dueDate: '20 Mar',
    //   status: 'Complete',
    //   type: 'program'
    // }
  ];

  const updateCategory = (id, field, value) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, [field]: value } : cat
    ));
  };

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      'Planned': 'bg-blue-100 text-blue-800',
      'Overdue': 'bg-red-100 text-red-800',
      'Complete': 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    
      <div className="p-5  ">
        {/* Header */}
        <div className="flex items-center justify-between  pb-2     border-b border-gray-200">
          <div className="flex items-center gap-3 ">
            <div className='bg-green-300 rounded-lg'>
              <Bell className="w-5 h-5 text-black-600 p-5 " />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Opportunities</h1>
              <p className="text-sm text-gray-600">Track and manage your opportunities</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#306C6A] text-white rounded-lg hover:bg-[#285856] transition-colors">
            <Unlock className="w-4 h-4" />
            Unlock more features
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-2 border-b  border-gray-200">
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'opportunities'
                ? 'border-[#306C6A] text-[#306C6A]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Opportunities
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'categories'
                ? 'border-[#306C6A] text-[#306C6A]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Categories
          </button>
        </div>


        {/* Content */}
        {activeTab === 'opportunities' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {/* <input type="checkbox" className="rounded" /> */}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned to</th> */}
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Related to</th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {opportunities.map((opportunity) => (
                  <tr key={opportunity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{opportunity.subject}</div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                          {opportunity.assignedTo.avatar}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{opportunity.assignedTo.name}</div>
                          <div className="text-sm text-gray-500">{opportunity.assignedTo.email}</div>
                        </div>
                      </div>
                    </td> */}
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#306C6A] underline cursor-pointer">{opportunity.relatedTo}</div>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {opportunity.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={opportunity.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                        <CheckCircle className="w-4 h-4 text-gray-400 cursor-pointer hover:text-green-600" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
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
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{category.icon}</span>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={category.autoApply}
                          onChange={(e) => updateCategory(category.id, 'autoApply', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#306C6A]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#306C6A]"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={category.count}
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
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Total {activeTab === 'opportunities' ? 'Opportunities' : 'Categories'}: {activeTab === 'opportunities' ? opportunities.length : categories.length}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Show per Page:</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>
          </div>
        </div>
      </div>
    
  );
};

export default OpportunityDashboard;