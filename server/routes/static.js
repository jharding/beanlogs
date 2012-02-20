var controller = module.exports;

controller.homepage = function(req, res) {
  res.render('index.jade', { title: 'My Site' });
};
