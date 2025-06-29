import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, HStack, Avatar, Skeleton, Spacer } from '@chakra-ui/react';
import { getTransactions } from '../services/api';

const RecentTransactions: React.FC = () => {
  const [txs, setTxs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransactions({ page: 1, limit: 3, sort: 'date', order: 'desc' })
      .then(res => setTxs(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box bg="gray.800" p={6} borderRadius="lg" boxShadow="md">
      <Text fontWeight="bold" mb={4} color="#b0b0b0">Recent Transactions</Text>
      <VStack align="stretch" spacing={3}>
        {loading ? (
          [1,2,3].map(i => <Skeleton key={i} height="64px" />)
        ) : txs.length === 0 ? (
          <Text color="gray.400">No transactions</Text>
        ) : txs.map((tx, i) => (
          <Box key={tx._id || tx.id} bg="#23233a" borderRadius="xl" boxShadow="md" px={4} py={3} display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" flex="1">
              <Avatar size="sm" src={tx.user_profile} name={tx.user_id} mr={3} />
              <Box>
                <Text fontSize="sm" color="#b0b0b0">
                  Transfer to {tx.user_id}
                </Text>
                <Text fontWeight="bold" fontSize="md" color={tx.category === 'Revenue' ? 'green.400' : 'red.400'} mt={1}>
                  {tx.category === 'Revenue' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                </Text>
              </Box>
            </Box>
            <Text fontSize="xs" color="gray.400" minW="70px" textAlign="right">{new Date(tx.date).toLocaleDateString()}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default RecentTransactions; 