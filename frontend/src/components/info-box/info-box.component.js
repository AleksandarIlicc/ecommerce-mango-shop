const InfoBox = ({ src, infoType, data }) => {
  return (
    <div className="dashboard__header-box">
      <figure className="dashboard__header-img">
        <img src={src} alt="Icon" />
      </figure>
      <div className="flex flex-col">
        <span className="font-semibold">{infoType}</span>
        <span className="text-[2rem] leading-none">{data}</span>
      </div>
    </div>
  );
};

export default InfoBox;
