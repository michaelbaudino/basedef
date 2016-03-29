defmodule Basedef.BoardView do
  use Basedef.Web, :view

  def haikunator do
    adjective = Enum.random(haikunator_adjectives)
    noun      = Enum.random(haikunator_nouns)
    number    = String.rjust(to_string(:random.uniform(9999)), 4, ?0)
    "#{adjective}-#{noun}-#{number}"
  end

  defp haikunator_adjectives do
    ~w(
      autumn hidden bitter misty silent empty dry dark summer
      icy delicate quiet white cool spring winter patient
      twilight dawn crimson wispy weathered blue billowing
      broken cold damp falling frosty green long late lingering
      bold little morning muddy old red rough still small
      sparkling throbbing shy wandering withered wild black
      young holy solitary fragrant aged snowy proud floral
      restless divine polished ancient purple lively nameless
    )
  end

  defp haikunator_nouns do
    ~w(
      waterfall river breeze moon rain wind sea morning
      snow lake sunset pine shadow leaf dawn glitter forest
      hill cloud meadow sun glade bird brook butterfly
      bush dew dust field fire flower firefly feather grass
      haze mountain night pond darkness snowflake silence
      sound sky shape surf thunder violet water wildflower
      wave water resonance sun wood dream cherry tree fog
      frost voice paper frog smoke star
    )
  end
end
