import React from "react";
import { ProfileChip, ProfilesChipContainer } from "./style";
import useTooltip from "../../hooks/useTooltip";
import { Tooltip } from "../Tooltip";

export type ProfilePicture = {
  image: string;
  name: string;
};

interface ProfilesClipProps {
  profiles: ProfilePicture[];
}

export const ProfilesClip = ({ profiles }: ProfilesClipProps) => {
  const tooltip = useTooltip(getTooltipContent(profiles));

  return (
    <ProfilesChipContainer {...tooltip}>
      {profiles.map((profile, i) => {
        return (
          <ProfileChip
            key={i}
            draggable={false}
            src={profile.image}
            alt={profile.name}
            left={i}
          />
        );
      })}
      <Tooltip />
    </ProfilesChipContainer>
  );
};

const getTooltipContent = (profiles: ProfilePicture[]) => {
  let value = "";

  const names = profiles.map(x => {
    return x.name;
  });

  if (profiles.length > 2) {
    value = `${names[0]}, ${names[1]} and ${profiles.length - 2} more`;
  } else {
    value =
      names.length === 1
        ? names[0]
        : [
            names.slice(0, names.length - 1).join(", "),
            names[names.length - 1]
          ].join(" and ");
  }

  return value;
};
