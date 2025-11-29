import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/UI';
import { BrainCircuit, TrendingUp, ShieldCheck, Target, MessageSquare, Briefcase } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden flex-1 flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-royal-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block animate-fade-in">
            <span className="py-1 px-3 rounded-full bg-slate-800/80 border border-slate-700 text-royal-300 text-xs font-semibold uppercase tracking-wider mb-6 inline-block">
              Powered by Mo.Nabil Intelligence Engine
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 animate-slide-up leading-tight">
            Mo.Nabil AI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-300 to-white">
              Your Ultimate Business Consultant
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            A dedicated Artificial Intelligence designed to answer <strong>any business question</strong>. 
            From Strategic Management and Finance to Marketing and HR.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button size="lg" onClick={() => navigate('/chat')} className="shadow-xl shadow-royal-500/20">
              Start Chatting Now <MessageSquare className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-20 bg-slate-950/50 border-t border-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Expertise Across All Domains</h2>
            <p className="text-slate-400">Ask detailed questions about any aspect of business administration.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 hover:border-royal-700 transition-colors group">
              <div className="h-12 w-12 bg-royal-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BrainCircuit className="text-royal-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Strategic Management</h3>
              <p className="text-slate-400">
                Business model generation, SWOT analysis, competitive intelligence, and long-term planning.
              </p>
            </Card>

            <Card className="p-8 hover:border-royal-700 transition-colors group">
              <div className="h-12 w-12 bg-royal-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-royal-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Finance & Accounting</h3>
              <p className="text-slate-400">
                Financial statement analysis, budgeting advice, investment appraisal, and cash flow management.
              </p>
            </Card>

            <Card className="p-8 hover:border-royal-700 transition-colors group">
              <div className="h-12 w-12 bg-royal-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="text-royal-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Marketing & Sales</h3>
              <p className="text-slate-400">
                Digital marketing strategies, brand positioning, sales funnels, and customer behavior analysis.
              </p>
            </Card>
            
             <Card className="p-8 hover:border-royal-700 transition-colors group">
              <div className="h-12 w-12 bg-royal-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-royal-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Human Resources</h3>
              <p className="text-slate-400">
                Talent acquisition, organizational culture, performance management, and leadership development.
              </p>
            </Card>

            <Card className="p-8 hover:border-royal-700 transition-colors group">
              <div className="h-12 w-12 bg-royal-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="text-royal-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Operations & Projects</h3>
              <p className="text-slate-400">
                Supply chain optimization, project management methodologies (Agile/Waterfall), and efficiency.
              </p>
            </Card>

            <Card className="p-8 hover:border-royal-700 transition-colors group flex flex-col justify-center items-center text-center bg-royal-900/20 border-royal-800">
              <h3 className="text-xl font-bold text-white mb-3">Have a specific challenge?</h3>
              <p className="text-slate-400 mb-6">
                Our AI is ready to analyze your unique situation.
              </p>
              <Button onClick={() => navigate('/chat')}>Ask AI Assistant</Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;