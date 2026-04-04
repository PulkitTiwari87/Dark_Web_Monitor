import React from 'react';
import { ShieldAlert, Cpu, Eye, Activity, ChevronRight } from 'lucide-react';

const LandingView = ({ onLaunch }) => {
  return (
    <div className="min-h-screen w-full bg-[#030305] text-white overflow-x-hidden overflow-y-auto font-sans relative selection:bg-cyber-accent selection:text-black">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[5%] left-[5%] w-[400px] h-[400px] bg-cyber-accent rounded-full filter blur-[180px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-red-600 rounded-full filter blur-[180px] opacity-10 animate-[pulse_7s_ease-in-out_infinite]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_4px] opacity-40"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_20%,transparent_100%)]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-10 py-6 border-b border-gray-800/50 bg-black/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-cyber-accent" size={30} />
          <span className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-cyber-accent">DARK</span>
        </div>
        <button 
          onClick={onLaunch}
          className="px-6 py-2 bg-cyber-accent/10 border border-cyber-accent text-cyber-accent rounded font-bold tracking-widest hover:bg-cyber-accent hover:text-black transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] flex items-center gap-2"
        >
          LOGIN <ChevronRight size={16} />
        </button>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        
        {/* Hero Section */}
        <div className="text-center mb-32 relative">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-bold tracking-widest animate-pulse">
            CLASSIFIED CYBER INTELLIGENCE
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight drop-shadow-2xl">
            Uncover the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-white to-gray-500 animate-pulse">Invisible Threat.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
            Using data analytics, visualization, and NLP-based threat intelligence modeling, the system provides insights on data breach exposure alerts, threat actor profiling, and proactive defense recommendation strategies. Dashboards help threat intelligence teams make informed, data-driven cyber risk monitoring decisions.
          </p>
          <div className="flex justify-center gap-6">
            <button 
              onClick={onLaunch}
              className="px-10 py-4 bg-cyber-accent text-black font-black text-lg rounded shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:bg-white transition-all transform hover:scale-105 flex items-center gap-3"
            >
              <Cpu size={24} /> INITIALIZE PLATFORM
            </button>
          </div>
        </div>

        {/* Feature/Learning Grid */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold mb-16 text-center tracking-widest uppercase border-b border-gray-800 pb-4 inline-block">Architecture Core Modules</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 p-8 rounded-xl hover:border-cyber-accent/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-accent/5 rounded-full blur-[50px] group-hover:bg-cyber-accent/20 transition-all"></div>
              <Cpu className="text-cyber-accent mb-6" size={40} />
              <h3 className="text-xl font-bold mb-4 tracking-wider">NATURAL LANGUAGE PROCESSING</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Utilizing state-of-the-art AI models (spaCy en_core_web_sm), the engine actively reads unformatted hacker forum chatter and autonomously extracts critical named entities: Target Domains, Threat Actor Aliases, IP Addresses, and Cryptocurrency ledgers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 p-8 rounded-xl hover:border-red-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-[50px] group-hover:bg-red-500/20 transition-all"></div>
              <Activity className="text-red-500 mb-6" size={40} />
              <h3 className="text-xl font-bold mb-4 tracking-wider">HEURISTIC RISK SCORING</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Not all chatter is critical. Our proprietary algorithm assigns dynamic severity weights. Routine botnet discussions trigger 'Low' alerts, while targeted 0-day exploits or active credential dumping immediately flags a 'Critical' response tier.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 p-8 rounded-xl hover:border-purple-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[50px] group-hover:bg-purple-500/20 transition-all"></div>
              <Eye className="text-purple-500 mb-6" size={40} />
              <h3 className="text-xl font-bold mb-4 tracking-wider">CREDENTIAL INTELLIGENCE</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Automatically cross-reference CSV intercept dumps against thousands of known corporate domains to proactively warn operators of compromised VIP accounts before threat actors establish systemic footholds.
              </p>
            </div>

          </div>
        </div>

        {/* Tactical Info Section */}
        <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-2xl p-12 relative overflow-hidden">
           <div className="absolute -right-20 top-0 opacity-10">
             <ShieldAlert size={400} />
           </div>
           <div className="relative z-10 max-w-2xl">
             <h2 className="text-3xl font-black tracking-widest mb-6">WHY CONTINUOUS MONITORING MATTERS</h2>
             <p className="text-gray-400 mb-6 text-lg leading-relaxed">
               In the modern cyber warfare landscape, reactive security is inadequate. The Dark Web operates as the subterranean logistics network for advanced persistent threats (APTs). 
               By programmatically intercepting and syntactically analyzing their communication pipelines, organizations can shift from post-breach forensics to pre-breach neutralization.
             </p>
             <ul className="space-y-3 font-mono text-sm text-cyber-accent mb-8">
               <li>&gt; Detect Initial Access Brokers (IABs)</li>
               <li>&gt; Identify Data Exfiltration Leaks</li>
               <li>&gt; Monitor DDoS Targeting Campaigns</li>
             </ul>
           </div>
        </div>

      </main>
      
      <footer className="relative z-10 border-t border-gray-800 py-8 text-center bg-black/50">
        <p className="text-gray-600 font-mono text-sm uppercase tracking-widest">DARK SYSTEMS © {new Date().getFullYear()} // RESTRICTED ACCESS</p>
      </footer>
    </div>
  );
};

export default LandingView;
