import { Link } from "react-router-dom";

const Splash = () => {
	return (
		<section className="splash-container">
			<video
				src="https://streetsmart-safeassets.s3.amazonaws.com/diningout_broll.mp4"
				autoPlay={true}
				muted
				loop
				className="splash-bground-broll"
			></video>
			<div className="splash-content">
				<article className="prod-description">
					<h1 className="splash-title">Secret Spot</h1>
					<span>Find the best food spots, with friends!</span>
					<div className="splash-buttons">
						<Link to="/login">Login</Link>
						<Link to="/register">Sign Up</Link>
					</div>
				</article>
			</div>
		</section>
	);
};

export default Splash;
