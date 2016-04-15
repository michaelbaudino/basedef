defmodule Basedef.BoardController do
  use Basedef.Web, :controller

  alias Basedef.Board
  alias Basedef.Project

  plug :scrub_params, "board" when action in [:create, :update]

  def index(conn, _params) do
    changeset = Board.changeset(%Board{})
    render(conn, "index.html", changeset: changeset)
  end

  def show(conn, %{"name" => name}) do
    board = Repo.get_by!(Board, name: name) |> Repo.preload(projects: from(p in Project, order_by: p.inserted_at))
    render(conn, "show.html", board: board)
  rescue Ecto.NoResultsError ->
    conn
    |> put_flash(:error, "Board not found.")
    |> redirect(to: board_path(conn, :index))
  end

  def create(conn, %{"board" => board_params}) do
    changeset = Board.changeset(%Board{}, board_params)
    case Repo.insert(changeset) do
      {:ok, board}        -> redirect(conn, to: board_path(conn, :show, board.name))
      {:error, changeset} -> render(conn, "index.html", changeset: changeset)
    end
  end
end
