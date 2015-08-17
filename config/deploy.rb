# This defines a deployment "recipe" that you can feed to capistrano
# (http://manuals.rubyonrails.com/read/book/17). It allows you to automate
# (among other things) the deployment of your application.

require 'capistrano/ext/multistage'

set :stage, 'testing'
set :application, 'cms-prototype'
set :current_dir, 'cms-prototype'
set :version_dir, 'cms-prototype_releases'

set :aws_params, :region => 'eu-west-1'

set :deploy_to, '/var/www'
set :user, 'ubuntu'

set :scm, :none
set :repository, "."
set :copy_exclude, "**/.git"
set :use_sudo, false
set :deploy_via, :copy
set :copy_compression, :gz
set :keep_releases, 2
set :admin_runner, 'root'

ssh_options[:keys] = ENV['ssh_keys'] ? ENV['ssh_keys'] : %w(~/.ec2/agile_new.pem)
set :revision, ENV['BUILD_NUMBER']

# =============================================================================
# TASKS
# =============================================================================
namespace :deploy do
  after "deploy:update_code", :create_symlinks
  after "deploy:restart", "deploy:cleanup"

  task :finalize_update do
  end

  task :cleanup do
    run "cd #{releases_path} && ls -1t | grep -e '^[0-9]' | tail -n +5 | sudo xargs rm -rf"
  end
end

task :create_symlinks do
  run "ln -s /var/www/cms-prototype #{release_path}"
end