'use client';

import {
  FaChartLine,
  FaRupeeSign,
  FaRobot,
  FaCogs,
  FaSignOutAlt,
  FaHome,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import Head from 'next/head';
import Link from 'next/link'; 
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading dashboard...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard | Mttrader</title>
        <meta name="description" content="AI-powered crypto trading dashboard" />
      </Head>

      <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] via-[#0b1120] to-black font-poppins text-white overflow-hidden">

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-50 w-72 h-screen bg-white/5 backdrop-blur-lg border-r border-white/10 shadow-lg transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-10">
              <span className="text-cyan-400 text-2xl font-extrabold">Mttrader</span>
              <button
                onClick={closeSidebar}
                className="md:hidden text-cyan-400 text-2xl"
                aria-label="Close sidebar"
              >
                <FaTimes />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              <SidebarLink icon={<FaHome />} label="Home" href="/dashboard" active onClick={closeSidebar} />
              <SidebarLink icon={<FaRupeeSign />} label="Subscriptions" href="/invoices" onClick={closeSidebar} />
              <SidebarLink icon={<FaChartLine />} label="Trade History" href="/trade-history" onClick={closeSidebar} />
              <SidebarLink icon={<FaRobot />} label="AI Bot" href="/ai-bot" onClick={closeSidebar} />
              <SidebarLink icon={<FaCogs />} label="Settings" href="/settings" onClick={closeSidebar} />
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10">
              <SidebarLink icon={<FaSignOutAlt />} label="Logout" href="/logout" onClick={closeSidebar} />
            </div>
          </div>
        </aside>

        {/* Main content wrapper */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden md:ml-72">

          {/* Navbar */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-lg shadow-sm">
            <button
              className="md:hidden text-cyan-400 text-2xl"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <FaBars />
            </button>

            <h1 className="text-xl font-bold text-cyan-300">Dashboard</h1>

            <div className="text-sm text-gray-300">
              👤 Logged in as <strong className="text-white">{session?.user?.name || 'User'}</strong>
            </div>
          </header>

          {/* Main content area */}
          <main className="p-6 md:p-10 flex-1 overflow-y-auto">
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-cyan-400">Welcome back, {session?.user?.name || 'Trader'}</h2>
              <p className="text-gray-400 mt-1">Your AI-powered trading hub</p>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <StatCard title="Wallet Balance" value="$18,240.50" icon={<FaRupeeSign />} />
              <StatCard title="Last Trade" value="BTC +7.4%" icon={<FaChartLine />} />
              <StatCard title="AI Bot Status" value="Active" icon={<FaRobot />} />
            </section>

            {/* How It Works */}
            <section className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">How It Works</h3>
              <div className="flex flex-col gap-4 text-white">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">1.</span>
                  <p><strong>Start Trade:</strong> Launch the AI-powered trade engine.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">2.</span>
                  <p><strong>Stop AI Bot:</strong> Pause or stop the bot anytime.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">3.</span>
                  <p><strong>Withdraw Funds:</strong> Securely transfer your profits to your wallet.</p>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </>
  );
}

function SidebarLink({ icon, label, href, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium w-full transition-all ${
        active
          ? 'bg-cyan-400/20 text-cyan-300 shadow'
          : 'hover:bg-white/10 text-gray-300 hover:text-white'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow hover:shadow-xl transition-all">
      <div className="flex items-center gap-3 text-cyan-300 mb-2">
        <span className="text-2xl">{icon}</span>
        <h4 className="text-base font-semibold">{title}</h4>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
