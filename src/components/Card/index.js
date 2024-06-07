const Card = ({ imageUrl, name, location }) => {
  return (
    <div className="flex flex-row items-center px-6">
      <img
        className="m-4 rounded-xl"
        src={imageUrl}
        alt={name}
        draggable={false}
      />
      <div className="flex flex-col justify-center px-2 font-gelion">
        <span className="font-bold text-[19px] text-[#292B36]">{name}</span>
        <div className="flex gap-2">    
          <img src = "/union.svg" />
          <span className="text-[17px] text-[#A8A9AE]">{location}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;