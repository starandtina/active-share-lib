define([
  'exports',
  'module',
  'active/fnd/arch/localize',
  'active/fnd/arch/render',
  'active/fnd/arch/getComponent',
  'active/endurance/enduranceApplicationModel'
], function (exports, module, localize, render, getComponent, enduranceApplicationModel) {
  'use strict';

  module.exports = {
    localize: localize,
    render: render,
    getComponent: getComponent,
    app: enduranceApplicationModel
  };
});
