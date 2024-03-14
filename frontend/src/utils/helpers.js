export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export const handleResponse = (response) => {
  if (response.code) {
    let errorMessage = "Unknown error occurred";
    switch (response.response.status) {
      case 400:
        errorMessage = "Bad request";
        break;
      case 401:
        errorMessage = "Unauthorized";
        break;
      case 403:
        errorMessage = "Forbidden";
        break;
      case 404:
        errorMessage = "Not found";
        break;
      case 500:
        errorMessage = "Internal server error";
        break;
      default:
        errorMessage = `Error ${response.status}`;
        break;
    }

    return { errorMessage };
  } else {
    return response.data;
  }
};
