defmodule Basedef.BoardChannel do
  use Phoenix.Channel
  import Ecto.Query

  alias Basedef.Repo
  alias Basedef.Board
  alias Basedef.Project

  def join("boards:" <> _private_room_id, _message, socket) do
    {:ok, socket}
  end

  def handle_in("create_project", %{"name" => name}, socket) do
    "boards:" <> board_id = socket.topic
    board = Repo.get(Board, board_id)
    changeset = Project.changeset(%Project{}, %{name: name, board_id: board.id})
    case Repo.insert(changeset) do
      {:ok, project} ->
        broadcast! socket, "project_added", %{id: project.id, name: project.name}
        {:reply, {:ok, %{}}, socket}
      {:error, changeset} ->
        errors = changeset.errors |> Enum.map(&extrapolate_error_message/1) |> Enum.into(%{})
        {:reply, {:error, errors}, socket}
    end
  end

  def handle_in("delete_project", %{"name" => name}, socket) do
    "boards:" <> board_id = socket.topic
    project = Repo.get_by(Project, %{board_id: board_id, name: name})
    case Repo.delete(project) do
      {:ok, model} ->
        broadcast! socket, "project_deleted", %{id: project.id}
        {:reply, {:ok, %{}}, socket}
      {:error, changeset} ->
        errors = changeset.errors |> Enum.map(&extrapolate_error_message/1) |> Enum.into(%{})
        {:reply, {:error, errors}, socket}
    end
  end

  def handle_in("list_projects", %{}, socket) do
    "boards:" <> board_id = socket.topic
    projects = Project |> where([p], p.board_id == ^board_id) |> select([p], %{id: p.id, name: p.name}) |> order_by([p], p.inserted_at) |> Repo.all
    {:reply, {:ok, %{projects: projects}}, socket}
  end

  intercept ["project_added"]

  def handle_out("project_added", %{id: id, name: name}, socket) do
    push socket, "project_added", %{id: id, name: name |> Phoenix.HTML.html_escape |> Phoenix.HTML.safe_to_string}
    {:noreply, socket}
  end

  defp extrapolate_error_message({field, reason}) when is_tuple(reason) do
    {message, values} = reason
    extrapolated_reason = Enum.reduce values, message, fn {k, v}, acc ->
      String.replace(acc, "%{#{k}}", to_string(v))
    end
    {field, extrapolated_reason}
  end

  defp extrapolate_error_message({field, reason}) do
    {field, reason}
  end
end
