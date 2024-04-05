import React, { useState, useEffect } from 'react';

function Content() {
 const [searchQuery, setSearchQuery] = useState('');
 const [users, setUsers] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState(null);

 const fetchData = async () => {
    setIsLoading(true);
    try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();
        setUsers(data.results);
    } catch (error) {
        setError(error.message);
    } finally {
        setIsLoading(false);
    }
 };

 useEffect(() => {
    fetchData();
 }, []);

 const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
 };

 const filteredUsers = users.filter((user) =>
    user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.last.toLowerCase().includes(searchQuery.toLowerCase())
 );

 const handleAddClick = async () => {
    setIsLoading(true);
    try {
        const response = await fetch('https://randomuser.me/api/?results=1');
        const newData = await response.json();
        // Append the new user to the existing list
        setUsers([...users, ...newData.results]);
    } catch (error) {
        setError(error.message);
    } finally {
        setIsLoading(false);
    }
 };

 if (isLoading) {
    return <h2>Loading...</h2>;
 }

 if (error) {
    return <div className="error">Error: {error}</div>;
 }

 return (
    <div className="wrapper">
      <div className="container">
        <input
          type="text"
          name="search-box"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search by name..."
        />
        <button onClick={handleAddClick}>Add</button>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
 );
}

export default Content;
