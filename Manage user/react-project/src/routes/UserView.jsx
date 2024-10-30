import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../css/UserView.css';
import userRes from '../API/UserRequest';

function UserView() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addedName, setAddedName] = useState('');
  const [addedAge, setAddedAge] = useState('');
  const UserRes = new userRes();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = useState(5);

  useEffect(() => {
  const fetchUsers = () => {
    UserRes.get('list')
      .then(response => {
        setUsers(response.data);
        setTotalPages(Math.ceil(response.data.length / 5));
        console.log(totalPages,'24');
      })
      .catch(error => {
        console.error(error);
      });
  };
    fetchUsers();
  }, []);

  const displayedData = useMemo(() => {
    const start = (currentPage - 1) * 5;
    const end = start + 5;
    //console.log([currentPage, itemsPerPage, users]);
    return users.slice(start, end);
  }, [currentPage, 5, users]);
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log("a");
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log("a");
    }
  };

const total = useMemo(()=>{
  UserRes.get('list')
      .then(response => {
        setUsers(response.data);
        setTotalPages(Math.ceil(response.data.length / 5));
        console.log(totalPages,'59');
      })
      var arr=[];
      for(let i=1;i<=totalPages;i++) arr.push(i);
  return arr;
},[users]);

  const submitAdd = () => {
    UserRes.post('add', { name: addedName, age: addedAge },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => {
        console.log('Thêm người dùng thành công:', response.data);
      })
      .catch(error => {
        console.error('Lỗi khi thêm người dùng:', error);
      });

    setShowAddForm(false);
  };

  const editUser = user => {
    setEditingUser(user._id);
    setAddedName(user.name);
    setAddedAge(user.age);
    setIsEditing(true);
  };

  const submitEdit = () => {
    UserRes.post(
      'edit',
      {
        newname: addedName,
        newage: addedAge,
        userId: editingUser,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => {
        setUsers(response.data);
        cancelEdit();
      })
      .catch(error => {
        console.error('Lỗi khi thêm người dùng:', error);
      });

    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setAddedName('');
    setAddedAge('');
    setIsEditing(false);
  };

  const deleteUser = userId => {
    UserRes
      .delete(`delete?user_id=${userId}`)
      .then(() => {
        fetchUsers();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="user">
      <button type="button" onClick={() => setShowAddForm(true)}>
        Add
      </button> 
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button type="button" onClick={() => editUser(user)}>
                  Edit
                </button>
                <button type="button" onClick={() => deleteUser(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div>
          <h3>Edit User</h3>
          <form onSubmit={submitEdit}>
            <div>
              <input type="hidden" name="userId" value={editingUser} />
            </div>
            <div>
              <label htmlFor="newname">New name:</label> <br />
              <input
                id="newname"
                value={addedName}
                onChange={e => setAddedName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="newage">Age:</label> <br />
              <input
                id="newage"
                value={addedAge}
                onChange={e => setAddedAge(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Submit</button>
              <button type="button" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {showAddForm && (
        <div>
          <h3>Add User</h3>
          <form onSubmit={submitAdd}>
            <div>
              <label htmlFor="name">Name:</label> <br />
              <input
                id="name"
                value={addedName}
                onChange={e => setAddedName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="age">Age:</label> <br />
              <input
                id="age"
                value={addedAge}
                onChange={e => setAddedAge(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="bottom-section">
        <div className="pagination-container">
          <button className="pagination-button" onClick={() => prevPage()} disabled={currentPage === 1}>Previous</button>
          {total.map(number => (<span key={number} className={number == currentPage ? 'pagination-current-page':''}>{number}</span>))}
          <button className="pagination-button" onClick={() => nextPage()} disabled={currentPage === totalPages} id="next">Next</button>
        </div>
      </div>
    </div>
  );
}

export default UserView;
