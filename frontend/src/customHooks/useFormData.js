import { useState } from "react";

const useFormData = (initialData) => {
  const [formData, setFormData] = useState(initialData);

  const handleFormData = (e) => {
    const { name, value, id } = e.target;

    setFormData({
      ...formData,
      [name]: value === undefined || value === "" ? id : value,
    });
  };

  return [formData, handleFormData];
};

export default useFormData;
