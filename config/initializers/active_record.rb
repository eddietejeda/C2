ActiveRecord::Base.logger = Logger.new(STDOUT) unless ENV["RAILS_ENV"] == "test"
