import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../components/AxiosInstance";

const AdminHome = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [deleteUser, setDeleteUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAdModalOpen] = useState(false);
  const [error, setError] = useState(null);

  

   
    const fetchUsers = async () => {
      try {
        const response = await AxiosInstance.get("cadmin/adminuserlist/");
        console.log("data....................", response.data);
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching users", error);
      }
    };

   useEffect(()=>{
    fetchUsers()
   },[])
  

        const handleEdit = (e, user) => {
            setSelectedUser(user);
        };

        const handleeditSubmit = async (e) => {
            e.preventDefault();
            setIsModalOpen(true);
            try {
            const response = await AxiosInstance.post(
                `/cadmin/adminuserupdate/${selectedUser.id}/`,
                {
                first_name: selectedUser.first_name,
                last_name: selectedUser.last_name,
                email: selectedUser.email,
                phone: selectedUser.phone,
                },
                {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                }
            );

            const payload = {
                id: selectedUser.id,
                first_name: selectedUser.first_name,
                last_name: selectedUser.last_name,
                email: selectedUser.email,
                phone: selectedUser.phone,
            };

            console.log("success");
            setIsModalOpen(false);
            } catch (error) {
            console.error("Error occurred:", error);
            }
        };

        const handleDeleteUser = (e, user) => {
            console.log(user);
            console.log(user.id);
            setDeleteUser(user);
        };

        const handledeleteSubmit = async (e) => {
            e.preventDefault();
            setIsModalOpen(true);
            try {
            const response = await AxiosInstance.post(
                `/cadmin/adminuserdelete/${deleteUser.id}/`,
                {
                headers: {
                    Accept: "application/json",
                },
                }
            );
            console.log(response);
            console.log("success");
            setIsModalOpen(false);
            fetchUsers()
            const userListResponse = await AxiosInstance.get(
                "cadmin/adminuserlist/",
                {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                }
            );
            console.log(userListResponse);
            } catch (error) {
            console.error("Error occurred:", error);
            }
        };

        const  handleAddSubmit=async(e)=>{
            e.preventDefault()
            setError(null);
            setIsAdModalOpen(true);
            try {
                const response = await AxiosInstance.post('register/', {
                first_name: firstname,
                last_name: lastname,
                email,
                phone,
                password,
                },{
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                console.log(response.data);
                fetchUsers()
                setIsAdModalOpen(false);
                console.log("success");
            } catch (error) {
                console.error("Error occurred:", error);
                setError(error); 
            }      
        }

  return (
    <>
      <h2 className="text-align-center">User List</h2>
      <div
        style={{
          textAlign: "end",
          marginRight: "2%",
          marginBottom: "1%",
        }}
      >
        <button
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#addUserModal" 
        >
          Add User
        </button>
      </div>

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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#editCouponModal"
                  onClick={(e) => handleEdit(e, user)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteProductModal"
                  onClick={(e) => handleDeleteUser(e, user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add User Modal */}
            <div className={`modal fade ${isAddModalOpen ? "show" : ""}`} id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="addUserModalLabel">Add User</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form onSubmit={(e) => handleAddSubmit(e)}>
                    {/* First Name */}
                    <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                    </div>
                    {/* Last Name */}
                    <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                    </div>
                    {/* Phone */}
                    <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    </div>
                    {/* Email */}
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </div>
                    {/* Password */}
                    <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
                    {/* Error */}
                        {error && <div className="error">{error.message}</div>}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
            </div>
            </div>
            </div>


      {/* Edit Coupon Modals */}
      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        id="editCouponModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editCouponModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editCouponModalLabel">
                Edit User
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => handleeditSubmit(e)}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      name="first_name"
                      type="text"
                      className="form-control"
                      required
                      value={selectedUser ? selectedUser.first_name : ""}
                      onChange={(e) =>
                        setSelectedUser((prevState) => ({
                          ...prevState,
                          first_name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      name="last_name"
                      type="text"
                      className="form-control"
                      required
                      value={selectedUser ? selectedUser.last_name : ""}
                      onChange={(e) =>
                        setSelectedUser((prevState) => ({
                          ...prevState,
                          last_name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      required
                      value={selectedUser ? selectedUser.email : ""}
                      onChange={(e) =>
                        setSelectedUser((prevState) => ({
                          ...prevState,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      name="phone"
                      type="phone"
                      className="form-control"
                      required
                      value={selectedUser ? selectedUser.phone : ""}
                      onChange={(e) =>
                        setSelectedUser((prevState) => ({
                          ...prevState,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    className="btn btn-default"
                    data-bs-dismiss="modal"
                    value="Close"
                  />
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="update"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Delete user Modals */}
      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        id="deleteProductModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteProductModal"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={(e) => handledeleteSubmit(e)}>
              <div className="modal-header">
                <h5 className="modal-title" id="deleteProductModal">
                  Delete User
                </h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete{" "}
                <span style={{ color: "red" }}></span>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-dark">
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(AdminHome);
