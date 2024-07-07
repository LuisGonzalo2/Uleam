import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Select, MenuItem, TextField, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Edit as EditIcon, Save as SaveIcon } from '@material-ui/icons';
import axios from 'axios';

const AdminPanel = () => {
    const [filter, setFilter] = useState('registered');
    const [users, setUsers] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        fetchUsers();
    }, [filter]);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        let filteredUsers = [];
        switch (filter) {
            case 'registered':
                filteredUsers = Object.values(response.data);
                break;
            case 'approved':
                filteredUsers = Object.values(response.data).filter(user => user.status === 'approved');
                break;
            case 'withResidence':
                filteredUsers = Object.values(response.data).filter(user => user.dormitory !== null);
                break;
            default:
                filteredUsers = Object.values(response.data);
        }
        setUsers(filteredUsers);
    };

    const handleEditClick = (cedula) => {
        setEditMode(cedula);
        const user = users.find(user => user.cedula === cedula);
        setEditedData(user);
    };

    const handleSaveClick = async (cedula) => {
        try {
            await axios.put(`http://localhost:5000/users/${cedula}`, editedData);
            setEditMode(null);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({ ...prevData, [name]: value }));
    };

    const renderTable = () => {
        switch (filter) {
            case 'registered':
                return (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>CI</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Correo Electrónico</TableCell>
                                <TableCell>Contraseña</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.cedula}>
                                    <TableCell>{user.cedula}</TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="name" value={editedData.name} onChange={handleChange} />
                                        ) : (
                                            user.name
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="email" value={editedData.email} onChange={handleChange} />
                                        ) : (
                                            user.email
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="password" value={editedData.password} onChange={handleChange} />
                                        ) : (
                                            user.password
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <IconButton onClick={() => handleSaveClick(user.cedula)}>
                                                <SaveIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton onClick={() => handleEditClick(user.cedula)}>
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                );
            case 'approved':
                return (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>CI</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Correo Electrónico</TableCell>
                                <TableCell>Dirección</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Género</TableCell>
                                <TableCell>Fecha de Nacimiento</TableCell>
                                <TableCell>Discapacidad</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.cedula}>
                                    <TableCell>{user.cedula}</TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="name" value={editedData.name} onChange={handleChange} />
                                        ) : (
                                            user.name
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="email" value={editedData.email} onChange={handleChange} />
                                        ) : (
                                            user.email
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="address" value={editedData.address} onChange={handleChange} />
                                        ) : (
                                            user.address
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="phone" value={editedData.phone} onChange={handleChange} />
                                        ) : (
                                            user.phone
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="gender" value={editedData.gender} onChange={handleChange} />
                                        ) : (
                                            user.gender
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="birthday" value={editedData.birthday} onChange={handleChange} />
                                        ) : (
                                            user.birthday
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="disability" value={editedData.disability} onChange={handleChange} />
                                        ) : (
                                            user.disability
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <IconButton onClick={() => handleSaveClick(user.cedula)}>
                                                <SaveIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton onClick={() => handleEditClick(user.cedula)}>
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                );
            case 'withResidence':
                return (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>CI</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Correo Electrónico</TableCell>
                                <TableCell>Dirección</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Género</TableCell>
                                <TableCell>Fecha de Nacimiento</TableCell>
                                <TableCell>Discapacidad</TableCell>
                                <TableCell>Dormitorio</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.cedula}>
                                    <TableCell>{user.cedula}</TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="name" value={editedData.name} onChange={handleChange} />
                                        ) : (
                                            user.name
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="email" value={editedData.email} onChange={handleChange} />
                                        ) : (
                                            user.email
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="address" value={editedData.address} onChange={handleChange} />
                                        ) : (
                                            user.address
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="phone" value={editedData.phone} onChange={handleChange} />
                                        ) : (
                                            user.phone
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="gender" value={editedData.gender} onChange={handleChange} />
                                        ) : (
                                            user.gender
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="birthday" value={editedData.birthday} onChange={handleChange} />
                                        ) : (
                                            user.birthday
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="disability" value={editedData.disability} onChange={handleChange} />
                                        ) : (
                                            user.disability
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <TextField name="dormitory" value={editedData.dormitory} onChange={handleChange} />
                                        ) : (
                                            user.dormitory
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode === user.cedula ? (
                                            <IconButton onClick={() => handleSaveClick(user.cedula)}>
                                                <SaveIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton onClick={() => handleEditClick(user.cedula)}>
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                );
            default:
                return null;
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Panel de Administración
            </Typography>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <MenuItem value="registered">Usuarios Registrados</MenuItem>
                <MenuItem value="approved">Usuarios Aprobados</MenuItem>
                <MenuItem value="withResidence">Usuarios con Residencia</MenuItem>
            </Select>
            <Paper>
                {renderTable()}
            </Paper>
        </Container>
    );
};

export default AdminPanel;
