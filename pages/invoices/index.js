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
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [subscriptionDate, setSubscriptionDate] = useState('');
  const [subscription, setSubscription] = useState({ status: 'Inactive', expiry: '' });
  const { data: session } = useSession();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const fetchRecentSubscription = async () => {
      try {
        const res = await fetch('/api/payments/recent');
        const data = await res.json();

        if (res.ok && data.subscriptionDate) {
          const subDate = new Date(data.subscriptionDate);
          const expiryDate = new Date(subDate);
          expiryDate.setDate(expiryDate.getDate() + 30);

          const today = new Date();
          const isActive = today >= subDate && today <= expiryDate;

          setSubscription({
            status: isActive ? 'Active' : 'Inactive',
            expiry: expiryDate.toISOString().split('T')[0],
          });
        }
      } catch (err) {
        console.error('Failed to fetch subscription:', err);
      }
    };

    fetchRecentSubscription();
  }, []);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/payments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId,
          subscriptionDate,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Payment saved successfully!');
        setShowModal(false);
        window.location.reload();
      } else {
        alert('Error saving payment: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <>
      <Head>
        <title>Subscriptions | Mttrader</title>
        <meta name="description" content="Manage your Mttrader subscriptions" />
      </Head>

      <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] via-[#0b1120] to-black font-poppins text-white overflow-hidden">
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
              <SidebarLink icon={<FaRupeeSign />} label="Subscriptions" href="/invoices" active onClick={closeSidebar} />
              <SidebarLink icon={<FaChartLine />} label="Trade History" href="/trade-history" onClick={closeSidebar} />
              <SidebarLink icon={<FaRobot />} label="AI Bot" href="/ai-bot" onClick={closeSidebar} />
              <SidebarLink icon={<FaCogs />} label="Settings" href="/settings" onClick={closeSidebar} />
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10">
              <SidebarLink icon={<FaSignOutAlt />} label="Logout" href="/logout" onClick={closeSidebar} />
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-h-screen overflow-hidden md:ml-72">
          <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-lg shadow-sm">
            <button className="md:hidden text-cyan-400 text-2xl" onClick={toggleSidebar} aria-label="Toggle sidebar">
              <FaBars />
            </button>
            <h1 className="text-xl font-bold text-cyan-300">Subscriptions</h1>
            <div className="text-sm text-gray-300">
              👤 Logged in as <strong className="text-white">{session?.user?.name}</strong>
            </div>
          </header>

          {subscription.status !== 'Active' && (
            <div className="bg-yellow-500/20 text-yellow-300 text-sm px-6 py-3 text-center font-medium flex items-center justify-between">
              <span>You don't have an active subscription. Pay now to get your subscription.</span>
              <button
                onClick={() => setShowModal(true)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-1 rounded-md ml-4"
              >
                Pay Now
              </button>
            </div>
          )}

          <main className="p-6 md:p-10 flex-1 overflow-y-auto">
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-cyan-400">Manage Your Subscriptions</h2>
              <p className="text-gray-400 mt-1">View, renew, and manage your Mttrader plan</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">Subscription Status</h3>
                <p className={`text-lg font-medium ${subscription.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                  {subscription.status}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">Expiry Date</h3>
                <p className="text-lg font-medium text-gray-300">{subscription.expiry || 'N/A'}</p>
              </div>
            </section>
          </main>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1e293b] p-6 rounded-2xl w-full max-w-md relative border border-white/10 shadow-xl">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-white text-lg">
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold text-cyan-400 mb-4">Complete Your Payment</h2>
            <div className="bg-white rounded-md p-4 mb-4">
              <img src="/payment.png" alt="UPI QR Code" className="w-full" />
            </div>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Transaction ID</label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-md bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Date of Subscription</label>
                <input
                  type="date"
                  value={subscriptionDate}
                  onChange={(e) => setSubscriptionDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-md bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-md font-semibold"
              >
                Submit Payment
              </button>
            </form>
          </div>
        </div>
      )}
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
