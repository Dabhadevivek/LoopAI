import React, { useEffect, useState } from 'react';
import { Box, Skeleton } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getTrends } from '../services/api';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const OverviewChart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    const handler = (e: any) => setFilters(e.detail);
    window.addEventListener('transactionsFilterChange', handler);
    return () => window.removeEventListener('transactionsFilterChange', handler);
  }, []);

  useEffect(() => {
    setLoading(true);
    getTrends(filters).then(trends => {
      // Merge income and expenses by month
      const merged: any = [];
      for (let i = 0; i < 12; i++) {
        const income = trends.income.find((d: any) => d._id.month === i+1)?.total || 0;
        const expenses = trends.expenses.find((d: any) => d._id.month === i+1)?.total || 0;
        merged.push({ month: months[i], income, expenses });
      }
      setData(merged);
    }).finally(() => setLoading(false));
  }, [filters]);

  return (
    <Box bg="#23233a" p={6} borderRadius="2xl" h="320px" fontFamily="'Inter', 'Poppins', sans-serif">
      <Skeleton isLoaded={!loading} height="100%">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <XAxis dataKey="month" stroke="#b0b0b0" fontSize={13} tickLine={false} axisLine={{ stroke: '#333' }} />
            <YAxis stroke="#b0b0b0" fontSize={13} tickLine={false} axisLine={{ stroke: '#333' }} tickFormatter={v => `$${v/1000}k`} />
            <Tooltip contentStyle={{ background: '#23233a', border: 'none', borderRadius: 8, color: '#fff', fontFamily: 'Inter, Poppins, sans-serif' }} labelStyle={{ color: '#b0b0b0' }} />
            <Legend iconType="circle" wrapperStyle={{ color: '#b0b0b0', fontFamily: 'Inter, Poppins, sans-serif', fontSize: 14 }} />
            <Line type="monotone" dataKey="income" stroke="#4fff4b" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="expenses" stroke="#ffe44b" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Skeleton>
    </Box>
  );
};

export default OverviewChart; 