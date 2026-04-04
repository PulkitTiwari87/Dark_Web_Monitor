import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Activity, ShieldAlert, Database, Users, Upload, LogOut, FileSearch, CheckCircle, FileText, Lock, User } from 'lucide-react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthView = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // FastAPI OAuth2PasswordRequestForm expects x-www-form-urlencoded
        const params = new URLSearchParams();
        params.append('username', formData.username);
        params.append('password', formData.password);
        
        const res = await axios.post(`${API_BASE}/api/auth/login`, params, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        localStorage.setItem('dark_intel_token', res.data.access_token);
        onLoginSuccess();
      } else {
        // Registration is pure JSON Pydantic Model
        await axios.post(`${API_BASE}/api/auth/signup`, formData);
        setIsLogin(true);
        setError('Registration successful! Please login.');
      }
    } catch (err) {
      if (err.response?.data?.detail) {
        const detail = err.response.data.detail;
        if (Array.isArray(detail)) {
          // It's a Pydantic Validation Error (e.g., bad email format)
          setError(`Validation Error: ${detail[0].msg}`);
        } else {
          // Standard HTTPException string
          setError(typeof detail === 'string' ? detail : 'Authentication failed.');
        }
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center p-8 bg-cyber-dark relative overflow-hidden">
      {/* High-End Animated Cyber/Dark Web Background */}
      <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden">
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_10%,transparent_100%)] animate-[pulse_4s_ease-in-out_infinite]"></div>
        
        {/* Spooky Glowing Nodes */}
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-red-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-cyan-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-[spin_12s_linear_infinite_reverse]"></div>
        <div className="absolute -bottom-[20%] left-[40%] w-[500px] h-[500px] bg-purple-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-[pulse_6s_ease-in-out_infinite]"></div>
        
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202] opacity-90"></div>
      </div>

      <div className="glass-panel p-10 w-full max-w-md z-10 relative border-t-2 border-t-red-600 shadow-[0_0_80px_rgba(255,0,0,0.15)] bg-black/60 backdrop-blur-xl">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <ShieldAlert className="text-cyber-accent drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]" size={40} />
          <h1 className="text-3xl font-bold tracking-wider text-cyber-accent text-shadow-glow">DARK</h1>
        </div>

        <h2 className="text-xl text-center text-gray-300 mb-8">{isLogin ? 'Analyst Login Portal' : 'Register New Operative'}</h2>

        {error && (
          <div className={`p-3 mb-6 rounded text-sm text-center ${error.includes('successful') ? 'bg-cyber-success bg-opacity-20 text-cyber-success border border-cyber-success' : 'bg-cyber-alert bg-opacity-20 text-cyber-alert border border-cyber-alert'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex relative">
              <span className="inline-flex items-center px-4 bg-gray-800 border border-r-0 border-gray-700 rounded-l-md text-gray-400">
                <User size={18} />
              </span>
              <input 
                type="text" 
                placeholder="Agent Username" 
                required 
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value})}
                className="flex-1 block w-full bg-cyber-dark bg-opacity-50 text-white border border-gray-700 rounded-none rounded-r-md py-3 px-4 focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <div className="flex relative">
                <span className="inline-flex items-center px-4 bg-gray-800 border border-r-0 border-gray-700 rounded-l-md text-gray-400">
                  @
                </span>
                <input 
                  type="email" 
                  placeholder="Secure Email" 
                  required 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="flex-1 block w-full bg-cyber-dark bg-opacity-50 text-white border border-gray-700 rounded-none rounded-r-md py-3 px-4 focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent"
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex relative">
              <span className="inline-flex items-center px-4 bg-gray-800 border border-r-0 border-gray-700 rounded-l-md text-gray-400">
                <Lock size={18} />
              </span>
              <input 
                type="password" 
                placeholder="Passphrase" 
                required 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="flex-1 block w-full bg-cyber-dark bg-opacity-50 text-white border border-gray-700 rounded-none rounded-r-md py-3 px-4 focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full relative py-3 bg-transparent text-cyber-accent font-bold uppercase tracking-widest border border-cyber-accent rounded hover:bg-cyber-accent hover:text-cyber-dark transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] flex justify-center items-center disabled:opacity-50"
          >
            {loading ? <Activity className="animate-spin" /> : (isLogin ? 'Authenticate' : 'Initialize')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm text-gray-400 hover:text-white underline decoration-gray-600 underline-offset-4 transition"
          >
            {isLogin ? "Require Clearance? Request Registration." : "Already Cleared? Authenticate Here."}
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardView = ({ stats, alerts, chartData, loading, generatePDF }) => (
  <main className="flex-1 p-8 overflow-y-auto w-full">
    <header className="flex justify-between items-center mb-10 w-full">
      <div>
        <h2 className="text-3xl font-bold">Threat Intelligence Overview</h2>
        <p className="text-gray-400 mt-2">Real-time dark web chatter and breach analysis</p>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={generatePDF}
          className="glass-panel px-4 py-2 flex items-center gap-2 hover:bg-gray-800 transition text-sm border-gray-700 text-gray-300"
        >
          <FileText size={16} /> Export Intelligence PDF
        </button>
        <div className="glass-panel px-4 py-2 flex items-center gap-2">
           <div className="w-3 h-3 rounded-full bg-cyber-success animate-pulse shadow-[0_0_8px_#00ff66]"></div>
           <span className="text-sm font-medium">System Online</span>
        </div>
      </div>
    </header>

    {/* Stats Row */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="glass-panel p-6 flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">Total Intel Processed</p>
          <p className="text-3xl font-bold">{stats.total_intel}</p>
        </div>
        <Database className="text-blue-500 opacity-50 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" size={40} />
      </div>
      <div className="glass-panel p-6 flex items-center justify-between border-cyber-alert rounded-xl shadow-[0_0_15px_rgba(255,42,42,0.1)]">
        <div>
          <p className="text-cyber-alert text-sm font-bold mb-1">Critical Alerts</p>
          <p className="text-3xl font-bold text-cyber-alert">{stats.critical_alerts}</p>
        </div>
        <ShieldAlert className="text-cyber-alert animate-bounce drop-shadow-[0_0_10px_rgba(255,42,42,0.8)]" size={40} />
      </div>
      <div className="glass-panel p-6 flex items-center justify-between">
         <div>
          <p className="text-gray-400 text-sm mb-1">Leaked Credentials</p>
          <p className="text-3xl font-bold">{stats.total_leaks}</p>
        </div>
        <Users className="text-purple-500 opacity-50 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" size={40} />
      </div>
    </div>

    {/* Charts & Alerts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-panel p-6">
        <h3 className="text-xl font-bold mb-6">Threat Severity Breakdown</h3>
        <div className="h-72">
          {loading ? (
            <div className="flex justify-center items-center h-full text-cyber-accent animate-pulse">Loading intel...</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={115}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => {
                    let color = '#333333'; // Default/Empty
                    if (entry.isEmpty) color = '#1a1a24';
                    else if (entry.name === 'Critical') color = '#ff2a2a';
                    else if (entry.name === 'High') color = '#ff9900';
                    else if (entry.name === 'Medium') color = '#00f0ff';
                    else if (entry.name === 'Low') color = '#00ff66';
                    return <Cell key={`cell-${index}`} fill={color} className={`drop-shadow-[0_0_8px_${color}] outline-none`} />;
                  })}
                </Pie>
                {!chartData[0]?.isEmpty && (
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(26,26,36,0.9)', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                )}
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => <span className="text-gray-300 ml-1 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      
      <div className="glass-panel p-6 flex flex-col h-full">
        <h3 className="text-xl font-bold mb-6 flex-shrink-0">Recent Critical Alerts</h3>
        <div className="space-y-4 overflow-y-auto flex-1 pr-2">
          {alerts.length === 0 && !loading ? (
            <div className="text-gray-500 italic text-sm text-center mt-10">No alerts found in the database. Ingest some data first!</div>
          ) : (
            alerts.map(alert => (
              <div key={alert._id || alert.id} className="bg-cyber-dark bg-opacity-70 p-4 rounded-lg border-l-4 border-cyber-alert shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                <h4 className="font-semibold text-sm line-clamp-2 text-white">{alert.title}</h4>
                <div className="flex justify-between items-center mt-3">
                  <span className={`text-xs px-2 py-1 rounded font-bold tracking-wide ${alert.severity === 'Critical' ? 'bg-cyber-alert bg-opacity-20 text-cyber-alert' : 'bg-yellow-500 bg-opacity-20 text-yellow-500'}`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs text-gray-400">
                     {alert.timestamp ? new Date(alert.timestamp).toLocaleDateString() : 'Just now'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </main>
);

const IngestionView = ({ token }) => {
  const [file, setFile] = useState(null);
  const [type, setType] = useState('json');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  // Configure axios to send Bearer token if we wanted to secure the backend purely (the backend endpoints currently don't strictly enforce Depends(get_current_user) but it's good practice to send it)
  const reqConfig = { headers: {} };
  if (token) reqConfig.headers['Authorization'] = `Bearer ${token}`;

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file first.');

    setLoading(true);
    setMessage('');
    
    const formData = new FormData();
    formData.append('file', file);
    const config = { ...reqConfig, headers: { ...reqConfig.headers, 'Content-Type': 'multipart/form-data' }};

    const url = type === 'json' 
      ? `${API_BASE}/api/ingest/upload/json?source_type=forum`
      : `${API_BASE}/api/ingest/upload/csv?source_type=credential`;

    try {
      const res = await axios.post(url, formData, config);
      setMessage(`✅ Success: ${res.data.message}`);
      setFile(null);
      if(fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.detail || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRunAnalysis = async () => {
    setAnalyzing(true);
    setMessage('');
    try {
      const resForum = await axios.post(`${API_BASE}/api/analysis/process/chatter`, null, reqConfig);
      const resCreds = await axios.post(`${API_BASE}/api/analysis/process/credentials`, null, reqConfig);
      setMessage(`✅ NLP Engine Complete: ${resForum.data.message} ${resCreds.data.message}`);
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.detail || err.message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-bold flex items-center gap-3"><Upload className="text-cyber-accent"/> Data & Intelligence Ingestion</h2>
        <p className="text-gray-400 mt-2">Upload raw dark web intercepts and trigger the AI NLP pipeline.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 shadow-lg">
          <h3 className="text-xl font-semibold border-b border-gray-700 pb-4 mb-6">1. Upload Raw Intel</h3>
          <form onSubmit={handleUpload} className="space-y-6">
             <div>
               <label className="block text-sm font-medium text-gray-300 mb-2">Dataset Type</label>
               <div className="flex gap-4">
                 <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                    <input type="radio" value="json" checked={type === 'json'} onChange={(e)=>setType(e.target.value)} className="text-cyber-accent accent-cyber-accent bg-gray-800"/> JSON (Forums/Markets)
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                    <input type="radio" value="csv" checked={type === 'csv'} onChange={(e)=>setType(e.target.value)} className="text-cyber-accent accent-cyber-accent bg-gray-800"/> CSV (Breaches)
                 </label>
               </div>
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-300 mb-2">Select Dataset File</label>
               <input 
                  type="file" 
                  ref={fileInputRef}
                  accept={type === 'json' ? '.json' : '.csv'}
                  onChange={(e) => setFile(e.target.files[0])}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyber-accent file:text-cyber-dark hover:file:bg-cyan-400 focus:outline-none bg-gray-800 rounded border border-gray-700 p-2 cursor-pointer transition-colors"
                />
             </div>

             <button disabled={loading} className="w-full bg-cyber-accent text-cyber-dark font-bold py-3 rounded hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
               {loading ? <Activity className="animate-spin" size={20} /> : <Upload size={20} />} 
               {loading ? 'Uploading...' : 'Upload Resource'}
             </button>
          </form>
        </div>

        <div className="glass-panel p-8 flex flex-col justify-between shadow-lg">
           <div>
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-4 mb-6 relative overflow-hidden">
               2. Trigger Threat Pipeline
               <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-r from-transparent to-cyber-accent"></div>
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
               After uploading raw data, the NLP Intelligence Engine must process new inputs. Scanning text vectors for cyber-entities (IPs, Crypto, Domains, Threat Activity). 
            </p>
           </div>
           
           <button onClick={handleRunAnalysis} disabled={analyzing} className="w-full bg-transparent border border-cyber-accent text-cyber-accent hover:bg-cyber-accent hover:text-cyber-dark font-bold py-3 rounded transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
               {analyzing ? <Activity className="animate-spin" size={20} /> : <FileSearch size={20} />} 
               {analyzing ? 'Scraping with NLP...' : 'Run Threat Analysis Models'}
           </button>
        </div>
      </div>

          {message && (
        <div className={`mt-8 p-4 rounded-lg flex items-center gap-3 border ${message.includes('❌') ? 'bg-red-900 border-red-500 text-red-200' : 'bg-green-900 border-green-500 text-green-200'}`}>
          <CheckCircle size={20} /> <span className="font-medium">{message}</span>
        </div>
      )}
    </main>
  );
};

const ProfileView = ({ token, onLogout }) => {
  const user = parseJwt(token);

  if (!user) return <div className="p-8">Unable to load profile data. Try logging out and back in.</div>;

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-bold flex items-center gap-3"><User className="text-cyber-accent"/> Operative Profile</h2>
        <p className="text-gray-400 mt-2">View your access clearance and secure personnel details.</p>
      </header>
      
      <div className="glass-panel p-8 max-w-2xl relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute top-0 right-0 w-48 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyber-accent/10 to-transparent"></div>
        
        <div className="flex items-center space-x-6 mb-8 border-b border-gray-700 pb-8">
           <div className="w-24 h-24 bg-gray-800 rounded-full border-2 border-cyber-accent flex items-center justify-center text-4xl shadow-[0_0_15px_rgba(0,240,255,0.3)] font-bold text-cyber-accent uppercase">
             {user.sub ? user.sub.charAt(0) : '?'}
           </div>
           <div>
             <h3 className="text-2xl font-bold uppercase tracking-wider">{user.sub}</h3>
             <span className="inline-block mt-2 px-3 py-1 bg-cyber-accent bg-opacity-20 text-cyber-accent text-xs font-bold rounded shadow-[0_0_8px_rgba(0,240,255,0.4)]">
                CLEARANCE LEVEL: {user.role?.toUpperCase() || 'ANALYST'}
             </span>
           </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-400 mb-1 font-bold tracking-wider">SECURE EMAIL ADDRESS</p>
            <p className="text-lg bg-gray-800 bg-opacity-50 p-3 rounded border border-gray-700 font-mono tracking-wide">{user.email || 'Email unavailable... Please relogin to sync'}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-1 font-bold tracking-wider">DATABASE IDENTIFIER (JWT Sub)</p>
            <p className="text-lg bg-gray-800 bg-opacity-50 p-3 rounded border border-gray-700 font-mono text-gray-400">{user.sub}</p>
          </div>

          <div>
             <p className="text-sm text-gray-400 mb-1 font-bold tracking-wider">ACCOUNT METRICS</p>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded border border-gray-700 text-center">
                   <p className="text-3xl font-bold text-white">Active</p>
                   <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Status</p>
                </div>
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded border border-gray-700 text-center">
                   <p className="text-3xl font-bold text-cyber-success">Secured</p>
                   <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Connection</p>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
           <button onClick={onLogout} className="px-6 py-3 bg-transparent border border-red-500 text-red-500 font-bold rounded hover:bg-red-500 hover:text-white transition shadow-[0_0_10px_rgba(255,0,0,0.2)] flex items-center gap-2">
             <LogOut size={18} /> TERM SESSION
           </button>
        </div>
      </div>
    </main>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ total_intel: 0, critical_alerts: 0, total_leaks: 0 });
  const [alerts, setAlerts] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check LocalStorage for JWT Token on Initial Load
  useEffect(() => {
    const token = localStorage.getItem('dark_intel_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('dark_intel_token');
    setIsAuthenticated(false);
  }

  const fetchDashboardData = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await axios.get(`${API_BASE}/api/analysis/dashboard/stats`);
      const data = response.data;
      
      setStats({
        total_intel: data.total_intel || 0,
        critical_alerts: data.critical_alerts || 0,
        total_leaks: data.total_leaks || 0
      });
      setAlerts(data.recent_alerts || []);
      
      if (data.severity_breakdown) {
        const pData = [
          { name: 'Critical', value: data.severity_breakdown['Critical'] || 0 },
          { name: 'High', value: data.severity_breakdown['High'] || 0 },
          { name: 'Medium', value: data.severity_breakdown['Medium'] || 0 },
          { name: 'Low', value: data.severity_breakdown['Low'] || 0 },
        ].filter(d => d.value > 0);
        
        setChartData(pData.length > 0 ? pData : [{name: 'No Threat Data', value: 1, isEmpty: true}]);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // PDF Generation Logic (jsPDF & autoTable)
  const generatePDFReport = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(22);
    doc.setTextColor(0, 240, 255); // Cyber Accent Hex: 00f0ff approx
    doc.text('DARK CYBER THREAT REPORT', 14, 20);
    
    // Separator line
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 25, 196, 25);

    // Meta-data
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.text(`Generated On: ${new Date().toLocaleString()}`, 14, 32);
    doc.text(`Total Intelligence Processed: ${stats.total_intel}`, 14, 38);
    doc.text(`Compromised Credentials Found: ${stats.total_leaks}`, 14, 44);
    
    doc.setFontSize(14);
    doc.setTextColor(255, 42, 42); // Critical Red
    doc.text(`Critical Threats Detected: ${stats.critical_alerts}`, 14, 54);

    if (alerts.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Identified Major Threats / Activity:', 14, 66);
      
      const tableData = alerts.map(alert => [
        alert.severity,
        alert.title,
        alert.timestamp ? new Date(alert.timestamp).toLocaleDateString() : 'Present'
      ]);

      doc.autoTable({
        startY: 70,
        head: [['Severity', 'Description', 'Date']],
        body: tableData,
        headStyles: { fillColor: [10, 10, 15] },
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: {
          0: { cellWidth: 30, fontStyle: 'bold' },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 30 }
        },
        willDrawCell: function(data) {
          if (data.section === 'body' && data.column.index === 0) {
             if (data.cell.raw === 'Critical') data.doc.setTextColor(255, 42, 42);
             else if (data.cell.raw === 'High') data.doc.setTextColor(255, 153, 0);
             else data.doc.setTextColor(0, 0, 0);
          }
        }
      });
    } else {
       doc.setFontSize(12);
       doc.setTextColor(100, 100, 100);
       doc.text('No active threats in the database matching Critical criteria.', 14, 70);
    }

    doc.save('DARK_INTEL_REPORT.pdf');
  };

  if (!isAuthenticated) {
    return <AuthView onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="h-screen w-full flex font-sans bg-cyber-dark text-white overflow-hidden relative">
      {/* Sidebar */}
      <aside className="w-64 glass-panel border-r border-gray-800 flex flex-col p-6 m-4 rounded-xl flex-shrink-0 z-10 shadow-2xl">
        <div className="flex items-center space-x-3 mb-10">
          <ShieldAlert className="text-cyber-accent" size={32} />
          <h1 className="text-xl font-bold tracking-wider">DARK</h1>
        </div>
        
        <nav className="flex-1 space-y-4">
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-cyber-accent bg-opacity-20 text-cyber-accent text-shadow-glow' : 'hover:bg-transparent hover:bg-gray-800 text-gray-400'}`}>
            <Activity size={20} /><span>Dashboard</span>
          </button>
          <button onClick={() => setActiveTab('ingestion')} className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'ingestion' ? 'bg-cyber-accent bg-opacity-20 text-cyber-accent text-shadow-glow' : 'hover:bg-transparent hover:bg-gray-800 text-gray-400'}`}>
            <Upload size={20} /><span>Data Ingestion</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-cyber-accent bg-opacity-20 text-cyber-accent text-shadow-glow' : 'hover:bg-transparent hover:bg-gray-800 text-gray-400'}`}>
            <User size={20} /><span>Profile</span>
          </button>
        </nav>
        
        <div className="mt-auto">
          <button onClick={handleLogout} className="flex items-center space-x-3 w-full p-3 text-gray-400 hover:text-cyber-alert hover:bg-red-900 hover:bg-opacity-20 rounded-lg transition-all">
            <LogOut size={20} /><span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      {activeTab === 'dashboard' && (
        <DashboardView 
           stats={stats} 
           alerts={alerts} 
           chartData={chartData} 
           loading={loading} 
           generatePDF={generatePDFReport} 
        />
      )}
      {activeTab === 'ingestion' && (
        <IngestionView token={localStorage.getItem('dark_intel_token')} />
      )}
      {activeTab === 'profile' && (
        <ProfileView token={localStorage.getItem('dark_intel_token')} onLogout={handleLogout} />
      )}
      
    </div>
  );
};

export default App;
