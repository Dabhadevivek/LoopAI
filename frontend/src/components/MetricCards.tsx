import React, { useEffect, useState } from 'react';
import { SimpleGrid, Box, Text, Skeleton, HStack } from '@chakra-ui/react';
import { getSummary } from '../services/api';

const cardData = [
  { label: 'Balance', color: '#4fff4b', icon: '💰' },
  { label: 'Revenue', color: '#4fff4b', icon: '📈' },
  { label: 'Expenses', color: '#ff4b4b', icon: '💸' },
  { label: 'Savings', color: '#ffe44b', icon: '💾' },
];

const MetricCards: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSummary().then(setSummary).finally(() => setLoading(false));
  }, []);

  const values = summary ? [summary.balance, summary.revenue, summary.expenses, summary.savings] : [0,0,0,0];

  return (
    <SimpleGrid columns={4} spacing={6}>
      {cardData.map((card, i) => (
        <Box key={card.label} bg="#23233a" p={6} borderRadius="2xl" boxShadow="lg" fontFamily="'Inter', 'Poppins', sans-serif">
          <HStack align="center" mb={2}>
            <Text fontSize="2xl" mr={2}>{card.icon}</Text>
            <Text fontSize="md" color="#b0b0b0">{card.label}</Text>
          </HStack>
          <Skeleton isLoaded={!loading} height="32px">
            <Text fontSize="2xl" fontWeight="bold" color={card.color} mt={2}>
              ${values[i].toLocaleString()}
            </Text>
          </Skeleton>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default MetricCards; 