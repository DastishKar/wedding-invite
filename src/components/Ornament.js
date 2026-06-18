import { ReactComponent as OrnamentPattern } from '../assets/ornament-pattern.svg';

export function CardOrnaments() {
  return (
    <div className="card-ornaments" aria-hidden="true">
      <div className="rotating-ornament ornament-top-right">
        <OrnamentPattern />
      </div>
      <div className="rotating-ornament ornament-bottom-left">
        <OrnamentPattern />
      </div>
    </div>
  );
}

export default CardOrnaments;
