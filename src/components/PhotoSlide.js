import MotionSection from './MotionSection';
import SectionPhoto from './SectionPhoto';
import { CardOrnaments } from './Ornament';

function PhotoSlide({ children, photoSrc, textZone = 'center', className = '', stagger = true, ...props }) {
  const isPlain = !photoSrc;

  return (
    <div
      className={`invite-slide ${isPlain ? 'invite-slide--plain' : ''} invite-slide--${textZone} ${className}`.trim()}
    >
      {photoSrc ? <SectionPhoto src={photoSrc} /> : null}
      <CardOrnaments />
      <MotionSection className="invite-slide__text" stagger={stagger} {...props}>
        <div className="invite-slide__text-inner">{children}</div>
      </MotionSection>
    </div>
  );
}

export default PhotoSlide;
