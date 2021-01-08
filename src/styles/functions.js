const functions = {
  cols: (cols, base = 24) => {
    return (100 / base) * cols + '%';
  },
};

module.exports = functions;
