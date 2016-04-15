defmodule Basedef.Project do
  use Basedef.Web, :model

  schema "projects" do
    field :name, :string
    belongs_to :board, Basedef.Board

    timestamps
  end

  @required_fields ~w(name board_id)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:name, min: 1)
    |> unique_constraint(:name_board_id)
  end
end
