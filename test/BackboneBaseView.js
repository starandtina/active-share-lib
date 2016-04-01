import test from 'tape'
import BackboneBaseView from '../src/backbone.baseview'

test('BackboneBaseView#getTemplate', function (t) {
  t.plan(2);

  var tpl = '<h1>template</h1>';
  let BaseView = BackboneBaseView.extend({
    template: function () {
      return tpl;
    }
  });

  let baseView = new BaseView();
  t.equal(typeof baseView.getTemplate, 'function');
  t.equal(baseView.getTemplate()(), tpl);
});
