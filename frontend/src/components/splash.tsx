import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { loginUser, registerUser } from "../utils/user_api";
import LoginSignup from "./loginSignup";
const Splash = () => {
	const [open, setOpen] = useState(false);
	const [modal, setModal] = useState("");
	const backgroundVideoRef = useRef<HTMLVideoElement>(null);

	const handleOpen = (formType: string) => {
		setModal(formType);
		setOpen(!open);
	};

	return (
		<>
			<div className="absolute top-0 bottom-0 w-full h-full overflow-hidden">
				<motion.video
					src="http://localhost:3000/api/assets/intro-broll.mp4"
					animate={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					transition={{ delay: 0.15, duration: 0.75 }}
					autoPlay={true}
					muted
					loop
					ref={backgroundVideoRef}
					playsInline
					preload="true"
					onContextMenu={(e) => e.preventDefault()}
					className="absolute top-0 left-0 w-screen h-screen overflow-hidden z-0 m-0 min-w-screen min-h-screen object-cover"
				></motion.video>
			</div>
			<motion.div
				animate={{ opacity: 1 }}
				initial={{ opacity: 0 }}
				className="relative m-auto text-center z-1 text-white top-44 overflow-hidden"
			>
				<div className="flex flex-col items-center justify-center">
					<article className="bg-black bg-opacity-40 flex flex-col items-center justify-center mx-auto rounded-xl pt-15 pb-11 px-20">
						<h1 className="font-h1 text-9xl mt-5 mb-5 font-thin">
							Secret Spot
						</h1>
						<span className="text-xl">
							Find the best food spots, with friends!
						</span>
						<div className="flex gap-2 justify-center mt-5">
							<Button
								variant="outlined"
								size="md"
								color="white"
								ripple={false}
								onClick={() => handleOpen("Login")}
								className="border-2"
							>
								Login
							</Button>
							<Button
								variant="outlined"
								size="md"
								color="white"
								ripple={false}
								onClick={() => handleOpen("Register")}
								className="border-2"
							>
								Sign Up
							</Button>
							<LoginSignup
								action={modal == "Login" ? loginUser : registerUser}
								formType={modal}
								setModal={setModal}
								setOpen={setOpen}
								open={open}
							></LoginSignup>
						</div>
					</article>
				</div>
			</motion.div>
		</>
	);
};

export default Splash;
