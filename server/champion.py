"""Data models for the champion API."""

from enum import Enum

from pydantic import BaseModel, Field, field_validator


class Lane(str, Enum):
    TOP = "Top"
    JUNGLE = "Jungle"
    MID = "Mid"
    BOT = "Bot"
    SUPPORT = "Support"


class AttackRange(str, Enum):
    MELEE = "Melee"
    RANGED = "Ranged"


class DamageType(str, Enum):
    AD = "AD"
    AP = "AP"


class Champion(BaseModel):
    """A single champion as stored in leaguelist.json.

    ``damagetype`` is written as a comma-separated string in the data file
    ("AD, AP" for hybrids such as Kayle) and normalised to a list here.
    """

    name: str
    attack: AttackRange
    mana: bool
    lane: list[Lane]
    damagetype: list[DamageType]

    @field_validator("damagetype", mode="before")
    @classmethod
    def split_damage_types(cls, value: object) -> object:
        if isinstance(value, str):
            return [part.strip() for part in value.split(",") if part.strip()]
        return value


class ChampionQuery(BaseModel):
    """Filters sent by the client when rolling for a champion.

    An empty group means "no preference" rather than "match nothing", so a
    request with no filters at all rolls across the entire roster.
    """

    lane: Lane | None = Field(default=None, alias="Lane")
    attributes: list[str] = Field(default_factory=list, alias="Attributes")
    blacklist: list[str] = Field(default_factory=list, alias="Blacklist")

    model_config = {"populate_by_name": True}

    @field_validator("lane", mode="before")
    @classmethod
    def blank_lane_means_any(cls, value: object) -> object:
        """The client sends "" for a completely random roll."""
        return None if value == "" else value

    def matches(self, champ: Champion) -> bool:
        if self.lane is not None and self.lane not in champ.lane:
            return False
        if champ.name in self.blacklist:
            return False

        selected = set(self.attributes)

        damage_types = selected & {DamageType.AD, DamageType.AP}
        if damage_types and not damage_types.intersection(champ.damagetype):
            return False

        ranges = selected & {AttackRange.MELEE, AttackRange.RANGED}
        if ranges and champ.attack not in ranges:
            return False

        # "manaless" covers energy, fury, rage and the genuinely resourceless.
        mana_options = selected & {"Mana", "manaless"}
        if mana_options:
            wanted = "Mana" if champ.mana else "manaless"
            if wanted not in mana_options:
                return False

        return True
