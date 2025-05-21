'use client';
import { useState } from 'react';
import Head from 'next/head';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Is it beginner-friendly?",
      answer: "Absolutely! Our simple dashboard with easy-to-follow guides is designed for users of all skill levels.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, there are no contracts. You can cancel your subscription at any time with just a click.",
    },
    {
      question: "Is my capital safe?",
      answer: "Your capital is secure with end-to-end encryption and the safest API connections to your chosen exchanges.",
    },
    {
      question: "What exchanges are supported?",
      answer: "Currently, we support Binance, Coinbase, and Kraken. More exchanges will be added soon.",
    },
  ];

  return (
    <section id="faq" className="py-28 px-6 text-center">
      <h2 className="text-4xl font-bold mb-16 text-cyan-400">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg overflow-hidden hover:scale-105 transition-all duration-300">
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full flex items-center justify-between px-6 py-4 text-lg font-semibold text-white hover:text-cyan-400 focus:outline-none transition-all"
            >
              <span>{faq.question}</span>
              <span className={`transform transition-all duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                &#9660;
              </span>
            </button>
            <div
              className={`px-6 pb-6 text-left text-gray-400 transition-all duration-500 ${activeIndex === index ? 'max-h-[500px]' : 'max-h-0 overflow-hidden'}`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="font-poppins bg-gradient-to-br from-[#0f172a] via-[#0b1120] to-[#000000] text-white min-h-screen overflow-x-hidden">
      <Head>
        <title>Mttrader Bot | AI Crypto Trading</title>
        <meta name="description" content="Mttrader: The future of automated crypto trading using AI precision." />
      </Head>

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-3xl font-bold text-cyan-400 tracking-tight">Mttrader</div>
          <nav className="hidden md:flex gap-10 text-gray-300 text-lg font-medium">
            <button onClick={() => router.push('#about')} className="hover:text-cyan-400 transition">About</button>
            <button onClick={() => router.push('#features')} className="hover:text-cyan-400 transition">Features</button>
            <button onClick={() => router.push('#pricing')} className="hover:text-cyan-400 transition">Pricing</button>
            <button onClick={() => router.push('#faq')} className="hover:text-cyan-400 transition">FAQ</button>
          </nav>
          <button onClick={handleRedirect} className="hidden md:block bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-2 px-6 rounded-full shadow-lg transition-all">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen pt-32 px-6 text-center relative overflow-hidden">
        {/* Glow background circle */}
        <div className="absolute w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-3xl top-[-200px]"></div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 text-transparent bg-clip-text animate-fadeIn">
          Dominate Crypto Markets<br />with Mttrader Bot
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-8 animate-fadeIn delay-100">
          Next-gen AI trading bot for effortless profits. Smarter. Faster. Safer.
        </p>
        <div className="flex gap-6 animate-fadeIn delay-200">
          <button onClick={handleRedirect} className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 px-8 rounded-full shadow-md transition-all">
            Start Trading
          </button>
          <button onClick={handleRedirect} className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-3 px-8 rounded-full transition-all">
            Watch Demo
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28 px-6 bg-[#111827] text-center">
        <h2 className="text-4xl font-bold mb-8 text-cyan-400">Why Mttrader?</h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Mttrader combines AI decision-making with lightning execution speeds, enabling you to outperform human traders and market bots alike — fully automated and always learning.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="py-28 px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">Game-Changing Features</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {[ 
            ["⚡ Ultra-Fast Orders", "Execute trades faster than 99% of competitors."],
            ["🤖 AI Smart Algorithms", "Self-learning AI evolves with market shifts."],
            ["🛡️ Capital Protection", "Built-in stop-loss and dynamic risk adjustment."],
            ["🌐 Multichain Trading", "Trade across Binance, Coinbase, Kraken."],
            ["📈 Real-Time Analytics", "Instantly visualize your performance."],
            ["🔒 Military-Grade Security", "End-to-end encrypted API integration."]
          ].map(([title, desc], idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white/5 hover:bg-white/10 backdrop-blur-lg transition-all hover:scale-105 text-center shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-cyan-300">{title}</h3>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-black text-center">
        <h2 className="text-4xl font-bold mb-12">Mttrader in Numbers</h2>
        <div className="flex flex-wrap justify-center gap-20 text-5xl font-extrabold">
          <div>97%<p className="text-lg font-normal">Win Rate</p></div>
          <div>300%<p className="text-lg font-normal">Avg. ROI</p></div>
          <div>1M+<p className="text-lg font-normal">Trades Executed</p></div>
          <div>99.99%<p className="text-lg font-normal">System Uptime</p></div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-28 bg-[#111827] text-center">
        <h2 className="text-4xl font-bold mb-16 text-cyan-400">Simple Pricing</h2>
        <div className="flex flex-col md:flex-row gap-12 justify-center max-w-6xl mx-auto">
          {[ 
            { title: "Starter", price: "$19", features: ["Basic AI Bot", "Standard Support", "Max $10K Trading Volume"] },
            { title: "Pro", price: "$49", features: ["All Starter Features", "Advanced AI Bot", "Unlimited Volume", "Priority Support"] },
          ].map((plan, idx) => (
            <div key={idx} className={`w-full md:w-1/3 p-10 rounded-3xl backdrop-blur-lg ${idx === 1 ? "bg-cyan-400 text-black" : "bg-white/5 text-white"} shadow-xl hover:scale-105 transition-all`}>
              <h3 className="text-2xl font-bold mb-6">{plan.title}</h3>
              <p className="text-5xl font-extrabold mb-6">{plan.price}<span className="text-xl">/mo</span></p>
              <ul className="text-left space-y-4 mb-8">
                {plan.features.map((f, i) => <li key={i}>✅ {f}</li>)}
              </ul>
              <button className={`w-full py-3 rounded-full font-bold ${idx === 1 ? "bg-black text-white" : "bg-cyan-400 text-black"} transition-all`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <footer className="bg-[#1f2937] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="text-4xl font-bold text-cyan-400 mb-6">
              Mttrader
            </div>
            <p className="text-gray-400 text-sm text-center md:text-left">
              Mttrader is a trading bot platform designed to help you make smarter trades with automated algorithms.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-lg text-cyan-400 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => router.push('#about')} className="hover:text-cyan-400">About</button></li>
              <li><button onClick={() => router.push('#features')} className="hover:text-cyan-400">Features</button></li>
              <li><button onClick={() => router.push('#pricing')} className="hover:text-cyan-400">Pricing</button></li>
              <li><button onClick={() => router.push('#faq')} className="hover:text-cyan-400">FAQ</button></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-lg text-cyan-400 mb-4">Follow Us</h4>
            <div className="flex space-x-6 text-2xl text-gray-400">
              <a href="https://facebook.com" className="hover:text-cyan-400">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" className="hover:text-cyan-400">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" className="hover:text-cyan-400">
                <FaLinkedin />
              </a>
              <a href="https://github.com" className="hover:text-cyan-400">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
