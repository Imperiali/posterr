const defaultOptions = { year: "numeric", month: "long", day: "numeric" };

export const formatDatetime = (stringDate, options = defaultOptions) => {
  return new Date(stringDate).toLocaleDateString("en-US", options);
};
