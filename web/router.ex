defmodule Basedef.Router do
  use Basedef.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Basedef do
    pipe_through :browser # Use the default browser stack

    get "/", BoardController, :index
    get "/:id", BoardController, :show
  end
end
