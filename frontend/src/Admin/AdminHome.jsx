import React, { useEffect, useState } from 'react';
import { AxiosInstance } from '../components/AxiosInstance';

const AdminHome = () => {
    const [users,setUsers] = useState([]);
    const [selectedUser,setSelectedUser]=useState(null)
    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await AxiosInstance.get('cadmin/adminuserlist/');
                console.log("data....................",response.data)
                setUsers(response.data);
            } catch (error) {
                console.log("Error while fetching users", error);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit=(e,user)=>{
       
        

    }

    return (
        <div>
            <h2>User List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Email Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-primary mr-2" onClick={() => handleEdit(user.id)}>Edit</button>
                                {/* <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminHome;
