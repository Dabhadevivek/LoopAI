import React, { useState, useEffect } from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton,
  Checkbox, CheckboxGroup, Stack, useDisclosure, Input, Select, useToast
} from '@chakra-ui/react';
import { exportCSV } from '../services/api';

const allColumns = [
  { label: 'Date', value: 'date' },
  { label: 'Amount', value: 'amount' },
  { label: 'Status', value: 'status' },
  { label: 'Category', value: 'category' },
  { label: 'User', value: 'userId' },
];
const categories = ['All', 'Revenue', 'Expense'];
const statuses = ['All', 'Completed', 'Pending'];

const ExportModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [columns, setColumns] = useState(['date', 'amount', 'userId']);
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [tableFilters, setTableFilters] = useState<any>({});

  useEffect(() => {
    const handler = (e: any) => setTableFilters(e.detail);
    window.addEventListener('transactionsFilterChange', handler);
    return () => window.removeEventListener('transactionsFilterChange', handler);
  }, []);

  const handleExport = async () => {
    setLoading(true);
    try {
      const filters: any = { ...tableFilters };
      if (category !== 'All') filters.category = category;
      if (status !== 'All') filters.status = status;
      if (from) filters.from = from;
      if (to) filters.to = to;
      const blob = await exportCSV(filters, columns);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions_export.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast({ title: 'Exported!', status: 'success' });
      onClose();
    } catch (err) {
      toast({ title: 'Export failed', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button colorScheme="green" position="fixed" bottom={8} right={8} onClick={onOpen} zIndex={10}>
        Export CSV
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export Transactions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CheckboxGroup value={columns} onChange={v => setColumns(v as string[])}>
              <Stack spacing={2} direction="column">
                {allColumns.map(col => (
                  <Checkbox key={col.value} value={col.value}>{col.label}</Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
            <Stack direction="row" spacing={2} mt={4}>
              <Input type="date" value={from} onChange={e => setFrom(e.target.value)} placeholder="From" />
              <Input type="date" value={to} onChange={e => setTo(e.target.value)} placeholder="To" />
            </Stack>
            <Stack direction="row" spacing={2} mt={2}>
              <Select value={category} onChange={e => setCategory(e.target.value)}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </Select>
              <Select value={status} onChange={e => setStatus(e.target.value)}>
                {statuses.map(s => <option key={s}>{s}</option>)}
              </Select>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>Cancel</Button>
            <Button colorScheme="green" onClick={handleExport} isLoading={loading}>Export</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExportModal; 