import React, { useEffect, useState } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Select, Input, Button, HStack, Badge, Skeleton, IconButton, Avatar, Text, Spacer
} from '@chakra-ui/react';
import { getTransactions } from '../services/api';
import { Transaction } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const categories = ['All', 'Revenue', 'Expense'];
const statuses = ['All', 'Paid', 'Pending'];

const sortOptions = [
  { label: '🟢 Default (by ID)', value: 'id-asc' },
  { label: '⬆️ Oldest First (by Date ASC)', value: 'date-asc' },
  { label: '⬇️ Newest First (by Date DESC)', value: 'date-desc' },
];

const TransactionsTable: React.FC = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('id-asc');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const limit = 10;

  const fetchData = () => {
    setLoading(true);
    const filters = {
      page,
      limit,
      search,
      category: category !== 'All' ? category : undefined,
      status: status !== 'All' ? status : undefined,
      sort,
      order,
      from: from || undefined,
      to: to || undefined,
    };
    console.log('Table filters:', filters);
    getTransactions(filters).then(res => {
      setData(res.data);
      setTotal(res.total);
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    let sortField = 'id';
    let sortOrder = 'asc';
    if (sort === 'date-asc') {
      sortField = 'date';
      sortOrder = 'asc';
    } else if (sort === 'date-desc') {
      sortField = 'date';
      sortOrder = 'desc';
    }
    const filters = {
      page,
      limit,
      search,
      category: category !== 'All' ? category : undefined,
      status: status !== 'All' ? status : undefined,
      sort: sortField,
      order: sortOrder,
      from: from || undefined,
      to: to || undefined,
    };
    console.log('Table filters:', filters);
    getTransactions(filters).then(res => {
      setData(res.data);
      setTotal(res.total);
    }).finally(() => setLoading(false));
  }, [page, search, category, status, sort, order, from, to]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('transactionsFilterChange', {
        detail: {
          page, limit, search, category, status, sort, order, from, to
        }
      }));
    }
  }, [page, limit, search, category, status, sort, order, from, to]);

  const handleSort = (col: string) => {
    if (sort === col) setOrder(order === 'asc' ? 'desc' : 'asc');
    else { setSort(col); setOrder('asc'); }
  };

  const getStatusLabel = (status: string) => {
    if (status.toLowerCase() === 'completed' || status.toLowerCase() === 'paid') return 'PAID';
    return 'PENDING';
  };

  return (
    <Box bg="#1a1a3c" p={6} borderRadius="16px" boxShadow="0 4px 12px rgba(0,0,0,0.3)" position="relative" minH="500px">
      {/* Section Title */}
      <Text fontSize="xl" fontWeight="bold" color="white" letterSpacing="wide" mb={4}>All Transactions</Text>
      {/* Filter Bar */}
      <HStack mb={4} align="flex-end" spacing={4} bg="#1a1a3c">
        {/* Filter fields */}
        <Box>
          <Text fontSize="xs" color="#b0b0b0" mb={1}>Search</Text>
          <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} maxW="160px" bg="#23233a" color="#b0b0b0" borderColor="#23233a" />
        </Box>
        <Box>
          <Text fontSize="xs" color="#b0b0b0" mb={1}>Category</Text>
          <Select value={category} onChange={e => setCategory(e.target.value)} maxW="120px" bg="#23233a" color="#b0b0b0" borderColor="#23233a">
            {categories.map(c => <option key={c}>{c}</option>)}
          </Select>
        </Box>
        <Box>
          <Text fontSize="xs" color="#b0b0b0" mb={1}>Status</Text>
          <Select value={status} onChange={e => setStatus(e.target.value)} maxW="120px" bg="#23233a" color="#b0b0b0" borderColor="#23233a">
            {statuses.map(s => <option key={s}>{s}</option>)}
          </Select>
        </Box>
        <Box>
          <Text fontSize="xs" color="#b0b0b0" mb={1}>Start Date</Text>
          <Input type="date" value={from} onChange={e => setFrom(e.target.value)} maxW="140px" bg="#23233a" color="#b0b0b0" borderColor="#23233a" />
        </Box>
        <Box>
          <Text fontSize="xs" color="#b0b0b0" mb={1}>End Date</Text>
          <Input type="date" value={to} onChange={e => setTo(e.target.value)} maxW="140px" bg="#23233a" color="#b0b0b0" borderColor="#23233a" />
        </Box>
        <Box>
          <Text fontSize="xs" color="#b0b0b0" mb={1}>Sort by</Text>
          <Select
            value={sort}
            onChange={e => {
              setSort(e.target.value);
              if (e.target.value === 'id-asc') setOrder('asc');
              else if (e.target.value === 'date-asc') setOrder('asc');
              else if (e.target.value === 'date-desc') setOrder('desc');
            }}
            maxW="160px" bg="#23233a" color="#b0b0b0" borderColor="#23233a"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </Box>
        <Spacer />
        <Button onClick={() => { setPage(1); fetchData(); }} colorScheme="green" px={6} h="40px">Filter</Button>
      </HStack>
      {/* Table */}
      <Box overflowX="auto">
        <Table variant="simple" colorScheme="gray" bg="#1a1a3c">
          <Thead>
            <Tr>
              <Th color="#b0b0b0" borderColor="#23233a">User</Th>
              <Th color="#b0b0b0" borderColor="#23233a" cursor="pointer" onClick={() => handleSort('date')}>
                Date {order === 'desc' && sort === 'date' ? '▼' : order === 'asc' && sort === 'date' ? '▲' : ''}
              </Th>
              <Th color="#b0b0b0" borderColor="#23233a" cursor="pointer" onClick={() => handleSort('amount')}>Amount</Th>
              <Th color="#b0b0b0" borderColor="#23233a">Category</Th>
              <Th color="#b0b0b0" borderColor="#23233a">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              Array.from({ length: limit }).map((_, i) => (
                <Tr key={i}>
                  <Td colSpan={5}><Skeleton height="24px" /></Td>
                </Tr>
              ))
            ) : data.length === 0 ? (
              <Tr><Td colSpan={5} textAlign="center">No transactions found</Td></Tr>
            ) : data.map(tx => (
              <Tr key={tx._id || tx.id}>
                <Td>
                  <HStack>
                    <Avatar size="sm" src={tx.user_profile} name={tx.user_id} />
                    <Text fontWeight="medium" fontSize="sm" ml={2} color="#b0b0b0">{tx.user_id}</Text>
                  </HStack>
                </Td>
                <Td color="#b0b0b0">{new Date(tx.date).toLocaleDateString()}</Td>
                <Td color={tx.category === 'Revenue' ? '#4fff4b' : '#ff4b4b'} fontWeight="bold">
                  {tx.category === 'Revenue' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                </Td>
                <Td color="#b0b0b0">{tx.category}</Td>
                <Td>
                  <Badge borderRadius="full" px={3} py={1} fontSize="0.8em" colorScheme={getStatusLabel(tx.status) === 'PAID' ? 'green' : 'yellow'}>{getStatusLabel(tx.status)}</Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {/* Pagination controls at bottom-right */}
      <HStack mt={4} justify="flex-end">
        <IconButton aria-label="Prev" icon={<ChevronLeftIcon />} onClick={() => setPage(p => Math.max(1, p - 1))} isDisabled={page === 1} />
        <Text color="#b0b0b0">Page {page} of {Math.ceil(total / limit) || 1}</Text>
        <IconButton aria-label="Next" icon={<ChevronRightIcon />} onClick={() => setPage(p => p + 1)} isDisabled={page * limit >= total} />
      </HStack>
    </Box>
  );
};

export default TransactionsTable; 