defmodule Basedef.BoardChannel do
  use Phoenix.Channel
  import Ecto.Query
  import Ecto.Changeset

  alias Basedef.UserPresence
  alias Basedef.Repo
  alias Basedef.Board
  alias Basedef.Project

  def join("boards:" <> _private_room_id, params, socket) do
    send(self, :after_join)
    {:ok, assign(socket, :user_name, params["user_name"])}
  end

  def handle_info(:after_join, socket) do
    push socket, "presence_state", UserPresence.list(socket)
    {:ok, _} = UserPresence.track(socket, socket.assigns.user_name, %{
      online_at: inspect(System.system_time(:seconds))
    })
    {:noreply, socket}
  end

  def handle_in("create_project", %{"name" => name}, socket) do
    "boards:" <> board_id = socket.topic
    board = Repo.get(Board, board_id)
    changeset = Project.changeset(%Project{}, %{name: name, board_id: board.id})
    case Repo.insert(changeset) do
      {:ok, project} ->
        broadcast! socket, "project_created", project
        {:reply, {:ok, project |> Map.take([:id, :name])}, socket}
      {:error, changeset} ->
        {:reply, {:error, traverse_errors(changeset, &translate_errors/1)}, socket}
    end
  end

  def handle_in("delete_project", %{"id" => id}, socket) do
    project = Repo.get!(Project, id)
    case Repo.delete(project) do
      {:ok, project} ->
        broadcast! socket, "project_deleted", %{id: project.id, name: project.name}
        {:reply, {:ok, project |> Map.take([:id, :name])}, socket}
      {:error, changeset} ->
        {:reply, {:error, traverse_errors(changeset, &translate_errors/1)}, socket}
    end
  end

  def handle_in("list_projects", %{}, socket) do
    "boards:" <> board_id = socket.topic
    projects = Project |> where([p], p.board_id == ^board_id) |> select([p], %{id: p.id, name: p.name}) |> order_by([p], p.inserted_at) |> Repo.all
    {:reply, {:ok, %{projects: projects}}, socket}
  end

  intercept ["project_created"]

  def handle_out("project_created", %{id: id, name: name}, socket) do
    push socket, "project_created", %{id: id, name: name |> Phoenix.HTML.html_escape |> Phoenix.HTML.safe_to_string}
    {:noreply, socket}
  end

  defp translate_errors({msg, opts}), do: msg |> String.replace("%{count}", to_string(opts[:count]))
  defp translate_errors(msg),         do: msg
end
