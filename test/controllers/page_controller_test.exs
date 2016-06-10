defmodule Basedef.PageControllerTest do
  use Basedef.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "BASEDEF"
  end
end
