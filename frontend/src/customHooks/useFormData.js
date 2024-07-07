import { useState } from "react";

const useFormData = (initialData) => {
  const [formData, setFormData] = useState(initialData);

  const handleFormData = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return [formData, handleFormData];
};

export default useFormData;
