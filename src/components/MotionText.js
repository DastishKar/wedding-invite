import { motion } from 'framer-motion';
import { fadeLeft, fadeRight, fadeUp } from '../motion/motionConfig';

const variantsMap = {
  up: fadeUp,
  left: fadeLeft,
  right: fadeRight,
};

function MotionText({ children, className = '', as = 'p', from = 'up', ...props }) {
  const Tag = motion[as] || motion.p;

  return (
    <Tag className={className} variants={variantsMap[from]} {...props}>
      {children}
    </Tag>
  );
}

export default MotionText;
