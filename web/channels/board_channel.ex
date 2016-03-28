defmodule Basedef.BoardChannel do
  use Phoenix.Channel

  def join("boards:" <> _private_room_id, _message, socket) do
    {:ok, socket}
  end

  def handle_in("new_project", %{"name" => name}, socket) do
    broadcast! socket, "new_project", %{name: name}
    {:noreply, socket}
  end

  intercept ["new_project"]

  def handle_out("new_project", %{name: name}, socket) do
    push socket, "new_project", %{name: name |> Phoenix.HTML.html_escape |> Phoenix.HTML.safe_to_string}
    {:noreply, socket}
  end
end
