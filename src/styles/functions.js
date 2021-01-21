const functions = {
  cols: (cols, base = 8) => {
    return (100 / base) * cols + '%';
  },
};

module.exports = functions;
