import { twMerge } from 'tailwind-merge';

export default function Card({ 
  children, 
  title, 
  subtitle, 
  footer, 
  className, 
  headerAction 
}) {
  return (
    <div className={twMerge("bg-white rounded-xl shadow-sm border border-powder-blue overflow-hidden", className)}>
      {(title || subtitle || headerAction) && (
        <div className="px-6 py-5 border-b border-ice-blue flex items-center justify-between">
          <div>
            {title && <h3 className="text-lg font-bold text-deep-navy">{title}</h3>}
            {subtitle && <p className="text-sm text-sapphire mt-1">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="px-6 py-5">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-ice-blue/30 border-t border-ice-blue">
          {footer}
        </div>
      )}
    </div>
  );
}
