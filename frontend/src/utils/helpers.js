export const isValidDate = (date) => {
  return !isNaN(Date.parse(date));
};

export const formatDate = (dateString) => {
  if (!isValidDate(dateString)) {
    return "Invalid Date";
  }
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export const handleResponse = (response) => {
  if (response.code) {
    let errorMessage = "Unknown error occurred";

    if (response.response && response.response.status) {
      switch (response.response.status) {
        case 400:
          errorMessage = "Invalid request. Please check your input.";
          break;
        case 401:
          errorMessage = "Unauthorized. Please log in to continue.";
          break;
        case 403:
          errorMessage = "Forbidden. You do not have permission to access.";
          break;
        case 404:
          errorMessage = "Resource not found. Please try again later.";
          break;
        case 500:
          errorMessage = "Internal server error. Please try again later.";
          break;
        default:
          errorMessage = `Error ${response.response.status}. Please try again later.`;
          break;
      }
    } else {
      errorMessage =
        "Error: Response status not available. Please try again later.";
    }

    return { errorMessage };
  } else {
    return response.data;
  }
};
