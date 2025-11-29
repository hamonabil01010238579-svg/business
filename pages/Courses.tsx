import React, { useState } from 'react';
import { Course } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { PlayCircle, Clock, BarChart2, Users, Target, DollarSign, Briefcase } from 'lucide-react';

const coursesData: Course[] = [
  {
    id: '1',
    title: 'Modern Business Fundamentals',
    category: 'Fundamentals',
    description: 'Master the core pillars of business administration, from legal structures to operational efficiency.',
    level: 'Beginner',
    duration: '4h 30m',
    modules: 8
  },
  {
    id: '2',
    title: 'Strategic Human Resource Management',
    category: 'HR',
    description: 'Learn how to attract, retain, and develop top talent while building a strong company culture.',
    level: 'Intermediate',
    duration: '6h 15m',
    modules: 12
  },
  {
    id: '3',
    title: 'Digital Marketing & Growth Hacking',
    category: 'Marketing',
    description: 'Data-driven strategies to scale customer acquisition and retention in the digital age.',
    level: 'Advanced',
    duration: '8h 00m',
    modules: 15
  },
  {
    id: '4',
    title: 'Corporate Finance & Budgeting',
    category: 'Finance',
    description: 'Understand P&L, balance sheets, cash flow management, and investment strategies.',
    level: 'Intermediate',
    duration: '5h 45m',
    modules: 10
  },
  {
    id: '5',
    title: 'Agile Project Management',
    category: 'Management',
    description: 'Implement Agile and Scrum methodologies to improve team productivity and delivery speed.',
    level: 'Advanced',
    duration: '7h 20m',
    modules: 14
  }
];

const categoryIcons: Record<string, React.ReactNode> = {
  'Fundamentals': <Briefcase size={18} />,
  'HR': <Users size={18} />,
  'Marketing': <Target size={18} />,
  'Finance': <DollarSign size={18} />,
  'Management': <BarChart2 size={18} />,
};

const Courses: React.FC = () => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Fundamentals', 'HR', 'Marketing', 'Finance', 'Management'];
  const filteredCourses = filter === 'All' ? coursesData : coursesData.filter(c => c.category === filter);

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Course Library</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Upskill with our curated business administration curriculum. 
          Each course includes summary notes, AI-generated quizzes, and real-world case studies.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat 
                ? 'bg-royal-600 text-white shadow-lg shadow-royal-900/50' 
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map(course => (
          <Card key={course.id} className="flex flex-col h-full hover:border-royal-500/50 transition-colors group">
            <div className="relative h-48 bg-slate-800 overflow-hidden">
               {/* Abstract decorative background for course thumbnail */}
               <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
               <div className="absolute top-4 right-4 bg-black/50 backdrop-blur text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                 <Clock size={12} /> {course.duration}
               </div>
               <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 to-transparent">
                  <div className="flex items-center gap-2 text-royal-300">
                    {categoryIcons[course.category]}
                    <span className="text-sm font-semibold">{course.category}</span>
                  </div>
               </div>
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                  <PlayCircle size={48} className="text-white drop-shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300" />
               </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <Badge color="blue">{course.level}</Badge>
                <span className="text-xs text-slate-500">{course.modules} Modules</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-royal-300 transition-colors">{course.title}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-1">{course.description}</p>
              
              <Button variant="outline" className="w-full">
                View Curriculum
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;