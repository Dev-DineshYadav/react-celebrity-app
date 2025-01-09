import { FaChevronDown } from 'react-icons/fa';
import { AccordionItemProps } from '../../types';

const AccordionItem: React.FC<AccordionItemProps> = ({ user, isOpen, onToggle }) => {
  return (
    <div className="w-full border rounded-lg overflow-hidden mb-2">
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
          className={`p-2 transition-transform duration-300 ${isOpen ? 'rotate-180 basis-[3%]' : ''}`}
          aria-expanded={isOpen}
          aria-controls={`description-${user.id}`}
        >
          <FaChevronDown className="w-4 h-4" />
        </button>
      </div>
      
      <div
        id={`description-${user.id}`}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-48' : 'max-h-0'
        }`}
      >
        <div className="p-4 bg-gray-50">
          {user.description}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;