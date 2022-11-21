const express = require('express');
const Handlebars = require('handlebars');

module.exports = {

  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },

  format_time: (date) => {
    return date.toLocaleTimeString();
  },

  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },

  isUser: (profileUserId, reqUserId) => {
    if (reqUserId !== profileUserId) {
      return;
    } else {
      const gotoNext = (req, res, next) => {
        next();
      };
      gotoNext();
    }
  },

  ifEquals: (arg1, arg2, options) => {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  },

};

