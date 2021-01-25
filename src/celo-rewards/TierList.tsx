import * as React from "react";
import { Li, Ul } from "src/fonts/Fonts";
import { NameSpaces, useTranslation } from "src/i18n";
import { B, P } from "./stylingElements";

interface Props {
  baseTranslation: string;
  totalTiers: number;
}

function TierList({ baseTranslation, totalTiers }: Props) {
  const { t } = useTranslation(NameSpaces.celoRewards);

  const listItems = [];
  for (let i = 1; i <= totalTiers; i++) {
    listItems.push({
      title: t(`${baseTranslation}.tier${i}.title`),
      body: t(`${baseTranslation}.tier${i}.body`),
    });
  }

  return (
    <Ul>
      {listItems.map((item) => (
        <Li key={item.title}>
          <P>
            <B>{item.title}</B>
            {"\n"}
            {item.body}
          </P>
        </Li>
      ))}
    </Ul>
  );
}

export default TierList;
