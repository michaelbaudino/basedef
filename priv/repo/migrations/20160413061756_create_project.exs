defmodule Basedef.Repo.Migrations.CreateProject do
  use Ecto.Migration

  def change do
    create table(:projects) do
      add :name, :string
      add :board_id, references(:boards, on_delete: :nothing)

      timestamps
    end
    create index(:projects, [:board_id])

  end
end
