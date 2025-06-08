import classes from './BadgeList.module.scss';
import { FC } from 'react';
import { AchievementsEmpty } from './AchievementsEmpty';
import { Achievement } from '@/shared/service/AchievementService';

interface BadgeListProps {
  achievements?: Achievement[];
}

export const BadgeList: FC<BadgeListProps> = ({ achievements }) => {
  if (!achievements || !achievements.length) return <AchievementsEmpty />;
  return (
    <div className={classes.gridContainer}>
      {achievements.map((achievement) => (
        <div key={achievement.id} className={classes.badgeItem}>
          <div className={classes.contentWrapper}>
            <img
              src={achievement.icon}
              alt={achievement.title}
              className={classes.image}
            />
            <div className={classes.textContainer}>
              <h3 className={classes.title}>{achievement.title}</h3>
              <p className={classes.description}>{achievement.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
