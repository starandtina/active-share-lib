import { createAction, createActions } from './reflux/ActionCreator'
import createStore from './reflux/StoreCreator'
import FluxModel from './reflux/Model'

var Reflux = {};

Reflux.createAction = createAction;

Reflux.createActions = createActions;

Reflux.createStore = createStore;

Reflux.Model = FluxModel;

export default Reflux;
