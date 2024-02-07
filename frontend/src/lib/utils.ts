import { MutableRefObject } from "react";

//Validation:
export const validateData = (
  fieldsToValidate: string[],
  form: {
    email?: string;
    first_name?: string;
    phone?: string;
    last_name?: string;
  },
  errorsClearTimeoutRef: MutableRefObject<NodeJS.Timeout | null>,
  setFormErrors: ({}: {
    email?: string[];
    phone?: string[];
    first_name?: string[];
    last_name?: string[];
    profession?: string[];
  }) => void
) => {
  let errors: Record<string, string[]> = {
    email: [],
    phone: [],
    first_name: [],
    last_name: [],
    profession: [],
  };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (fieldsToValidate.includes("email") && form.email) {
    const parts = form.email.split("@");
    const domainParts = parts[1]?.split(".");
    if (
      !form.email.includes("@") ||
      parts.length !== 2 ||
      domainParts.length < 2 ||
      domainParts.some((part: string) => part === "") ||
      !emailRegex.test(form.email)
    ) {
      errors.email.push("Please provide a valid email");
    }
  }

  if (fieldsToValidate.includes("phone") && form.phone) {
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (!phoneRegex.test(form.phone)) {
      errors.phone.push("Please provide a valid phone number");
    }
  }

  if (fieldsToValidate.includes("first_name") && form.first_name) {
    if (form.first_name.length < 2) {
      errors.first_name.push(
        "Please provide a first name of more than 2 characters"
      );
    }
  }

  if (fieldsToValidate.includes("last_name") && form.last_name) {
    if (form.last_name.length < 2) {
      errors.last_name.push(
        "Please provide a last name of more than 2 characters"
      );
    }
  }

  //If errors found
  if (Object.keys(errors).find((key: string) => errors[key].length > 0)) {
    // Clear previous timeout
    if (errorsClearTimeoutRef && errorsClearTimeoutRef.current) {
      clearTimeout(errorsClearTimeoutRef.current);
    }
    setFormErrors(errors);
    errorsClearTimeoutRef.current = setTimeout(() => {
      setFormErrors({
        email: [],
        phone: [],
        first_name: [],
        last_name: [],
        profession: [],
      });
    }, 5000);
    return false;
  }
  return true;
};
