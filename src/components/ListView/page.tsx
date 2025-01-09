import { useCallback, useEffect, useState } from "react";
import DummyData from '../../assets/dummyData/celebrities.json';
import Input from "../Inputs";
import AccordionItem from "../Accordion";
import { User } from "../../types";

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
      setOpenAccordionId(prev => prev === id ? null : id);
    }
  };

  const handleEditingChange = (isEditing: boolean) => setIsAnyItemEditing(isEditing);

  const handleDelete = (userId: number) => {
    // Handle the deletion of the user
    console.log('Deleting user:', userId);
  };

  const getUserData = useCallback(() => {
    setUsers(DummyData);
    setFilteredUsers(DummyData);
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    // Filter users based on search input
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
          className="my-10"
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
              <li className="w-full rounded-xl p-4 color-border" key={user?.id}>
                <AccordionItem
                  user={user}
                  isOpen={openAccordionId === user.id}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
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