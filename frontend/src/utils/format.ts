export const addComma = (amount: number): string =>
  amount.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const generateRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateColors = (length: number): string[] => {
  const colors = [];
  for (let i = 0; i < length; i++) {
    colors.push(generateRandomColor());
  }
  return colors;
};
