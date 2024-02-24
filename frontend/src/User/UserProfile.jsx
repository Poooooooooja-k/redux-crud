import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { AxiosInstance } from "../components/AxiosInstance";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [imagePath,setImagePath]=useState("");
  const [file,setFile]=useState({});


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await AxiosInstance.get("userList/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwttoken")}`,
          },
          withCredentials: true,
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile(); // Call the fetchUserProfile function
  }, []); // Add token as dependency to useEffect

    const imageSubmit=async()=>{
        const formData = new FormData();
    formData.append('file',file);
    try {
        const response=await AxiosInstance.post('imagesubmit',formData,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwttoken")}`,
              },
        })
        console.log(response.data);
    } catch (error) {
        
    }

    // formData.append("username", user.userName);

        
    }

  return (
    <div>
      <Navbar />
      <div className="col-md-9">
        {/* <div className="d-flex justify-content-center">
          <img
            src=""
            className="img-thumbnail"
            style={{ width: "100px", height: "100px" }}
            alt="..."
          />
        </div> */}

        {/* <div className="d-flex align-item-center justify-content-center p-3 ">
        <div class="mb-3">  
          <input class="form-control" type="file" id="formFile" onChange={(e)=>setFile(e.target.files[0])} />
          <button type="button" className="btn btn-primary my-2" onClick={imageSubmit()}>
            upload image
          </button>
        </div>
        </div> */}

        <div className="card-body p-4">
          <h6 style={{ textAlign: "center" }}>
            <strong>User Information</strong>
          </h6>

          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <strong>First Name</strong>
                  </td>
                  <td className="text-muted">{user.first_name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Last Name</strong>
                  </td>
                  <td className="text-muted">{user.last_name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email</strong>
                  </td>
                  <td className="text-muted">{user.email}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Phone</strong>
                  </td>
                  <td className="text-muted">{user.phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
