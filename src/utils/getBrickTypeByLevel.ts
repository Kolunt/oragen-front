import { LevelBrickType } from 'api/brickApi';
import { BrickLevelTypes } from 'enums';

export const getBrickTypeByLevel = (level: LevelBrickType) => {
  switch (level) {
    case 'low':
      return BrickLevelTypes.LOW;
    case 'medium':
      return BrickLevelTypes.MEDIUM;
    case 'high':
      return BrickLevelTypes.HIGH;
  }
};
