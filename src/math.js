const calculateTip = (total, tipPercent = 0.2) => {
  const tip = total * tipPercent;
  return total + tip;
};

module.exports = { calculateTip };
