const PreviewCard = ({ imageUrl, name, location }) => {
  return (
    <div className="flex flex-row items-center px-2 bg-white">
      <img
        className="m-2 w-[32px] rounded-md"
        src={imageUrl}
        alt={name}
        draggable={false}
      />
      <span className="p-2 font-bold font-gelion text-[17px] text-[#292B36]">{name}</span>
    </div>
  );
};

export default PreviewCard;