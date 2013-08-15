require 'nanoc3/tasks'

desc "Compile the site"
task :compile do
  `nanoc compile`
end

desc "Publish to http://dmathieu.com"
task publish: [:clean] do
  last_commit = `git log -1 --pretty=format:"%s"`.chomp.strip
  last_commit = 'Publishing content to GitHub pages.' if last_commit == ''
  mesg        = last_commit
  branch      = `git branch -a --contains \`git rev-parse HEAD\``.split("\n").map do |branch|
    branch.strip.gsub(/^(.*)origin\//, '').gsub('* ', '').gsub(/\((.*)\)/, '')
  end.uniq.delete_if(&:empty?)

  if branch.include?('master')

    FileUtils.rm_r('output') if File.exist?('output')

    sh "nanoc compile"

    ENV['GIT_DIR'] = File.expand_path(`git rev-parse --git-dir`.chomp)
    old_sha = `git rev-parse refs/remotes/origin/gh-pages`.chomp
    Dir.chdir('output') do
      ENV['GIT_INDEX_FILE'] = gif = '/tmp/dev.gh.i'
      ENV['GIT_WORK_TREE'] = Dir.pwd
      File.unlink(gif) if File.file?(gif)
      `git add -A`
      tsha = `git write-tree`.strip
      puts "Created tree   #{tsha}"
      if old_sha.size == 40
        csha = `git commit-tree #{tsha} -p #{old_sha} -m "#{mesg}"`.strip
      else
        csha = `git commit-tree #{tsha} -m "#{mesg}"`.strip
      end
      puts "Created commit #{csha}"
      puts `git show #{csha} --stat`
      puts "Updating gh-pages from #{old_sha}"
      `git update-ref refs/heads/gh-pages #{csha}`
      `git push origin gh-pages`
    end
  end
end

task test: [:clean] do
  sh "nanoc compile"

  site = Nanoc::Site.new('.')
  exit Nanoc::Extra::Checking::Runner.new(site).run_specific [:ilinks]
end
