defmodule Basedef.PageController do
  use Basedef.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
