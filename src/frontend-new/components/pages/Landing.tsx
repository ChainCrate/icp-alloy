import { motion } from 'framer-motion';
import { Cloud, Zap, Menu, X, Vault } from 'lucide-react';
import VaultsGrid from './Vaults';

const LandingPage = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen min-w-full bg-blue-400">
      {/* Navigation Bar */}
      {/* <nav className="px-4 py-4 max-w-6xl mx-auto flex items-center justify-between relative">
        <div className="flex items-center space-x-2">
          <Zap className="w-6 h-6 text-white" />
          <span className="text-black font-bold text-xl">VAULTed</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="/"
            className="px-4 py-2 bg-white rounded-full text-black font-medium"
          >
            Home
          </a>
          <a
            href="/vaults"
            className="px-6 py-2 bg-yellow-400 rounded-full text-black font-medium hover:bg-yellow-300 transition-colors"
          >
            Launch App
          </a>
        </div>

        <button
          className="md:hidden p-2 text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg md:hidden">
            <a
              href="/"
              className="w-full text-left px-4 py-2 text-black hover:bg-gray-100"
            >
              Home
            </a>
            <a
              href="/vaults"
              className="w-full text-left px-4 py-2 text-yellow-500 hover:bg-gray-100"
            >
              Launch App
            </a>
          </div>
        )}
      </nav> */}

      {/* Hero Section */}
      <div className="relative max-w-6xl mx-auto pt-8 md:pt-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            boxShadow: '0 0 30px rgba(255,255,255,0.5)',
            transition: { duration: 0.3 },
          }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-10 md:p-16 relative overflow-hidden"
        >
          {/* Animated Circles */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial="initial"
            whileHover="hover"
          >
            {/* Top Left Circle */}
            <motion.div
              className="absolute -left-8 -top-8 w-16 h-16 bg-yellow-400/30 rounded-full"
              variants={{
                initial: { x: 0, y: 0 },
                hover: { x: 40, y: 40, transition: { duration: 0.8 } },
              }}
            />
            {/* Top Right Circle */}
            <motion.div
              className="absolute -right-8 -top-8 w-24 h-24 bg-blue-400/30 rounded-full"
              variants={{
                initial: { x: 0, y: 0 },
                hover: { x: -40, y: 40, transition: { duration: 0.8 } },
              }}
            />
            {/* Bottom Left Circle */}
            <motion.div
              className="absolute -left-8 -bottom-8 w-20 h-20 bg-blue-400/30 rounded-full"
              variants={{
                initial: { x: 0, y: 0 },
                hover: { x: 40, y: -40, transition: { duration: 0.8 } },
              }}
            />
            {/* Bottom Right Circle */}
            <motion.div
              className="absolute -right-8 -bottom-8 w-16 h-16 bg-yellow-400/30 rounded-full"
              variants={{
                initial: { x: 0, y: 0 },
                hover: { x: -40, y: -40, transition: { duration: 0.8 } },
              }}
            />
            {/* Center Circle */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-blue-400/10 rounded-full"
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.5, transition: { duration: 0.8 } },
              }}
            />
          </motion.div>

          {/* Cloud Decorations */}
          <motion.div
            animate={{ y: [-5, 5] }}
            whileHover={{ scale: 1.1 }}
            transition={{
              y: { duration: 2, repeat: Infinity, repeatType: 'reverse' },
              scale: { duration: 0.2 },
            }}
            className="absolute top-0 left-0 w-24 md:w-32 h-24 md:h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
          />
          <motion.div
            animate={{ y: [-8, 8] }}
            whileHover={{ scale: 1.1 }}
            transition={{
              y: { duration: 2.5, repeat: Infinity, repeatType: 'reverse' },
              scale: { duration: 0.2 },
            }}
            className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-white rounded-full translate-x-1/2 -translate-y-1/2"
          />
          <motion.div
            animate={{ y: [-6, 6] }}
            whileHover={{ scale: 1.1 }}
            transition={{
              y: { duration: 3, repeat: Infinity, repeatType: 'reverse' },
              scale: { duration: 0.2 },
            }}
            className="absolute bottom-0 left-1/4 w-20 md:w-24 h-20 md:h-24 bg-white rounded-full translate-y-1/2"
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black mb-2 md:mb-4">
              VAULTed
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-black/80 font-light">
              DeFi yields, designed
              <br className="hidden sm:block" />
              for everyone
            </h2>
            <div className="text-xs text-black/50 mt-2">
              built during ICP Hackathon, Bangkok 2024
            </div>
          </motion.div>

          {/* Decorative Hands */}
          <motion.div
            animate={{ rotate: [-5, 5] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="hidden md:block absolute top-4 right-8"
          >
            <svg
              className="w-16 md:w-24 h-16 md:h-24 text-gray-300"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.5 21C5.1 21 4 19.9 4 18.5V7.5C4 6.1 5.1 5 6.5 5C7.9 5 9 6.1 9 7.5V18.5C9 19.9 7.9 21 6.5 21Z"
              />
            </svg>
          </motion.div>
          <motion.div
            animate={{ rotate: [5, -5] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="hidden md:block absolute bottom-4 left-8"
          >
            <svg
              className="w-16 md:w-24 h-16 md:h-24 text-gray-300"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.5 21C5.1 21 4 19.9 4 18.5V7.5C4 6.1 5.1 5 6.5 5C7.9 5 9 6.1 9 7.5V18.5C9 19.9 7.9 21 6.5 21Z"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Section Header */}
      <div className="text-center mt-16 mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wider">
          THE EASY WAY
          <br />
          TO EARN
          <br />
          CRYPTO YIELD
        </h2>
        <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
          DeFi offers some of the best yields available on the planet, but
          they're often hidden behind complex UIs designed for whales. VAULTed
          is here to fix that.
        </p>
        <div className="flex justify-center">
          <a
            href="/vaults"
            className="px-6 py-2 mt-8 bg-yellow-400 rounded-full text-black font-medium hover:bg-yellow-300 transition-colors"
          >
            Explore Vaults
          </a>
        </div>
      </div>

      <VaultsGrid />

      {/* Footer */}
      <footer className="w-full bg-blue-500/10 backdrop-blur-sm mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-white" />
              <span className="text-white text-sm">VAULTed</span>
            </div>
            <div className="text-white/70 text-sm">
              © {currentYear} VAULTed. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <button className="text-white/70 hover:text-white text-sm transition-colors">
                Terms
              </button>
              <button className="text-white/70 hover:text-white text-sm transition-colors">
                Privacy
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
