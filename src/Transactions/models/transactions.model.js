module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transaction", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    transactionNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    transactionAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    accountNumber: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  });

  return Transaction;
};
