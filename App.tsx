import React, { useState } from 'react';
import { 
  Activity, 
  Layout, 
  MessageSquareText, 
  Github, 
  Menu, 
  X,
  Map,
  BookOpen
} from 'lucide-react';
import { ViewState } from './types';
import { ProjectInfo } from './components/ProjectInfo';
import { CrackDetectionDemo } from './components/CrackDetectionDemo';
import { AIAssistant } from './components/AIAssistant';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <ProjectInfo />;
      case ViewState.DEMO:
        return <CrackDetectionDemo />;
      case ViewState.ASSISTANT:
        return <AIAssistant />;
      default:
        return <ProjectInfo />;
    }
  };

  const navItems = [
    { id: ViewState.HOME, label: '项目概览', icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { id: ViewState.DEMO, label: '演示实验室', icon: <Activity className="w-4 h-4 mr-2" /> },
    { id: ViewState.ASSISTANT, label: 'AI 助手', icon: <MessageSquareText className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentView(ViewState.HOME)}>
              <div className="bg-slate-900 p-2 rounded-lg mr-3">
                <Map className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-none">RoadCrack AI</h1>
                <p className="text-xs text-slate-500 font-medium">智能路面裂纹分割系统</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === item.id
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-500'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p className="mb-2">© 2024 RoadCrack AI Project. Educational Purpose Only.</p>
          <div className="flex justify-center items-center space-x-4">
             <span className="flex items-center"><Github className="w-4 h-4 mr-1" /> Open Source</span>
             <span>Based on DeepCrack Dataset</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;