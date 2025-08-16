
import React, { useEffect, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const HumanoidSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  // Chart data
  const performanceData = [
    { month: 'Jan', efficiency: 65, learning: 45, tasks: 120 },
    { month: 'Feb', efficiency: 72, learning: 58, tasks: 145 },
    { month: 'Mar', efficiency: 78, learning: 69, tasks: 180 },
    { month: 'Apr', efficiency: 85, learning: 75, tasks: 220 },
    { month: 'May', efficiency: 90, learning: 82, tasks: 280 },
    { month: 'Jun', efficiency: 95, learning: 88, tasks: 340 },
  ];

  const capabilityData = [
    { name: 'Navigation', value: 92, color: '#ef4444' },
    { name: 'Object Recognition', value: 88, color: '#f87171' },
    { name: 'Task Execution', value: 85, color: '#fca5a5' },
    { name: 'Human Interaction', value: 78, color: '#fecaca' },
  ];

  const usageData = [
    { category: 'Manufacturing', hours: 2400, percentage: 35 },
    { category: 'Healthcare', hours: 1680, percentage: 25 },
    { category: 'Logistics', hours: 1344, percentage: 20 },
    { category: 'Research', hours: 1008, percentage: 15 },
    { category: 'Other', hours: 336, percentage: 5 },
  ];

  // More responsive timing function with shorter duration
  const cardStyle = {
    height: '60vh',
    maxHeight: '600px',
    borderRadius: '20px',
    transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
    willChange: 'transform, opacity'
  };

  useEffect(() => {
    // Create intersection observer to detect when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 } // Start observing when 10% of element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Optimized scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (!ticking.current) {
        lastScrollY.current = window.scrollY;
        
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          
          const sectionRect = sectionRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollDistance = viewportHeight * 2;
          
          // Calculate the scroll progress
          let progress = 0;
          if (sectionRect.top <= 0) {
            progress = Math.min(1, Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance));
          }
          
          // Determine which card should be visible based on progress
          if (progress >= 0.66) {
            setActiveCardIndex(2);
          } else if (progress >= 0.33) {
            setActiveCardIndex(1);
          } else {
            setActiveCardIndex(0);
          }
          
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Card visibility based on active index instead of direct scroll progress
  const isFirstCardVisible = isIntersecting;
  const isSecondCardVisible = activeCardIndex >= 1;
  const isThirdCardVisible = activeCardIndex >= 2;

  return (
    <div 
      ref={sectionRef} 
      className="relative" 
      style={{ height: '300vh' }}
    >
      <section className="w-full h-screen py-10 md:py-16 sticky top-0 overflow-hidden bg-white" id="why-humanoid">
        <div className="container px-6 lg:px-8 mx-auto h-full flex flex-col">
          <div className="mb-2 md:mb-3">
            <div className="flex items-center gap-4 mb-2 md:mb-2 pt-8 sm:pt-6 md:pt-4">
              <div className="pulse-chip opacity-0 animate-fade-in" style={{
                animationDelay: "0.1s"
              }}>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">02</span>
                <span>Humanoid</span>
              </div>
            </div>
            
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-1 md:mb-2">
              Why Humanoid
            </h2>
          </div>
          
          <div ref={cardsContainerRef} className="relative flex-1 perspective-1000">
            {/* First Card */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-xl ${isFirstCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                zIndex: 10,
                transform: `translateY(${isFirstCardVisible ? '90px' : '200px'}) scale(0.9)`,
                opacity: isFirstCardVisible ? 0.9 : 0
              }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-xl"></div>
              
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm text-primary border border-primary/20">
                  <span className="text-sm font-medium">Performance Analytics</span>
                </div>
              </div>
              
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full">
                <div className="mb-4">
                  <h3 className="text-2xl sm:text-3xl font-display text-gray-900 font-bold leading-tight mb-2">
                    Learning & Efficiency Trends
                  </h3>
                  <p className="text-gray-600 text-sm">Real-time performance metrics</p>
                </div>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="learningGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Area type="monotone" dataKey="efficiency" stroke="#ef4444" fillOpacity={1} fill="url(#efficiencyGradient)" strokeWidth={2} />
                      <Area type="monotone" dataKey="learning" stroke="#f87171" fillOpacity={1} fill="url(#learningGradient)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Second Card */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-xl ${isSecondCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                zIndex: 20,
                transform: `translateY(${isSecondCardVisible ? activeCardIndex === 1 ? '55px' : '45px' : '200px'}) scale(0.95)`,
                opacity: isSecondCardVisible ? 1 : 0,
                pointerEvents: isSecondCardVisible ? 'auto' : 'none'
              }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-xl"></div>
              
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm text-primary border border-primary/20">
                  <span className="text-sm font-medium">Capability Analysis</span>
                </div>
              </div>
              
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full">
                <div className="mb-4">
                  <h3 className="text-2xl sm:text-3xl font-display text-gray-900 font-bold leading-tight mb-2">
                    Core Capabilities
                  </h3>
                  <p className="text-gray-600 text-sm">AI-powered skill assessments</p>
                </div>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={capabilityData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" domain={[0, 100]} stroke="#6b7280" fontSize={12} />
                      <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={12} width={120} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Bar dataKey="value" fill="#ef4444" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Third Card */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-xl ${isThirdCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                zIndex: 30,
                transform: `translateY(${isThirdCardVisible ? activeCardIndex === 2 ? '15px' : '0' : '200px'}) scale(1)`,
                opacity: isThirdCardVisible ? 1 : 0,
                pointerEvents: isThirdCardVisible ? 'auto' : 'none'
              }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-xl"></div>
              
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm text-primary border border-primary/20">
                  <span className="text-sm font-medium">Usage Statistics</span>
                </div>
              </div>
              
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full">
                <div className="mb-4">
                  <h3 className="text-2xl sm:text-3xl font-display text-gray-900 font-bold leading-tight mb-2">
                    Industry Applications
                  </h3>
                  <p className="text-gray-600 text-sm">Deployment across sectors</p>
                </div>
                
                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="80%" height="100%">
                    <PieChart>
                      <Pie
                        data={usageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="percentage"
                      >
                        {usageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#ef4444', '#f87171', '#fca5a5', '#fecaca', '#fee2e2'][index]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                        formatter={(value, name, props) => [`${value}%`, props.payload.category]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HumanoidSection;
