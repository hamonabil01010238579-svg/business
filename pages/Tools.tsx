import React, { useState } from 'react';
import { generateToolContent } from '../services/geminiService';
import { ToolType, ToolResult } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { Briefcase, FileText, PieChart, Target, Search, Loader2, Copy, Check, Download } from 'lucide-react';

const Tools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<ToolType>(ToolType.BUSINESS_PLAN);
  const [inputData, setInputData] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<ToolResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!inputData.trim()) return;

    setIsGenerating(true);
    setResult(null);

    try {
      const content = await generateToolContent(selectedTool, inputData);
      setResult({
        id: Date.now().toString(),
        type: selectedTool,
        content: content,
        date: new Date()
      });
    } catch (error) {
      console.error(error);
      alert("Failed to generate content. Please check API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toolsList = [
    { type: ToolType.BUSINESS_PLAN, icon: Briefcase, desc: "Full structured plan with exec summary." },
    { type: ToolType.SWOT_ANALYSIS, icon: PieChart, desc: "Strengths, Weaknesses, Opps, Threats." },
    { type: ToolType.MARKETING_STRATEGY, icon: Target, desc: "Channels, KPIs and growth tactics." },
    { type: ToolType.MARKET_RESEARCH, icon: Search, desc: "Competitor analysis and trends." },
    { type: ToolType.EMAIL_DRAFTER, icon: FileText, desc: "Professional corporate communication." },
  ];

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <Briefcase className="text-royal-400" /> Business Generators
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar / Tool Selector */}
        <div className="lg:col-span-4 space-y-4">
          <p className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Select Tool</p>
          {toolsList.map((tool) => (
            <button
              key={tool.type}
              onClick={() => { setSelectedTool(tool.type); setResult(null); setInputData(''); }}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 ${
                selectedTool === tool.type
                  ? 'bg-royal-900/40 border-royal-500 shadow-lg shadow-royal-900/20'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:bg-slate-800/50'
              }`}
            >
              <div className={`p-2 rounded-lg ${selectedTool === tool.type ? 'bg-royal-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <tool.icon size={20} />
              </div>
              <div>
                <h3 className={`font-semibold ${selectedTool === tool.type ? 'text-white' : 'text-slate-300'}`}>
                  {tool.type}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{tool.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-8">
          <Card className="p-6 h-full flex flex-col min-h-[600px]">
            <div className="mb-6">
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Business Details / Context
              </label>
              <textarea
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder={`Enter details for ${selectedTool} (e.g., Company Name, Industry, Key Goals)...`}
                className="w-full h-32 bg-slate-950 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-600 focus:border-royal-500 focus:ring-1 focus:ring-royal-500 transition-all resize-none"
              />
              <div className="mt-4 flex justify-end">
                <Button onClick={handleGenerate} disabled={isGenerating || !inputData.trim()} className="w-full sm:w-auto">
                  {isGenerating ? <><Loader2 className="animate-spin mr-2" size={18} /> Generating...</> : `Generate ${selectedTool.split(' ')[0]}`}
                </Button>
              </div>
            </div>

            <div className="flex-1 bg-slate-950 rounded-lg border border-slate-800 p-6 overflow-y-auto relative">
              {!result && !isGenerating && (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                  <FileText size={48} className="mb-4" />
                  <p>Result will appear here</p>
                </div>
              )}
              
              {isGenerating && (
                 <div className="h-full flex flex-col items-center justify-center">
                   <div className="relative">
                     <div className="h-16 w-16 rounded-full border-4 border-slate-800 border-t-royal-500 animate-spin"></div>
                   </div>
                   <p className="mt-4 text-royal-300 font-medium">Analyzing Business Data...</p>
                 </div>
              )}

              {result && (
                <div className="animate-fade-in">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-4 sticky top-0 bg-slate-950 z-10">
                     <Badge>{result.type}</Badge>
                     <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download size={16} />
                        </Button>
                     </div>
                  </div>
                  <div className="prose prose-invert prose-blue max-w-none text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {result.content}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tools;