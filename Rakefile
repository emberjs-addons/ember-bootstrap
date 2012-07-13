abort "Please use Ruby 1.9 to build Ember.js!" if RUBY_VERSION !~ /^1\.9/

require "bundler/setup"
require "erb"
require 'rake-pipeline'
require "colored"

def pipeline
  Rake::Pipeline::Project.new("Assetfile")
end

def setup_uploader
  require './lib/github_uploader'

  # get the github user name
  login = `git config github.user`.chomp

  # get repo from git config's origin url
  origin = `git config remote.origin.url`.chomp # url to origin
  # extract USERNAME/REPO_NAME
  # sample urls: https://github.com/emberjs/ember.js.git
  #              git://github.com/emberjs/ember.js.git
  #              git@github.com:emberjs/ember.js.git
  #              git@github.com:emberjs/ember.js

  repoUrl = origin.match(/github\.com[\/:]((.+?)\/(.+?))(\.git)?$/)
  username = repoUrl[2] # username part of origin url
  repo = repoUrl[3] # repository name part of origin url

  token = ENV["GH_OAUTH_TOKEN"]
  uploader = GithubUploader.new(login, username, repo, token)
  uploader.authorize

  uploader
end

def upload_file(uploader, filename, description, file)
  print "Uploading #{filename}..."
  if uploader.upload_file(filename, description, file)
    puts "Success"
  else
    puts "Failure"
  end
end

desc "Strip trailing whitespace for JavaScript files in packages"
task :strip_whitespace do
  Dir["packages/**/*.js"].each do |name|
    body = File.read(name)
    File.open(name, "w") do |file|
      file.write body.gsub(/ +\n/, "\n")
    end
  end
end

desc "Build ember-bootstrap.js"
task :dist do
  puts "Building Ember Bootstrap..."
  pipeline.invoke
  puts "Done"
end

desc "Clean build artifacts from previous builds"
task :clean do
  puts "Cleaning build..."
  pipeline.clean
  puts "Done"
end

desc "Upload latest Ember Bootstrap build to GitHub repository"
task :upload_latest => :dist do
  uploader = setup_uploader

  # Upload minified first, so non-minified shows up on top
  upload_file(uploader, 'ember-bootstrap-latest.min.js', "Ember Bootstrap Master (minified)", "dist/ember-bootstrap.min.js")
  upload_file(uploader, 'ember-bootstrap-latest.js', "Ember Bootstrap Master", "dist/ember-bootstrap.js")
end

desc "Run tests with phantomjs"
task :test, [:suite] => :dist do |t, args|
  unless system("which phantomjs > /dev/null 2>&1")
    abort "PhantomJS is not installed. Download from http://phantomjs.org"
  end

  suites = {
    :default => ["package=all"],
    :all => ["package=all"]
  }

  if ENV['TEST']
    opts = [ENV['TEST']]
  else
    suite = args[:suite] || :default
    opts = suites[suite.to_sym]
  end

  unless opts
    abort "No suite named: #{suite}"
  end

  cmd = opts.map do |opt|
    "phantomjs tests/qunit/run-qunit.js \"file://localhost#{File.dirname(__FILE__)}/tests/index.html?#{opt}\""
  end.join(' && ')

  # Run the tests
  puts "Running: #{opts.join(", ")}"
  success = system(cmd)

  if success
    puts "Tests Passed".green
  else
    puts "Tests Failed".red
    exit(1)
  end
end

desc "Automatically run tests (Mac OS X only)"
task :autotest do
  system("kicker -e 'rake test' packages")
end

task :default => :dist
