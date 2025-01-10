import React, { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { calculateAge } from "../../utils/index.js";
import DeleteModal from "../Modal";
import { RxCrossCircled } from "react-icons/rx";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Avatar from "../../assets/images/avatar.png";
import { AccordionItemProps } from "../../types";
import { Input, Textarea } from "../Inputs";
import Select from "../Select";
import { useResponsiveRows } from "../../hooks/useResponsiveRows.js"

const AccordionItem: React.FC<AccordionItemProps> = ({
  user,
  isOpen,
  onToggle,
  onDelete,
  onUpdate,
  isAnyItemEditing = false,
  onEditingChange,
  forceExitEdit = false
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [fullName, setFullName] = useState(`${user.first} ${user.last}`);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const rows = useResponsiveRows();

  const userAge = calculateAge(user.dob);
  const isEditable = userAge >= 18;

  useEffect(() => {
    setEditedUser(user);
    setFullName(`${user.first} ${user.last}`);
  }, [user]);

   useEffect(() => {
    if (forceExitEdit && isEditing) {
      handleCancel();
    }
  }, [forceExitEdit]);

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!editedUser.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!editedUser.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!editedUser.country?.trim()) {
      newErrors.country = "Country is required";
    }

    if (!editedUser.description?.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    setErrors({});
    onEditingChange?.(true);
  };

  const handleSave = () => {
    if (!validateFields()) {
      return;
    }

    const [first, ...lastParts] = fullName.trim().split(" ");
    const last = lastParts.join(" ");

    if (!first || !last) {
      setErrors(prev => ({
        ...prev,
        fullName: "Please provide both first and last name"
      }));
      return;
    }

    const updatedUser = {
      ...editedUser,
      first,
      last,
    };

    onUpdate?.(updatedUser);
    setIsEditing(false);
    setErrors({});
    onEditingChange?.(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setFullName(`${user.first} ${user.last}`);
    setIsEditing(false);
    setErrors({});
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
      if (errors.fullName) {
        setErrors(prev => ({ ...prev, fullName: "" }));
      }
    } else {
      setEditedUser(prev => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
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
          <div className="basis-[75%] mx-2 sm:mx-4 min-w-0">
            {isEditing ? (
              <div className="flex flex-col">
                <Input
                  name="fullName"
                  id="fullName"
                  value={fullName}
                  onChange={handleChange}
                  className={`w-full sm:w-fit px-2 py-1 border rounded-lg text-sm sm:text-base ${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                  placeholder="Full Name"
                />
                {errors.fullName && (
                  <span className="text-red-500 text-xs mt-1">{errors.fullName}</span>
                )}
              </div>
            ) : (
              <h4 className="font-semibold capitalize text-base sm:text-base truncate">
                {user.first} {user.last}
              </h4>
            )}
          </div>
          <button
            onClick={handleToggle}
            className={`p-1 sm:p-2 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            } ${
              isEditing || isAnyItemEditing
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
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
            isOpen ? "h-auto p-3 sm:p-6" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0 mb-4 md:mb-5">
            <li className="md:basis-1/3">
              <div className="flex flex-col">
                <span className="capitalize text-[#6e6e71] text-base mb-1">age</span>
                {isEditing ? (
                  <div>
                    <Input
                      type="date"
                      name="dob"
                      id="dob"
                      value={editedUser.dob}
                      onChange={handleChange}
                      className={`w-full md:w-fit px-2 py-1 border rounded-lg text-sm sm:text-base ${
                        errors.dob ? "border-red-500" : ""
                      }`}
                    />
                    {errors.dob && (
                      <span className="text-red-500 text-xs mt-1">{errors.dob}</span>
                    )}
                  </div>
                ) : (
                  <span className="text-sm md:text-base">{`${userAge} Years`}</span>
                )}
              </div>
            </li>
            <li className="md:basis-1/3">
              <div className="flex flex-col">
                <span className="capitalize text-[#6e6e71] text-base mb-1">gender</span>
                {isEditing ? (
                  <div>
                    <Select
                      className={`w-full md:w-fit text-sm md:text-base ${
                        errors.gender ? "border-red-500" : ""
                      }`}
                      id="gender"
                      name="gender"
                      options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'transgender', label: 'Transgender' },
                        { value: 'rather_not_say', label: 'Rather not say' },
                        { value: 'other', label: 'Other' },
                      ]}
                      placeholder="Choose an option"
                      value={editedUser.gender}
                      onChange={handleChange}
                    />
                    {errors.gender && (
                      <span className="text-red-500 text-xs mt-1">{errors.gender}</span>
                    )}
                  </div>
                ) : (
                  <span className="capitalize text-sm md:text-base">{user.gender}</span>
                )}
              </div>
            </li>
            <li className="md:basis-1/3">
              <div className="flex flex-col">
                <span className="capitalize text-[#6e6e71] text-base mb-1">country</span>
                {isEditing ? (
                  <div>
                    <Input
                      className={`w-full md:w-fit px-2 py-1 border rounded-lg text-sm sm:text-base ${
                        errors.country ? "border-red-500" : ""
                      }`}
                      name="country"
                      id="country"
                      value={editedUser.country}
                      onChange={handleChange}
                    />
                    {errors.country && (
                      <span className="text-red-500 text-xs mt-1">{errors.country}</span>
                    )}
                  </div>
                ) : (
                  <span className="capitalize text-sm md:text-base">{user.country}</span>
                )}
              </div>
            </li>
          </ul>

          <div>
            <span className="text-[#6e6e71] capitalize text-sm">description</span>
            {isEditing ? (
              <div>
                <Textarea
                  rows={rows}
                  className={`w-full px-2 py-1 border rounded-lg text-sm sm:text-base ${
                    errors.description ? "border-red-500" : ""
                  }`}
                  placeholder="Enter description"
                  name="description"
                  value={editedUser.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <span className="text-red-500 text-xs mt-1">{errors.description}</span>
                )}
              </div>
            ) : (
              <p className="mt-2 text-sm sm:text-base">{user.description}</p>
            )}
          </div>

          <div className="flex justify-end items-center mt-4 sm:mt-5 space-x-3">
            {isEditing ? (
              <>
                <button onClick={handleCancel}>
                  <RxCrossCircled color={"#ff3703"} size={20} className="sm:w-6 sm:h-6" />
                </button>
                <button onClick={handleSave}>
                  <IoCheckmarkCircleOutline color={"#37b000"} size={22} className="sm:w-6 sm:h-6" />
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