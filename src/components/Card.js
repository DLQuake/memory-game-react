function Card({ item, handleSelectedCards, toggled, stopflip }) {
	return (
		<div className="item">
			<div className={toggled ? "toggled" : ""}>
				<img className="face" src={item.image} alt={item.name} />
				<div
					className="back"
					onClick={() => !stopflip && handleSelectedCards(item)}
				>
					{" "}
				</div>
			</div>
		</div>
	);
}

export default Card;
