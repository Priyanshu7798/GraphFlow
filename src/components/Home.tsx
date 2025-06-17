import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Zap, Link, Palette, Shield, BarChart3, Rocket, Menu, X } from 'lucide-react';
import { Route, Routes ,useNavigate } from 'react-router-dom';
import Index from '@/pages/Index';

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FloatingElement {
  id: number;
  size: number;
  top: number;
  left: number;
  delay: number;
}

const LandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features: FeatureCard[] = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Execute workflows in milliseconds with our optimized runtime engine. Built for performance and scalability."
    },
    {
      icon: <Link className="w-6 h-6" />,
      title: "500+ Integrations",
      description: "Connect with popular apps and services. From CRM to social media, databases to cloud storage - we've got you covered."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Visual Editor",
      description: "Design complex workflows with our intuitive drag-and-drop interface. No coding skills required."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption, SSO support, and compliance with industry standards. Your data is always protected."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Monitor workflow performance with detailed analytics and insights. Optimize your automations for maximum efficiency."
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Cloud Native",
      description: "Built for the cloud with auto-scaling, high availability, and global deployment capabilities."
    }
  ];

  const floatingElements: FloatingElement[] = [
    { id: 1, size: 100, top: 20, left: 10, delay: -2 },
    { id: 2, size: 60, top: 60, left: 85, delay: -8 },
    { id: 3, size: 80, top: 80, left: 20, delay: -5 }
  ];

  const handleEditorClick = () => {
    navigate('/editor');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

   const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-foreground overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border' 
          : 'bg-background/80 backdrop-blur-sm'
      }`}>
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              FlowForge
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-8">
              {['Features', 'Pricing', 'Docs', 'Community'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-border">
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Docs', 'Community'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </header>

      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="fixed rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-20 animate-pulse"
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            top: `${element.top}%`,
            left: `${element.left}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: '8s'
          }}
        />
      ))}

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative pt-20">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  Visual Workflow
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Automation
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Connect your apps and automate workflows with an intuitive visual editor. 
                No code required - just drag, drop, and deploy powerful automations in minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleEditorClick}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Go to Editor
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                
                <button className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-purple-900/30" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Powerful Features
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to build, deploy, and scale your automation workflows
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Ready to get started?
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground">
                Join thousands of teams already automating their workflows with FlowForge
              </p>
              
              <button
                onClick={handleEditorClick}
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Building Now
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;