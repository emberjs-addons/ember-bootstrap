abort "Please use Ruby 1.9 to build Ember.js!" if RUBY_VERSION !~ /^1\.9/

require "bundler/setup"
require "erb"
require 'rake-pipeline'
require "colored"

def pipeline
  Rake::Pipeline::Project.new("Assetfile")
end

def setup_uploader
  require 'github_downloads'
  uploader = GithubDownloads::Uploader.new
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

def update_version
  require "versionomy"
  version = File.open("VERSION", "rb").read.strip!
  Versionomy.parse(version).bump(:tiny)
end

desc "Release current source and bump to new version"
task :release, [:new_version] => :dist do |t, args|
  # Release this version
  version = File.open("VERSION", "rb").read.strip!
  puts "Releasing new version #{version}"
  system "git tag v#{version}"
  system "git push --tags"

  # Upload minified first, so non-minified shows up on top
  uploader = setup_uploader
  upload_file(uploader, "ember-bootstrap-#{version}.min.js", "Ember Bootstrap v#{version} (minified)", "dist/ember-bootstrap.min.js")
  upload_file(uploader, "ember-bootstrap-#{version}.js", "Ember Bootstrap v#{version}", "dist/ember-bootstrap.js")

  # Bump to new version
  version = args[:new_version] || update_version
  File.open("VERSION", "w") {|f| f.write(version)}
  system "git commit VERSION -m 'Bumped to new version v#{version}'"
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
