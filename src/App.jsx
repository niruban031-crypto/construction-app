import { supabase } from './supabaseClient';
import React, { useState, useEffect } from 'react';
import { 
  Building2, LayoutDashboard, ShieldUser, Wrench, Users, PhoneCall, 
  LogIn, LogOut, Plus, Trash2, Edit3, CheckCircle2, Clock, AlertTriangle, 
  Search, Filter, ChevronRight, Menu, X, UserCheck, HardHat, FileText, Send
} from 'lucide-react';

const initialAdmins = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh.k@buildcorp.com', role: 'Super Admin', status: 'Active', lastLogin: 'Today, 10:45 AM' },
  { id: 2, name: 'Priya Sharma', email: 'priya.s@buildcorp.com', role: 'Project Manager', status: 'Active', lastLogin: 'Yesterday, 4:20 PM' },
  { id: 3, name: 'Vikram Singh', email: 'vikram.s@buildcorp.com', role: 'Safety Inspector', status: 'Inactive', lastLogin: '3 days ago' }
];

const initialEquipment = [
  { id: 1, name: 'CAT 320 Hydraulic Excavator', quantity: 2, supplier: 'HeavyMachinery Corp', status: 'Delivered', date: '2026-06-01' },
  { id: 2, name: 'Tower Crane Liebherr 150', quantity: 1, supplier: 'Skyline Equipment', status: 'Approved', date: '2026-06-10' },
  { id: 3, name: 'JCB 3CX Backhoe Loader', quantity: 4, supplier: 'EarthMovers Ltd', status: 'Pending', date: '2026-06-15' },
  { id: 4, name: 'Concrete Mixer Truck', quantity: 3, supplier: 'BuildMix India', status: 'Delivered', date: '2026-05-28' }
];

const initialEmployees = [
  { id: 1, name: 'Amit Patel', role: 'Site Engineer', phone: '+91 98765 43210', site: 'Metro Station Phase 2', status: 'Active' },
  { id: 2, name: 'Suresh Menon', role: 'Lead Electrician', phone: '+91 91234 56789', site: 'Skyline Towers', status: 'Active' },
  { id: 3, name: 'Manoj Kumar', role: 'Safety Supervisor', phone: '+91 99887 76655', site: 'Highway Expressway', status: 'On Leave' },
  { id: 4, name: 'Deepak Roy', role: 'Masonry Specialist', phone: '+91 94455 66778', site: 'Metro Station Phase 2', status: 'Active' }
];
function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
        active 
          ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
          : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'Rajesh Kumar', role: 'Super Admin', email: 'rajesh.k@buildcorp.com' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [admins, setAdmins] = useState(initialAdmins);
  const [equipment, setEquipment] = useState(initialEquipment);
  const [employees, setEmployees] = useState(initialEmployees);
  const [supportMessages, setSupportMessages] = useState([]);
  const [loading, setLoading] = useState(true);

// Supabase Data Fetching
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data: equipData } = await supabase.from('equipment_orders').select('*');
        if (equipData && equipData.length > 0) setEquipment(equipData);

        const { data: empData } = await supabase.from('employees').select('*');
        if (empData && empData.length > 0) setEmployees(empData);
      } catch (err) {
        console.log("Supabase fetch error:", err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  useEffect(() => {
    localStorage.setItem('cms_admins', JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    localStorage.setItem('cms_equipment', JSON.stringify(equipment));
  }, [equipment]);

  useEffect(() => {
    localStorage.setItem('cms_employees', JSON.stringify(employees));
  }, [employees]);

  if (!isAuthenticated) {
    return <LoginPage onLogin={(user) => { setIsAuthenticated(true); setCurrentUser(user); }} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-500 p-2 rounded-xl text-slate-950 font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold tracking-wide text-amber-500 text-lg">BUILD<span className="text-white">PRO</span></h1>
            <p className="text-xs text-slate-400">Construction Management</p>
          </div>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 hidden md:flex items-center space-x-3 border-b border-slate-800/80">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-xl text-slate-950 shadow-lg shadow-amber-500/20">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-wider bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">BUILDPRO</h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide">ENTERPRISE CMS</p>
          </div>
        </div>

        {/* User Info Badge */}
        <div className="mx-4 mt-6 p-3.5 bg-slate-800/60 border border-slate-700/50 rounded-xl flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold text-slate-200 truncate">{currentUser.name}</h4>
            <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
              {currentUser.role}
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <NavItem 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }} 
          />
          <NavItem 
            icon={<ShieldUser className="w-5 h-5" />} 
            label="Admin Management" 
            active={activeTab === 'admins'} 
            onClick={() => { setActiveTab('admins'); setSidebarOpen(false); }} 
          />
          <NavItem 
            icon={<Wrench className="w-5 h-5" />} 
            label="Equipment Orders" 
            active={activeTab === 'equipment'} 
            onClick={() => { setActiveTab('equipment'); setSidebarOpen(false); }} 
          />
          <NavItem 
            icon={<Users className="w-5 h-5" />} 
            label="Add Employees" 
            active={activeTab === 'employees'} 
            onClick={() => { setActiveTab('employees'); setSidebarOpen(false); }} 
          />
          <NavItem 
            icon={<PhoneCall className="w-5 h-5" />} 
            label="Contact & Support" 
            active={activeTab === 'contact'} 
            onClick={() => { setActiveTab('contact'); setSidebarOpen(false); }} 
          />
        </nav>

        {/* Logout Footer */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition font-medium border border-red-500/20 text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="max-w-7xl w-full mx-auto p-4 md:p-8 flex-1">
          {activeTab === 'dashboard' && <Dashboard admins={admins} equipment={equipment} employees={employees} setActiveTab={setActiveTab} />}
          {activeTab === 'admins' && <AdminBoard admins={admins} setAdmins={setAdmins} />}
          {activeTab === 'equipment' && <EquipmentPage equipment={equipment} setEquipment={setEquipment} />}
          {activeTab === 'employees' && <EmployeePage employees={employees} setEmployees={setEmployees} />}
          {activeTab === 'contact' && <ContactPage supportMessages={supportMessages} setSupportMessages={setSupportMessages} />}
        </div>
      </main>

    </div>
  );
}
   function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Super Admin');
  const [error, setError] = useState('');

  // 🔑 ஒவ்வொரு Role-க்கும் தனித்தனி Login details
  const ROLE_ACCOUNTS = {
    'Super Admin': {
      email: 'admin@buildcorp.com',
      password: 'admin123'
    },
    'Project Manager': {
      email: 'pm@buildcorp.com',
      password: 'pm123'
    },
    'Site Engineer': {
      email: 'engineer@buildcorp.com',
      password: 'eng123'
    },
    'Safety Inspector': {
      email: 'safety@buildcorp.com',
      password: 'safe123'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields!');
      return;
    }

    const selectedAccount = ROLE_ACCOUNTS[role];

    if (email.toLowerCase() !== selectedAccount.email.toLowerCase() || password !== selectedAccount.password) {
      setError(`❌ Invalid Email or Password for ${role}!`);
      return;
    }

    setError('');
    onLogin({ 
      name: email.split('@')[0].toUpperCase(), 
      role: role, 
      email: email 
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/20">
            <Building2 className="w-6 h-6 text-slate-950" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-wide">BUILDPRO CMS</h1>
          <p className="text-xs text-slate-400 mt-1">Construction & Site Management Portal</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Select Access Role</label>
            <select 
              value={role} 
              onChange={(e) => {
                setRole(e.target.value);
                setError('');
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm font-semibold"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Site Engineer">Site Engineer</option>
              <option value="Safety Inspector">Safety Inspector</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Work Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder={`e.g. ${ROLE_ACCOUNTS[role].email}`}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 mt-6"
          >
            <span>Sign In to Portal</span>
            <LogIn className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Passwords List */}
        <div className="mt-6 p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-[11px] text-slate-400 space-y-1">
          <p className="font-bold text-amber-400 mb-1">🔑 Demo Login Credentials:</p>
          <p>• <b>Super Admin:</b> admin@buildcorp.com | admin123</p>
          <p>• <b>Project Manager:</b> pm@buildcorp.com | pm123</p>
          <p>• <b>Site Engineer:</b> engineer@buildcorp.com | eng123</p>
          <p>• <b>Safety Inspector:</b> safety@buildcorp.com | safe123</p>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ admins, equipment, employees, setActiveTab }) {
  const pendingOrdersCount = equipment.filter(e => e.status === 'Pending').length;
  const activeEmployeesCount = employees.filter(e => e.status === 'Active').length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-900/40 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Dashboard Overview</h2>
          <p className="text-sm text-slate-400 mt-1">Monitor active construction sites, machinery orders, and staff deployments in real-time.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setActiveTab('equipment')}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Order</span>
          </button>
          <button 
            onClick={() => setActiveTab('employees')}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-4 py-2.5 rounded-xl text-sm transition border border-slate-700 flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Manage Staff</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Projects" value="4 Active" change="+1 this month" icon={<Building2 className="w-6 h-6 text-amber-400" />} color="border-amber-500/30 bg-amber-500/5" />
        <StatCard title="Active Equipment" value={equipment.length + " Units"} change="All sites operational" icon={<Wrench className="w-6 h-6 text-blue-400" />} color="border-blue-500/30 bg-blue-500/5" />
        <StatCard title="Total Employees" value={employees.length + " Staff"} change={`${activeEmployeesCount} currently active`} icon={<Users className="w-6 h-6 text-emerald-400" />} color="border-emerald-500/30 bg-emerald-500/5" />
        <StatCard title="Pending Orders" value={pendingOrdersCount + " Orders"} change="Requires approval" icon={<Clock className="w-6 h-6 text-amber-500" />} color="border-amber-500/30 bg-amber-500/5" />
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon, color }) {
  return (
    <div className={`border rounded-2xl p-5 ${color} flex flex-col justify-between`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</span>
        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">{icon}</div>
      </div>
      <div>
        <h3 className="text-2xl font-black text-white">{value}</h3>
        <p className="text-xs text-slate-400 mt-1">{change}</p>
      </div>
    </div>
  );
}
function AdminBoard({ admins, setAdmins }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Project Manager');

  // புது Admin-ஐ Supabase-ல் Insert செய்யும் ஃபங்ஷன்
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const newAdmin = {
      name: name,
      email: email,
      role: role,
      status: 'Active'
    };

    // 1. Save to Supabase 'admins' Table
    const { data, error } = await supabase
      .from('admins')
      .insert([newAdmin])
      .select();

    if (error) {
      console.error('Error inserting admin:', error);
      alert('Error saving admin: ' + error.message);
    } else {
      alert('Admin saved successfully to Supabase!');
      if (data && data.length > 0) {
        setAdmins([data[0], ...admins]);
      } else {
        setAdmins([newAdmin, ...admins]);
      }
      setName('');
      setEmail('');
      setShowModal(false);
    }
  };

  const handleDelete = async (id) => {
    // Supabase Delete
    await supabase.from('admins').delete().eq('id', id);
    setAdmins(admins.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Admin Management</h2>
          <p className="text-sm text-slate-400 mt-1">Manage system administrators, project managers, and security access roles.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Admin</span>
        </button>
      </div>

      {/* Admins Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-semibold text-white">{admin.name}</td>
                  <td className="p-4 text-slate-300">{admin.email}</td>
                  <td className="p-4 text-amber-400">{admin.role}</td>
                  <td className="p-4">
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold border border-emerald-500/20">
                      {admin.status || 'Active'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(admin.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition border border-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">No admins found. Add one above!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Admin Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Add System Administrator</h3>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                  placeholder="e.g. Niruban"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                  placeholder="niruban@buildcorp.com"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Role</label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                >
                  <option value="Project Manager">Project Manager</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Safety Inspector">Safety Inspector</option>
                  <option value="Site Engineer">Site Engineer</option>
                </select>
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 rounded-xl transition text-sm border border-slate-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition text-sm shadow-lg shadow-amber-500/20"
                >
                  Save to Supabase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
function EquipmentPage({ equipment, setEquipment }) {
  const [showModal, setShowModal] = useState(false);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [site, setSite] = useState('');
  const [filter, setFilter] = useState('All');

  // புது Equipment Order-ஐ Supabase-ல் Insert செய்யும் ஃபங்ஷன்
  const handleAddEquipment = async (e) => {
    e.preventDefault();
    if (!itemName || !site) return;

    const newEquip = {
      item_name: itemName,
      quantity: Number(quantity),
      status: 'Pending',
      site: site
    };

    // 1. Save to Supabase 'equipment_orders' Table
    const { data, error } = await supabase
      .from('equipment_orders')
      .insert([newEquip])
      .select();

    if (error) {
      console.error('Error inserting to Supabase:', error);
      alert('Error saving order: ' + error.message);
    } else {
      alert('Equipment Order saved to Supabase!');
      if (data && data.length > 0) {
        setEquipment([data[0], ...equipment]);
      } else {
        setEquipment([newEquip, ...equipment]);
      }
      setItemName('');
      setQuantity(1);
      setSite('');
      setShowModal(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    // Supabase Status Update
    await supabase.from('equipment_orders').update({ status: newStatus }).eq('id', id);
    setEquipment(equipment.map(e => e.id === id ? { ...e, status: newStatus } : e));
  };

  const handleDelete = async (id) => {
    // Supabase Delete
    await supabase.from('equipment_orders').delete().eq('id', id);
    setEquipment(equipment.filter(e => e.id !== id));
  };

  const filteredEquipment = filter === 'All' 
    ? equipment 
    : equipment.filter(e => e.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Equipment & Machinery Orders</h2>
          <p className="text-sm text-slate-400 mt-1">Track heavy equipment deliveries, approve requests, and manage construction sites.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Equipment Order</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {['All', 'Pending', 'Approved', 'Delivered', 'build'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              filter === status 
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Equipment Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="p-4">Item / Equipment Name</th>
                <th className="p-4">Qty</th>
                <th className="p-4">Site Location</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {filteredEquipment.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-semibold text-white">{item.item_name || item.name}</td>
                  <td className="p-4 text-slate-300">{item.quantity}</td>
                  <td className="p-4 text-slate-400">{item.site || item.supplier || 'Main Site'}</td>
                  <td className="p-4">
                    <select
                      value={item.status}
                      onChange={(e) => updateStatus(item.id, e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs font-semibold text-amber-400 rounded-lg px-2.5 py-1 focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Delivered">Delivered</option>
                      <option value="build">Build</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition border border-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEquipment.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">No equipment orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Equipment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Request Equipment Order</h3>
            <form onSubmit={handleAddEquipment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Item / Machinery Name</label>
                <input 
                  type="text" 
                  value={itemName} 
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                  placeholder="e.g. Hydraulic Excavator"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Quantity</label>
                <input 
                  type="number" 
                  min="1"
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Construction Site</label>
                <input 
                  type="text" 
                  value={site} 
                  onChange={(e) => setSite(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                  placeholder="e.g. Skyline Towers Phase 2"
                  required 
                />
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 rounded-xl transition text-sm border border-slate-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition text-sm shadow-lg shadow-amber-500/20"
                >
                  Save to Supabase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
function EmployeePage({ employees, setEmployees }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Site Engineer');
  const [phone, setPhone] = useState('');
  const [site, setSite] = useState('Metro Station Phase 2');

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    const newEmp = {
      name: name,
      role: role,
      phone: phone,
      site: site,
      status: 'Active'
    };

    // 1. Save to Supabase Database
    const { data, error } = await supabase
      .from('employees')
      .insert([newEmp])
      .select();

    if (error) {
      console.error('Error inserting to Supabase:', error);
      alert('Error saving to Supabase: ' + error.message);
    } else {
      // 2. Update UI
      if (data && data.length > 0) {
        setEmployees([data[0], ...employees]);
      } else {
        setEmployees([newEmp, ...employees]);
      }
      setName('');
      setPhone('');
      setShowModal(false);
    }
  };

  const handleDelete = async (id) => {
    // Supabase Delete
    await supabase.from('employees').delete().eq('id', id);
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Employee Management</h2>
          <p className="text-sm text-slate-400 mt-1">Manage engineers, workers, and field staff deployments.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Employee</span>
        </button>
      </div>

      {/* Employee List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="p-4">Name</th>
                <th className="p-4">Role</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Assigned Site</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-semibold text-white">{emp.name}</td>
                  <td className="p-4 text-slate-300">{emp.role}</td>
                  <td className="p-4 text-slate-400">{emp.phone}</td>
                  <td className="p-4 text-amber-400">{emp.site}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(emp.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition border border-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">No employees found. Add one above!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Add Field Employee</h3>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Employee Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                  placeholder="e.g. Suresh Menon"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Role</label>
                <input 
                  type="text" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                  placeholder="e.g. Lead Electrician"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Phone Number</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                  placeholder="+91 91234 56789"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Assigned Site</label>
                <input 
                  type="text" 
                  value={site} 
                  onChange={(e) => setSite(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                  placeholder="e.g. Skyline Towers"
                  required 
                />
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 rounded-xl transition text-sm border border-slate-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition text-sm shadow-lg shadow-amber-500/20"
                >
                  Save to Supabase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
function ContactPage({ supportMessages, setSupportMessages }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Supabase-ல் இருந்து ஏற்கனவே உள்ள Support Messages-ஐ fetch செய்ய
  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setSupportMessages(data);
    }
    fetchMessages();
  }, [setSupportMessages]);

  // புது Message-ஐ Supabase-ல் Insert செய்யும் ஃபங்ஷன்
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);

    const newMessage = {
      name: name,
      email: email,
      message: message
    };

    // 1. Supabase 'contact_messages' டேபிளுக்கு அனுப்பவது
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([newMessage])
      .select();

    if (error) {
      console.error('Error sending message:', error);
      alert('Error saving message to Supabase: ' + error.message);
    } else {
      alert('Message sent successfully!');
      if (data && data.length > 0) {
        setSupportMessages([data[0], ...supportMessages]);
      } else {
        setSupportMessages([newMessage, ...supportMessages]);
      }
      // Form fields-ஐ Reset செய்வது
      setName('');
      setEmail('');
      setMessage('');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Contact & Support Portal</h2>
        <p className="text-sm text-slate-400 mt-1">Send emergency site notes, technical support queries, or system issues directly to admins.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Send Support Message Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <Send className="w-5 h-5 text-amber-500" />
            <span>Send New Message</span>
          </h3>

          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Your Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                placeholder="e.g. Niruban"
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                placeholder="niruban@buildcorp.com"
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Message / Inquiry</label>
              <textarea 
                rows="4"
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 text-sm resize-none"
                placeholder="Describe your site issue or message..."
                required 
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Sending...' : 'Send to Supabase'}</span>
            </button>
          </form>
        </div>

        {/* Message Log Feed */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-4">Support Inquiries Feed</h3>
          <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2 flex-1">
            {supportMessages.map((msg, index) => (
              <div key={msg.id || index} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-amber-400">{msg.name}</h4>
                  <span className="text-xs text-slate-500">{msg.email}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{msg.message}</p>
              </div>
            ))}

            {supportMessages.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-sm">
                No messages sent yet. Fill out the form on the left!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}