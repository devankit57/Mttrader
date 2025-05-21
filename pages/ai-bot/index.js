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
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';

export default function AIBotPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>AI Bot | Mttrader</title>
        <meta name="description" content="AI-powered crypto trading assistant on Mttrader" />
      </Head>

      <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] via-[#0b1120] to-black font-poppins text-white overflow-hidden">

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-50 w-72 h-screen bg-white/5 backdrop-blur-lg border-r border-white/10 shadow-lg transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
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
              <SidebarLink icon={<FaHome />} label="Home" href="/dashboard" onClick={closeSidebar} />
              <SidebarLink icon={<FaRupeeSign />} label="Subscriptions" href="/invoices" onClick={closeSidebar} />
              <SidebarLink icon={<FaChartLine />} label="Trade History" href="/trade-history" onClick={closeSidebar} />
              <SidebarLink icon={<FaRobot />} label="AI Bot" href="/ai-bot" active onClick={closeSidebar} />
              <SidebarLink icon={<FaCogs />} label="Settings" href="/settings" onClick={closeSidebar} />
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10">
              <SidebarLink icon={<FaSignOutAlt />} label="Logout" href="/logout" onClick={closeSidebar} />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden md:ml-72">
          <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-lg shadow-sm">
            <button
              className="md:hidden text-cyan-400 text-2xl"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <FaBars />
            </button>

            <h1 className="text-xl font-bold text-cyan-300">AI Bot</h1>
            <div className="text-sm text-gray-300">🤖 Assistant Mode: <strong className="text-white">Active</strong></div>
          </header>

          <main className="p-6 md:p-10 flex-1 overflow-y-auto">
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-cyan-400">AI Trading Assistant</h2>
              <p className="text-gray-400 mt-1">Interact with your AI bot for trading recommendations, market insights, and portfolio advice.</p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Ask the AI</h3>

              {/* Chat box or interaction area */}
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg text-gray-300">
                  💬 <strong>Suggestion:</strong> "Based on current trends, buying ETH may offer short-term gains. Would you like me to proceed?"
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition">
                    Accept Suggestion
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-white/20 text-gray-300 hover:bg-white/10 transition">
                    Ask Another
                  </button>
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
