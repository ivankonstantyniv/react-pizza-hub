import ContentLoader from 'react-content-loader';

type SkeletonProps = {};

const Skeleton: React.FC<SkeletonProps> = (props) => {
  const bodyWidth: number = document.body.clientWidth;

  return (
    <div className="pizza-block-wrapper">
      {bodyWidth > 768 ? (
        <ContentLoader
          speed={2}
          width={583}
          height={240}
          viewBox="0 0 583 240"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}>
          <circle cx="110" cy="110" r="110" />
          <rect x="274" y="64" rx="4" ry="4" width="280" height="14" />
          <rect x="274" y="0" rx="10" ry="10" width="300" height="43" />
          <rect x="274" y="85" rx="4" ry="4" width="280" height="14" />
        </ContentLoader>
      ) : (
        <ContentLoader
          speed={2}
          width={288}
          height={404}
          viewBox="0 0 288 404"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}>
          <circle cx="144" cy="110" r="110" />
          <rect x="0" y="340" rx="4" ry="4" width="280" height="14" />
          <rect x="0" y="280" rx="10" ry="10" width="288" height="43" />
          <rect x="0" y="361" rx="4" ry="4" width="280" height="14" />
        </ContentLoader>
      )}
    </div>
  );
};

export default Skeleton;
