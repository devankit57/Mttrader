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
import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
export default function TradeHistoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const { data: session } = useSession();

  const trades = [
    {
      date: '2025-05-15',
      pair: 'BTC/INR',
      type: 'Buy',
      amount: '₹50,000',
      status: 'Completed',
      tradeId: 'TRD1001',
    },
    {
      date: '2025-05-14',
      pair: 'ETH/INR',
      type: 'Sell',
      amount: '₹20,000',
      status: 'Completed',
      tradeId: 'TRD1000',
    },
    {
      date: '2025-05-13',
      pair: 'BNB/INR',
      type: 'Buy',
      amount: '₹10,000',
      status: 'Pending',
      tradeId: 'TRD0999',
    },
  ];

  return (
    <>
      <Head>
        <title>Trade History | Mttrader</title>
        <meta name="description" content="Review your past crypto trades on Mttrader" />
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
              <SidebarLink icon={<FaChartLine />} label="Trade History" href="/trade-history" active onClick={closeSidebar} />
              <SidebarLink icon={<FaRobot />} label="AI Bot" href="/ai-bot" onClick={closeSidebar} />
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

            <h1 className="text-xl font-bold text-cyan-300">Trade History</h1>
            <div className="text-sm text-gray-300">👤 Logged in as <strong className="text-white">{session.user.name}</strong></div>
          </header>

          <main className="p-6 md:p-10 flex-1 overflow-y-auto">
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-cyan-400">Your Trade Activity</h2>
              <p className="text-gray-400 mt-1">Review all completed and pending trades on your account</p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Recent Trades</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <thead className="bg-white/10">
                    <tr className="text-left text-gray-300">
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Pair</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Trade ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trades.map((trade, index) => (
                      <tr key={index} className="border-t border-white/10 hover:bg-white/5 transition">
                        <td className="px-6 py-4 text-gray-200">{trade.date}</td>
                        <td className="px-6 py-4 text-cyan-300">{trade.pair}</td>
                        <td className="px-6 py-4 text-gray-200">{trade.type}</td>
                        <td className="px-6 py-4 text-cyan-300">{trade.amount}</td>
                        <td className={`px-6 py-4 ${trade.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {trade.status}
                        </td>
                        <td className="px-6 py-4 text-gray-400">{trade.tradeId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
