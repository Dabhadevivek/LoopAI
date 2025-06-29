import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, Alert } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(email, password);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={32} p={8} bg="gray.800" borderRadius="lg" boxShadow="lg">
      <Heading mb={6} textAlign="center">Register</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          {error && <Alert status="error">{error}</Alert>}
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </FormControl>
          <Button colorScheme="green" type="submit" isLoading={loading} w="full">Register</Button>
          <Box fontSize="sm">Already have an account? <Link to="/login" style={{ color: '#41E883' }}>Login</Link></Box>
        </VStack>
      </form>
    </Box>
  );
};

export default Register; 