import ContentLoader from 'react-content-loader';

type SkeletonProps = {};

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  return (
    <div className="pizza-block-wrapper">
      <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={476}
        viewBox="0 0 280 476"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <circle cx="140" cy="140" r="120" />
        <rect x="0" y="275" rx="4" ry="4" width="280" height="16" />
        <rect x="0" y="310" rx="10" ry="10" width="280" height="84" />
        <rect x="144" y="414" rx="22" ry="22" width="133" height="44" />
        <rect x="0" y="422" rx="4" ry="4" width="98" height="27" />
      </ContentLoader>
    </div>
  );
};
