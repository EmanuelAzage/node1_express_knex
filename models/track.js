const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('track', {
  id: {
    field: 'TrackId',
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    field: 'Name',
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Name is required'
      },
      notEmpty: {
        args: true,
        msg: 'Name is required, it can not be empty'
      }
    }
  },
  unitPrice: {
    field: 'UnitPrice',
    type: Sequelize.DOUBLE,
    validate:{
      isNumeric: {
        args: true,
        msg: 'Unit Price must be numeric'
      }
    }
  },
  milliseconds: {
    field: 'Milliseconds',
    type: Sequelize.INTEGER,
    validate:{
      isNumeric: {
        args: true,
        msg: 'Milliseconds must be numeric'
      }
    }
  }
}, {
  timestamps: false
});
