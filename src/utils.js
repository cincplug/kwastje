export const normalize = (dAttribute) => {
  if (!dAttribute) return null;
  return dAttribute.replace(/undefined|NaN|Infinity/g, "0");
};

export const processColor = (color, opacity) => {
  return `${color}${Math.min(255, Math.max(16, opacity))
    .toString(16)
    .padStart(2, "0")}`;
};

export const download = () => {
  const link = document.createElement("a");
  link.download = "download.svg";
  const svg = document.querySelector(".drawing");
  const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
  const e = new MouseEvent("click");
  link.href = "data:image/svg+xml;base64," + base64doc;
  link.dispatchEvent(e);
};

