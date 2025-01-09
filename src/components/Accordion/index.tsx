import { FaChevronDown } from "react-icons/fa";
import { AccordionItemProps } from "../../types";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { calculateAge } from "../../utils/getBirthDate";

const AccordionItem: React.FC<AccordionItemProps> = ({
  user,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <div className="flex items-center p-4 bg-white">
        <figure className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={user.picture}
            alt={user.first}
            className="w-full h-full rounded-full object-cover"
          />
        </figure>
        <h4 className="flex-grow mx-4 font-bold capitalize">
          {user.first} {user.last}
        </h4>
        <button
          onClick={() => onToggle(user.id)}
          className={`p-2 transition-transform duration-300 ${
            isOpen ? "rotate-180 basis-[3%]" : ""
          }`}
          aria-expanded={isOpen}
          aria-controls={`description-${user.id}`}
        >
          <FaChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div
        id={`description-${user.id}`}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "h-[100%] p-4" : "max-h-0"
        }`}
      >
        <ul className="flex items-center mb-5">
          <li className="basis-1/3">
            <div className="flex flex-col">
              <span className="capitalize text-[#6e6e71]">age</span>
              <span>{calculateAge(user.dob)}</span>
            </div>
          </li>
          <li className="basis-1/3">
            <div className="flex flex-col">
              <span className="capitalize text-[#6e6e71]">gender</span>
              <span className="capitalize">{user.gender}</span>
            </div>
          </li>
          <li className="basis-1/3">
            <div className="flex flex-col">
              <span className="capitalize text-[#6e6e71]">country</span>
              <span className="capitalize">{user.country}</span>
            </div>
          </li>
        </ul>

        <div>
          <span className="text-[#6e6e71] capitalize">description</span>
          <p className="mt-2">{user.description}</p>
        </div>

        <div className="flex justify-end items-center mt-5">
          <button className="mr-5"><RiDeleteBin6Line color={'#ff2d00'} size={25} /></button>
          <button><FiEdit2 color={'#0075ff'} size={25}/></button>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
