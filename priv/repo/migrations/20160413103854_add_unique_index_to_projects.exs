defmodule Basedef.Repo.Migrations.AddUniqueIndexToProjects do
  use Ecto.Migration

  def change do
    create index(:projects, [:name, :board_id], unique: true)
  end
end
