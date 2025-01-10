import React, { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { calculateAge } from "../../utils/getBirthDate";
import DeleteModal from "../Modal";
import { RxCrossCircled } from "react-icons/rx";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Avatar from "../../assets/images/avatar.png";
import { AccordionItemProps } from "../../types";
import { Input, Textarea } from "../Inputs";
import Select from "../Select";

const AccordionItem: React.FC<AccordionItemProps> = ({
  user,
  isOpen,
  onToggle,
  onDelete,
  onUpdate,
  isAnyItemEditing = false,
  onEditingChange,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [fullName, setFullName] = useState(`${user.first} ${user.last}`);

  const userAge = calculateAge(user.dob);
  const isEditable = userAge >= 18;

  useEffect(() => {
    setEditedUser(user);
    setFullName(`${user.first} ${user.last}`);
  }, [user]);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete?.(user.id);
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    if (!isEditable) {
      return;
    }
    setIsEditing(true);
    setEditedUser(user);
    setFullName(`${user.first} ${user.last}`);
    onEditingChange?.(true);
  };

  const handleSave = () => {
    const [first, ...lastParts] = fullName.trim().split(" ");
    const last = lastParts.join(" ");

    const updatedUser = {
      ...editedUser,
      first: first || "",
      last: last || "",
    };

    onUpdate?.(updatedUser);
    setIsEditing(false);
    onEditingChange?.(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setFullName(`${user.first} ${user.last}`);
    setIsEditing(false);
    onEditingChange?.(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "fullName") {
      setFullName(value);
    } else {
      setEditedUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleToggle = () => {
    if (!isEditing && !isAnyItemEditing) {
      onToggle(user.id);
    }
  };

  return (
    <>
      <div className="w-full color-border rounded-lg overflow-hidden">
        <div className="flex justify-between items-center py-3 px-6 bg-white">
          <figure className="w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden color-border">
            <img
              src={user.picture ? user.picture : Avatar}
              alt={user.first}
              className="w-full h-full rounded-full object-cover"
            />
          </figure>
          {isEditing ? (
            <div className="flex-grow mx-2 sm:mx-4 min-w-0">
              <Input
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={handleChange}
                className="w-full sm:w-fit px-2 py-1 border rounded-lg text-sm sm:text-base"
                placeholder="Full Name"
              />
            </div>
          ) : (
            <h4 className="basis-[75%] font-semibold capitalize text-base sm:text-base truncate">
              {user.first} {user.last}
            </h4>
          )}
          <button
            onClick={handleToggle}
            className={`p-1 sm:p-2 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            } ${
              isEditing || isAnyItemEditing
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            aria-expanded={isOpen}
            aria-controls={`description-${user.id}`}
            disabled={isEditing || isAnyItemEditing}
          >
            <BsChevronDown className="w-3 h-3 sm:w-4 sm:h-4" color="#87878a" />
          </button>
        </div>

        <div
          id={`description-${user.id}`}
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "h-auto p-2 sm:p-4" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-5">
            <li className="sm:basis-1/3">
              <div className="flex flex-col">
                <span className="capitalize text-[#6e6e71] text-sm">age</span>
                {isEditing ? (
                  <Input
                    type="date"
                    name="dob"
                    id="dob"
                    value={editedUser.dob}
                    onChange={handleChange}
                    className="w-full sm:w-fit px-2 py-1 border rounded-lg text-sm sm:text-base"
                  />
                ) : (
                  <span className="text-sm sm:text-base">{`${userAge} Years`}</span>
                )}
              </div>
            </li>
            <li className="sm:basis-1/3">
              <div className="flex flex-col">
                <span className="capitalize text-[#6e6e71] text-sm">gender</span>
                {isEditing ? (
                  <Select
                    className="w-full sm:w-fit text-sm sm:text-base"
                    id="gender"
                    name="gender"
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' },
                    ]}
                    placeholder="Choose an option"
                    value={editedUser.gender}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="capitalize text-sm sm:text-base">{user.gender}</span>
                )}
              </div>
            </li>
            <li className="sm:basis-1/3">
              <div className="flex flex-col">
                <span className="capitalize text-[#6e6e71] text-sm">country</span>
                {isEditing ? (
                  <Input
                    className="w-full sm:w-fit px-2 py-1 border rounded-lg text-sm sm:text-base"
                    name="country"
                    id="country"
                    value={editedUser.country}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="capitalize text-sm sm:text-base">{user.country}</span>
                )}
              </div>
            </li>
          </ul>

          <div>
            <span className="text-[#6e6e71] capitalize text-sm">description</span>
            {isEditing ? (
              <Textarea
                className="w-full mt-2 px-2 py-1 border rounded-lg text-sm sm:text-base"
                placeholder="Enter description"
                value={editedUser.description}
                onChange={handleChange}
              />
            ) : (
              <p className="mt-2 text-sm sm:text-base">{user.description}</p>
            )}
          </div>

          <div className="flex justify-end items-center mt-4 sm:mt-5 space-x-3 sm:space-x-5">
            {isEditing ? (
              <>
                <button onClick={handleCancel}>
                  <RxCrossCircled color={"#ff2d00"} size={20} className="sm:w-6 sm:h-6" />
                </button>
                <button onClick={handleSave}>
                  <IoCheckmarkCircleOutline color={"#00a854"} size={20} className="sm:w-6 sm:h-6" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleDelete}
                  disabled={isAnyItemEditing}
                >
                  <RiDeleteBin6Line
                    color={isAnyItemEditing ? "#ffb3b3" : "#ff2d00"}
                    size={20}
                    className="sm:w-6 sm:h-6"
                  />
                </button>
                <button 
                  onClick={handleEdit} 
                  disabled={isAnyItemEditing || !isEditable}
                  title={!isEditable ? "User must be 18 or older to edit" : ""}
                >
                  <FiEdit2
                    color={isAnyItemEditing || !isEditable ? "#b3d9ff" : "#0075ff"}
                    size={20}
                    className="sm:w-6 sm:h-6"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default AccordionItem;