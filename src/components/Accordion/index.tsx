import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
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
      <div className="w-full border rounded-lg overflow-hidden">
        <div className="flex items-center p-4 bg-white">
          <figure className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={user.picture ? user.picture : Avatar}
              alt={user.first}
              className="w-full h-full rounded-full object-cover"
            />
          </figure>
          {isEditing ? (
            <div className="flex-grow mx-4">
              <Input
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={handleChange}
                className="w-fit px-2 py-1 border rounded-lg"
                placeholder="Full Name"
              />
            </div>
          ) : (
            <h4 className="flex-grow mx-4 font-bold capitalize">
              {user.first} {user.last}
            </h4>
          )}
          <button
            onClick={handleToggle}
            className={`p-2 transition-transform duration-300 ${
              isOpen ? "rotate-180 basis-[3%]" : ""
            } ${
              isEditing || isAnyItemEditing
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            aria-expanded={isOpen}
            aria-controls={`description-${user.id}`}
            disabled={isEditing || isAnyItemEditing}
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
                {isEditing ? (
                  <Input
                    type="date"
                    name="dob"
                    id="dob"
                    value={editedUser.dob}
                    onChange={handleChange}
                    className="w-fit px-2 py-1 border rounded-lg"
                  />
                ) : (
                  <span>{`${userAge} Years`}</span>
                )}
              </div>
            </li>
            <li className="basis-1/3">
              <div className="flex flex-col">
                <span className="capitalize text-[#6e6e71]">gender</span>
                {isEditing ? (
                  <Select
                    className="w-fit"
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
                  <span className="capitalize">{user.gender}</span>
                )}
              </div>
            </li>
            <li className="basis-1/3">
              <div className="flex flex-col">
                <span className="capitalize text-[#6e6e71]">country</span>
                {isEditing ? (
                  <Input
                    className="w-fit px-2 py-1 border rounded-lg"
                    name="country"
                    id="country"
                    value={editedUser.country}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="capitalize">{user.country}</span>
                )}
              </div>
            </li>
          </ul>

          <div>
            <span className="text-[#6e6e71] capitalize">description</span>
            {isEditing ? (
              <Textarea
                className="w-full mt-2 px-2 py-1 border rounded-lg"
                placeholder="Enter description"
                value={editedUser.description}
                onChange={handleChange}
              />
            ) : (
              <p className="mt-2">{user.description}</p>
            )}
          </div>

          <div className="flex justify-end items-center mt-5">
            {isEditing ? (
              <>
                <button className="mr-5" onClick={handleCancel}>
                  <RxCrossCircled color={"#ff2d00"} size={25} />
                </button>
                <button onClick={handleSave}>
                  <IoCheckmarkCircleOutline color={"#00a854"} size={25} />
                </button>
              </>
            ) : (
              <>
                <button
                  className="mr-5"
                  onClick={handleDelete}
                  disabled={isAnyItemEditing}
                >
                  <RiDeleteBin6Line
                    color={isAnyItemEditing ? "#ffb3b3" : "#ff2d00"}
                    size={25}
                  />
                </button>
                <button 
                  onClick={handleEdit} 
                  disabled={isAnyItemEditing || !isEditable}
                  title={!isEditable ? "User must be 18 or older to edit" : ""}
                >
                  <FiEdit2
                    color={isAnyItemEditing || !isEditable ? "#b3d9ff" : "#0075ff"}
                    size={25}
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