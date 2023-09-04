const generateCode = () => {
  const min = 1000;
  const max = 9999;
  const randomCode: number = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomCode;
};

export default generateCode;
