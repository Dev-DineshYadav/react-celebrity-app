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
}
