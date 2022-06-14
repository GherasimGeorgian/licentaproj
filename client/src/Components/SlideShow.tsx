import React, { useEffect, useState } from 'react';
import CarouselSlide from './CarouselSlide';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slide from '@mui/material/Slide';

export const SLIDE_INFO = [
  { backgroundColor: '#0c172b', id: '1' },
  { backgroundColor: '#0c172b', id: '2' },
  { backgroundColor: '#0c172b', id: '3' },
  { backgroundColor: '#0c172b', id: '4' },
  { backgroundColor: '#0c172b', id: '5' },
];

function Arrow(props:any) {
  const { direction, clickFunction } = props;
  const icon = direction === 'left' ? <FaChevronLeft /> : <FaChevronRight />;

  return <div onClick={clickFunction}>{icon}</div>;
}



interface Direction {
  slideDirection?: 'left' | 'right' | 'up' | 'down' | undefined;
}
export function SlideShow() {

  const [index, setIndex] = useState(0);
  const content = SLIDE_INFO[index];
  const numSlides = SLIDE_INFO.length;
  const [slideIn, setSlideIn] = useState(true);
  //const [slideDirection, setSlideDirection] = useState('down');

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);


 
  useEffect(() => {
    let interval:any = null;
    onArrowClick('left')
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 10000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const [slideDirection, setSlideDirection]= useState<Direction['slideDirection']>('down');

  const onArrowClick = (direction:Direction['slideDirection']) => {
    const increment = direction === 'left' ? -1 : 1;
    const newIndex = (index + increment + numSlides) % numSlides;

    const oppDirection = direction === 'left' ? 'right' : 'left';
    setSlideDirection(direction);
    setSlideIn(false);

    setTimeout(() => {
        setIndex(newIndex);
        setSlideDirection(oppDirection);
        setSlideIn(true);
    }, 500);
};

 
  return (
           <div className='slideshow'>
             <Arrow
                direction='left'
                clickFunction={() => onArrowClick('left')}
            />
            <Slide in={slideIn} direction={slideDirection}>
                <div>
                    <CarouselSlide content={content} />
                </div>
            </Slide>
            <Arrow
                direction='right'
                clickFunction={() => onArrowClick('right')}
            />
          </div>
  );
}
