export const normalize = (dAttribute) => {
  if (!dAttribute) return null;
  return dAttribute.replace(/undefined|NaN|Infinity/g, "0");
};

export const processColor = (color, opacity) => {
  return `${color}${Math.min(255, Math.max(16, opacity))
    .toString(16)
    .padStart(2, "0")}`;
};

