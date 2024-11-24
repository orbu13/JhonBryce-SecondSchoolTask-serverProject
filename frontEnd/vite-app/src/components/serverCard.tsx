import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

interface Server {
  _id: string;
  name: string;
  ip: string;
  company: {name:string};
  status: string;
  createdAt: string;
}

interface ServerCardProps {
  server: Server;
  toggleStatus: (id: string, currentStatus: string) => void;
}

const ServerCard: React.FC<ServerCardProps> = ({ server, toggleStatus }) => {
  const handleToggle = () => {
    toggleStatus(server._id, server.status);
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{server.name}</Typography>
        <Typography>IP: {server.ip}</Typography>
        <Typography>Company: {server.company.name}</Typography>
        <Typography>Status: {server.status}</Typography>
        <Typography>Created At: {new Date(server.createdAt).toLocaleString()}</Typography>
        <Button
          variant="contained"
          color={server.status === 'active' ? 'error' : 'primary'}
          onClick={handleToggle}
        >
          {server.status === 'active' ? 'Deactivate' : 'Activate'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServerCard;