export const truncateText = (str: string | undefined) => {
    // If the string is undefined or shorter than 25 characters, return it as is
    if (!str || str.length < 25) return str;

    // If the string is longer than 50 characters, truncate it and append ellipsis
    return str.substring(0, 50) + "...";
};