// Loaders for JSON data

// Loader for Skill
/*export function loadSkill(skillName: string): Skill {
  return BasicSkillLib[skillName];
}*/

/*
// Used to get the color of a Skill
export function getColor(
  element: Skill | Card,
  status?: ActionTileStatus
): string {
  const skillCat = loadActionCategory(element.abilityCategory);
  switch (status) {
    case undefined:
      return skillCat.color;
    case ActionTileStatus.Avalaible:
      return skillCat.color;
    case ActionTileStatus.Clicked:
      return skillCat.clickedColor;
    case ActionTileStatus.Exhausted:
      return skillCat.exhaustedColor;
    default:
      return skillCat.color;
  }
}

export function getBasicSkill(category: ActionCategoryName): Skill {
  let basicSkill: Skill;
  Object.keys(BasicSkillLib).forEach((skillName: string) => {
    const currSkill: Skill = BasicSkillLib[skillName];
    if (currSkill.abilityCategory === category) {
      basicSkill = { ...currSkill };
    }
  });
  return basicSkill!;
}
*/
