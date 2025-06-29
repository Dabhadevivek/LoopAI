import React from 'react';
import { Box, VStack, Text, Icon, Link as ChakraLink } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiList, FiCreditCard, FiBarChart2, FiUser, FiMessageCircle, FiSettings } from 'react-icons/fi';

const navItems = [
  { label: 'Dashboard', icon: FiHome, path: '/dashboard' },
  { label: 'Transactions', icon: FiList, path: '/dashboard' },
  { label: 'Wallet', icon: FiCreditCard, path: '#' },
  { label: 'Analytics', icon: FiBarChart2, path: '#' },
  { label: 'Personal', icon: FiUser, path: '#' },
  { label: 'Message', icon: FiMessageCircle, path: '#' },
  { label: 'Setting', icon: FiSettings, path: '#' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <Box w="260px" bg="#1e1e2f" minH="100vh" p={6} boxShadow="lg" fontFamily="'Inter', 'Poppins', sans-serif">
      <Text fontSize="2xl" fontWeight="bold" color="#4fff4b" mb={10} letterSpacing="wide">
        <span style={{ color: '#41E883' }}>L</span>oopAI
      </Text>
      <VStack align="stretch" spacing={2}>
        {navItems.map(item => {
          const isDashboard = item.label === 'Dashboard' && location.pathname === '/dashboard';
          const isTransactions = item.label === 'Transactions' && location.pathname === '/transactions';
          const isActive = isDashboard || isTransactions;
          return (
            <ChakraLink
              as={Link}
              to={item.path}
              key={item.label}
              display="flex"
              alignItems="center"
              px={4}
              py={2}
              borderRadius="md"
              position="relative"
              bg={isActive ? '#23233a' : 'transparent'}
              color={isActive ? '#4fff4b' : '#fff'}
              _hover={{ bg: '#23233a', color: '#4fff4b' }}
              fontWeight={isActive ? 'bold' : 'medium'}
              style={{ fontFamily: 'Inter, Poppins, sans-serif' }}
            >
              {isActive && (
                <Box position="absolute" left={0} top={2} bottom={2} w="4px" borderRadius="2px" bg="#4fff4b" />
              )}
              <Icon as={item.icon} mr={3} />
              {item.label}
            </ChakraLink>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Sidebar; 