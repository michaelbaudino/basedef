defmodule Basedef.BoardController do
  use Basedef.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def show(conn, %{"id" => id}) do
    conn
    |> assign(:board_id, id)
    |> render("show.html")
  end

  def create(conn, %{"id" => id}) do
    redirect conn, to: board_path(conn, :show, id)
  end
end
