# -*- encoding: utf-8 -*-
require './lib/ember/bootstrap/version'

Gem::Specification.new do |gem|
  gem.name          = "ember-bootstrap-source"
  gem.authors       = ["Damien Mathieu"]
  gem.email         = ["42@dmathieu.com"]
  gem.date          = Time.now.strftime("%Y-%m-%d")
  gem.summary       = %q{ember-bootstrap source code wrapper.}
  gem.description   = %q{ember-bootstrap source code wrapper for use with Ruby libs.}
  gem.homepage      = "https://github.com/emberjs-addons/ember-bootstrap"
  gem.version       = Ember::Bootstrap::VERSION

  gem.add_dependency "ember-source"

  gem.files = %w(VERSION) + Dir['dist/ember-bootstrap*.js', 'lib/ember/bootstrap/*.rb']
end
