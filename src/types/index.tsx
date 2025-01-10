export interface User {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}

export interface AccordionItemProps {
  user: User;
  isOpen: boolean;
  onToggle: (id: number) => void;
  onDelete?: (id: number) => void;
  onUpdate?: (user: User) => void;
  onEditingChange: (isEditing: boolean) => void;
  isAnyItemEditing?: boolean;
  forceExitEdit?: boolean; 
}

export interface BaseFieldProps {
  label?: string;
  error?: string;
  className?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
}