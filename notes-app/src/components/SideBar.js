import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import field from '../assets/field.png';
import howl from '../assets/howl.png';
import ponyo from '../assets/ponyo.png';
import totoro from '../assets/totoro.png';
import spirited from '../assets/spirited.png';

const SideBar = ({ onAddNote }) => {
  const [showList, setShowList] = useState(false);

  const toggleList = () => {
    setShowList(!showList);
  };

  const imagesList = [
    {
      id: 1,
      src: field,
      alt: "Image 1",
      background: `url(${field})`
    },
    {
      id: 2,
      src: howl,
      alt: "Image 2",
      background: `url(${howl})`
    },
    {
      id: 3,
      src: ponyo,
      alt: "Image 3",
      background: `url(${ponyo})`
    },
    {
      id: 4,
      src: totoro,
      alt: "Image 4",
      background: `url(${totoro})`
    },
    {
      id: 5,
      src: spirited,
      alt: "Image 5",
      background: `url(${spirited})`
    }
  ];

  const handleImageClick = (image) => {
    onAddNote({
      id: image.id,
      text: "Click here to start typing....",
      date: new Date().toLocaleDateString(),
      background: image.background
    });
  };

  return (
    <div className='sidebar'> 
      <div onClick={toggleList}>
        <FontAwesomeIcon icon={faCirclePlus} size="3x" className='plus-icon'/>
      </div>
      {showList && (
        <ul className='sidebar-list'>
          {imagesList.map((image) => (
            <li key={image.id} onClick={() => handleImageClick(image)}>
              <img src={image.src} alt={image.alt} className='sidebar-list-item'/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SideBar;
