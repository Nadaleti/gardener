import React, { useState, FunctionComponent } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

import plantTypeImageMapper from './plantTypeImageMapper';

import classes from './PlantCard.module.scss';

interface PlantCardProps {
  title: string;
  plantType: { name: string, iconPath: string };
  location: string;
}

const PlantCard: FunctionComponent<PlantCardProps> = (props) => {
  const [opened, setOpened] = useState(false);

  const cardClasses = [classes.PlantCard];
  if (opened) cardClasses.push(classes.Opened);

  return (
    <div className={cardClasses.join(' ')}>
      <div className={classes.PlantImage}
        style={{ backgroundImage: `url('${plantTypeImageMapper.get(props.plantType.name)}')`, backgroundSize: '100%' }}></div>
      <div className={classes.PlantInfo} onClick={() => setOpened(!opened)}>
        <header className={classes.Info}>
          <h3>{props.title}</h3>
          {opened ?
            <FiChevronUp style={{ fontSize: '1.4rem', fontWeight: 'bold' }} /> :
            <FiChevronDown style={{ fontSize: '1.4rem', fontWeight: 'bold' }} />}
        </header>
        <div className={classes.MoreInfoPanel}>
          <hr style={{ width: '100%', border: 0, borderTop: '1px solid #dddddd', margin: '2px 0' }} />
          <span className={classes.AdditionalInfo}>
            <img src='http://localhost:3333/uploads/location.svg' alt='Location icon' className={classes.Icon} />
            {props.location}
          </span>
          <span className={classes.AdditionalInfo}>
            <img src={`http://localhost:3333${props.plantType.iconPath}`} alt={props.plantType.name} className={classes.Icon} />
            {props.plantType.name}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PlantCard;
