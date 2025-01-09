import { useCallback, useEffect, useState } from "react";
import DummyData from '../../assets/dummyData/celebrities.json';
import Input from "../Inputs";
import Accordion from "../Accordion";

const ListView = () => {
  const [formData, setFromData] = useState({
    search: "",
  });
  const [users, setUsers] = useState([]);

  const getUserData = useCallback(() => setUsers(DummyData), [])

  useEffect(() => {
    getUserData();
  },[]);
  
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromData({
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
          placeholder="Search users"
          name="search"
          id="search"
        />

        {/* List of Users */}
        <ul className="list_of_users">
            {
                users && users.length > 0 && (
                    <>
                        {
                            users.map((user) => (
                                <li className="w-full rounded-xl p-4 color-border" key={user?.id}>
                                    <Accordion user={user} />
                                </li>
                            ))
                        }
                    </>   
                )
            }
        </ul>
      </div>
    </section>
  );
};

export default ListView;
