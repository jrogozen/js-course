require 'sinatra'
require 'sinatra/reloader'

get '/' do
  send_file 'index.html'
end

set :bind, "0.0.0.0";