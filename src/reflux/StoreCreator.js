import FluxModel from './Model'

export default function createStore(options) {
  var Store = FluxModel.extend(options);

  return new Store();
}
