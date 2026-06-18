import { motion } from 'framer-motion';
import { sectionFade, staggerContainer, viewport } from '../motion/motionConfig';

function MotionSection({
  children,
  className = '',
  as = 'div',
  stagger = false,
  ...props
}) {
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger ? staggerContainer : sectionFade}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default MotionSection;
