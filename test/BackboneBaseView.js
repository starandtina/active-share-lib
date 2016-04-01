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

test('BackboneBaseView#render', function (t) {
  t.plan(2);

  var tpl = '<h1>template</h1>';
  let BaseView = BackboneBaseView.extend({
    render: function () {
      this.$el.html(tpl);

      return this;
    }
  });

  let baseView = new BaseView();

  baseView.render();

  t.equal(typeof baseView.render, 'function');
  t.equal(baseView.$el.html(), tpl);
});
