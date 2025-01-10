export function calculateAge(birthDate: string): number {
    const today = new Date();
    const dob = new Date(birthDate);

    if (isNaN(dob.getTime())) {
        return 0
    }

    if (dob > today) {
        return 0
    }
    
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    // Adjust age if birthday hasn't occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    
    return age;
}

export const getDateLimits = () => {
  const today = new Date();
  
  // Calculate date for 18 years ago
  const maxDate = new Date(today);
  maxDate.setFullYear(today.getFullYear() - 18);
  
  // Format dates to YYYY-MM-DD
  return {
    max: maxDate.toISOString().split('T')[0],
  };
};

export const generateId = () => `field-${Math.random().toString(36).substr(2, 9)}`;