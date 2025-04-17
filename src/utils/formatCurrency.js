// src/utils/formatCurrency.js
export const formatCurrency = (value) => {
    return `₦${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };
  