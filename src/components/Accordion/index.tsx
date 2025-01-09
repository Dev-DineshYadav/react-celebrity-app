import { FaChevronDown } from "react-icons/fa";

const Accordion = ({user}) => {
  return (
    <div className="flex items-center">
      <figure className="basis-[12%] rounded-full color-border">
        <img
          src={user.picture}
          alt={user.first}
          className="w-full h-full rounded-full object-cover"
        />
      </figure>
      <h4 className="basis-[80%] mx-[5%] font-bold capitalize">{user.first} {user.last}</h4>
      <button className="basis-[3%]">
        <FaChevronDown />
      </button>
    </div>
  );
};

export default Accordion;
