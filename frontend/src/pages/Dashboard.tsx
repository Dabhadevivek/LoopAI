import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import MetricCards from '../components/MetricCards';
import OverviewChart from '../components/OverviewChart';
import RecentTransactions from '../components/RecentTransactions';
import TransactionsTable from '../components/TransactionsTable';
import ExportModal from '../components/ExportModal';

const Dashboard: React.FC = () => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" p={8}>
        <Text fontSize="2xl" fontWeight="bold" color="#b0b0b0" mb={2}>Transaction Overview</Text>
        <MetricCards />
        <Flex mt={8} gap={8} align="stretch">
          <Box flex="2" display="flex" flexDirection="column">
            <Text fontSize="lg" fontWeight="semibold" color="#b0b0b0" mb={2}>Overview (Monthly)</Text>
            <OverviewChart />
          </Box>
          <Box flex="1" display="flex" flexDirection="column" justifyContent="flex-start">
            <RecentTransactions />
          </Box>
        </Flex>
        <Box mt={8}>
          <TransactionsTable />
        </Box>
        <ExportModal />
      </Box>
    </Flex>
  );
};

export default Dashboard; 