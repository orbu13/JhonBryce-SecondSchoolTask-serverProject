import React, { useEffect, useState } from 'react';
import { Container, TextField, Checkbox, Button, Typography } from '@mui/material';
import ServerCard from './serverCard';

interface Server {
  _id: string;
  name: string;
  ip: string;
  company: {name:string};
  status: string;
  createdAt: string;
}

const ServerList: React.FC = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [filteredServers, setFilteredServers] = useState<Server[]>([]);
  const [onlyActive, setOnlyActive] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/servers')
      .then((res) => {
        console.log(res)
        if (!res.ok) {
          throw new Error('Failed to fetch servers');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setServers(data);
        setFilteredServers(data);
      })
      .catch((error) => console.error('Error fetching servers:', error));
  }, []);

  const toggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    fetch(`http://localhost:3000/api/server/status/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update server status');
        }
        return res.json();
      })
      .then(() => {
        const updatedServers = servers.map((server) =>
          server._id === id ? { ...server, status: newStatus } : server
        );
        setServers(updatedServers);
        applyFilters(updatedServers);
      })
      .catch((error) => console.error('Error updating server status:', error));
  };

  const applyFilters = (serversToFilter: Server[] = servers) => {
    let filtered = serversToFilter;
    if (onlyActive) {
      filtered = filtered.filter((server) => server.status === 'active');
    }
    setFilteredServers(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [onlyActive]);

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Server Management
      </Typography>
      <div>
        <Checkbox
          checked={onlyActive}
          onChange={(e) => setOnlyActive(e.target.checked)}
        />
        <label>Show only active servers</label>
        <Button
          variant="outlined"
          onClick={() =>
            setFilteredServers([...filteredServers].sort((a, b) => {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }))
          }
        >
          Sort by Latest Created
        </Button>
      </div>
      {filteredServers.map((server) => (
        <ServerCard key={server._id} server={server} toggleStatus={toggleStatus} />
      ))}
    </Container>
  );
};

export default ServerList;