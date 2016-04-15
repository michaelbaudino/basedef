defmodule Basedef.BoardChannel do
  use Phoenix.Channel

  alias Basedef.Repo
  alias Basedef.Board
  alias Basedef.Project

  def join("boards:" <> _private_room_id, _message, socket) do
    {:ok, socket}
  end

  def handle_in("create_project", %{"name" => name}, socket) do
    "boards:" <> board_name = socket.topic
    board = Repo.get_by!(Board, name: board_name)
    changeset = Project.changeset(%Project{}, %{name: name, board_id: board.id})
    case Repo.insert(changeset) do
      {:ok, project} ->
        broadcast! socket, "new_project", %{name: project.name}
        {:noreply, socket}
      {:error, changeset} ->
        errors = changeset.errors |> Enum.map(&extrapolate_error_message/1) |> Enum.into(%{})
        {:reply, {:error, errors}, socket}
    end
  end

  intercept ["new_project"]

  def handle_out("new_project", %{name: name}, socket) do
    push socket, "new_project", %{name: name |> Phoenix.HTML.html_escape |> Phoenix.HTML.safe_to_string}
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
