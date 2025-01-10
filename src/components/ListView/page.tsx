import { useCallback, useEffect, useState } from "react";
import DummyData from '../../assets/dummyData/celebrities.json';
import {Input} from "../Inputs";
import AccordionItem from "../Accordion";
import { User } from "../../types";

const STORAGE_KEY = 'userListData';

const ListView = () => {
  const [formData, setFormData] = useState({
    search: "",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [openAccordionId, setOpenAccordionId] = useState<string | number | null>(null);
  const [isAnyItemEditing, setIsAnyItemEditing] = useState(false);

  const handleToggle = (id: string | number) => {
    if (!isAnyItemEditing) {
      setOpenAccordionId(prevId => prevId === id ? null : id);
    }
  };

  const handleEditingChange = (isEditing: boolean) => setIsAnyItemEditing(isEditing);

  const handleDelete = (userId: number) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
    if (openAccordionId === userId) {
      setOpenAccordionId(null);
    }
  };

  const handleUpdate = (updatedUser: User) => {
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
  };

  const getUserData = useCallback(() => {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      setUsers(parsedUsers);
      setFilteredUsers(parsedUsers);
    } else {
      setUsers(DummyData);
      setFilteredUsers(DummyData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DummyData));
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const searchTerm = formData.search.toLowerCase();
      const firstName = user.first?.toLowerCase() || '';
      const lastName = user.last?.toLowerCase() || '';
      
      return firstName.includes(searchTerm) || lastName.includes(searchTerm);
    });
    
    setFilteredUsers(filtered);
  }, [formData.search, users]);
  
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <section className="list_view py-5">
      <div className="wrapper">
        {/* Heading */}
        <h3 className="text-4xl font-bold capitalize">list view</h3>

        {/* Search Input */}
        <Input
          className="w-full my-10"
          value={formData.search}
          onChange={handleOnChange}
          placeholder="Search by first or last name"
          name="search"
          id="search"
        />

        {/* List of Users */}
        <ul className="list_of_users">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li key={user?.id}>
                <AccordionItem
                  user={user}
                  isOpen={openAccordionId === user.id}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                  onEditingChange={handleEditingChange}
                  isAnyItemEditing={isAnyItemEditing}
                />
              </li>
            ))
          ) : (
            <li className="text-center py-4">No users found</li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default ListView;