import { Steps } from 'antd';
import { useState } from 'react';
import { useWindowSize } from '../../../hooks/windowDimensions';

const Stepsportion = () => {
  const { width } = useWindowSize();
  const [current, setCurrent] = useState(0);

  const handleMouseEnter = (index) => {
    setCurrent(index);
  };

  const handleMouseLeave = () => {
    setCurrent(0);
  };

  const stepsData = [
    {
      description: 'Log in into PARU website.',
      title: 'Find a event',
      image: '/images/workflow1.jpg',
    },
    {
      description: 'Search the event.',
      title: 'Search event',
      image: '/images/workflow2.jpg',
    },
    {
      description: 'Choose and register the event you are interested in. ',
      title: 'Choose event',
      image: '/images/workflow3.png',
    },
  ];
  if (width > 900) {
    return (
      <div className="main-container mt-7">
        {' '}
        <div className="main-container mobile:hidden">
          <div className="container">
            <div className="flex gap-6 steps">
              <Steps progressDot direction="vertical">
                {stepsData.map((step, index) => (
                  <Steps.Step
                    key={index}
                    title={
                      <div
                        className={`cursor ${
                          index === current
                            ? 'text-[rgb(28,62,217)] text-2xl duration-300'
                            : 'text-2xl'
                        }`}
                      >
                        {step.title}
                      </div>
                    }
                    description={step.description}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    className={`${
                      index === current ? 'text-[rgb(28,62,217)]' : ''
                    } hover:text-[rgb(28,62,217)]`}
                  />
                ))}
              </Steps>
              <div className="flex duration-300 h-[402px] w-[541px]">
                <img
                  src={stepsData[current].image}
                  alt={`Step ${current + 1} - ${stepsData[current].title}`}
                  className="duration-300 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex items-center justify-center flex-col px-[80px]">
          <p className="text-[20px] font-bold">{stepsData[0]?.title}</p>
          <p className="text-center text-[16px]">{stepsData[0]?.description}</p>
          <img
            className="mb-[80px] w-[100%]"
            src={stepsData[0]?.image}
            alt="banner-one"
          />
        </div>
        <div className="flex items-center justify-center flex-col px-[80px]">
          <p className="text-[20px] font-bold">{stepsData[1]?.title}</p>
          <p className="text-center text-[16px]">{stepsData[1]?.description}</p>
          <img
            className="mb-[80px] w-[100%]"
            src={stepsData[1]?.image}
            alt="banner-one"
          />
        </div>
        <div className="flex items-center justify-center flex-col px-[80px]">
          <p className="text-[20px] font-bold">{stepsData[2]?.title}</p>
          <p className="text-center text-[16px]">{stepsData[2]?.description}</p>
          <img
            className="mb-[80px] w-[100%]"
            src={stepsData[2]?.image}
            alt="banner-one"
          />
        </div>
      </div>
    );
  }
};
export default Stepsportion;
