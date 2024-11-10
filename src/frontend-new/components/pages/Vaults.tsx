import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, ArrowRight, Coins } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '../ui/card';

const VaultsGrid = () => {
  const vaults = [
    {
      id: 1,
      title: 'Meme Coin Vault',
      description: 'High-yield meme coin farming vault',
      coins: ['PEPE', 'DOGE', 'BONK', 'FLOKI'],
      monthlyAPR: 12.5,
      yearlyAPR: 156.8,
      totalValueLocked: '$2.4M',
    },
    {
      id: 2,
      title: 'Blue Chip DeFi',
      description: 'Stable yields from proven protocols',
      coins: ['UNI', 'AAVE', 'COMP'],
      monthlyAPR: 8.2,
      yearlyAPR: 82.5,
      totalValueLocked: '$5.1M',
    },
    {
      id: 3,
      title: 'Stablecoin Maximizer',
      description: 'Optimize stablecoin lending yields',
      coins: ['USDC', 'USDT', 'DAI'],
      monthlyAPR: 6.8,
      yearlyAPR: 72.4,
      totalValueLocked: '$8.7M',
    },
    {
      id: 4,
      title: 'Layer 2 Yield',
      description: 'Farming on L2 networks',
      coins: ['OP', 'ARB', 'MATIC', 'IMX'],
      monthlyAPR: 15.3,
      yearlyAPR: 184.2,
      totalValueLocked: '$1.8M',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="bg-blue-400 min-h-screen py-16 px-4">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your Vault
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Each vault is carefully designed to maximize yields while managing
            risk. Select the strategy that matches your goals.
          </p>
        </motion.div>
      </div>

      {/* Vaults Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        {vaults.map((vault) => (
          <motion.div
            key={vault.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <Card className="bg-white/90 backdrop-blur-sm h-full hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl font-bold">{vault.title}</span>
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </CardTitle>
                <p className="text-sm text-gray-600">{vault.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Coins */}
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    Supported Assets
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {vault.coins.map((coin) => (
                      <div
                        key={coin}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium flex items-center"
                      >
                        <Coins className="w-4 h-4 mr-1" />
                        {coin}
                      </div>
                    ))}
                  </div>
                </div>

                {/* APR Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-500">
                      Monthly APR
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-lg font-bold text-green-500">
                        {vault.monthlyAPR}%
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-500">
                      Yearly APR
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-lg font-bold text-green-500">
                        {vault.yearlyAPR}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* TVL */}
                <div className="text-sm text-gray-500">
                  Total Value Locked:{' '}
                  <span className="font-medium">{vault.totalValueLocked}</span>
                </div>
              </CardContent>

              <CardFooter>
                <button className="w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-300 rounded-full text-black font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                  <span>Invest Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default VaultsGrid;
