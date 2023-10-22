const Navbar = ({ children }: any) => {
	return (
		<div>
			<nav className="bg-gray-800 p-4 h-15 max-w-lg">
				<div className="container mx-auto flex justify-end items-center">
					<ul className="flex space-x-4">
						<a href="/">
							<li className="text-white">Home</li>
						</a>

						<a href="/matches">
							<li className="text-white">Mathces</li>
						</a>
					</ul>
				</div>
			</nav>
			<div className=" mx-auto text-center">{children}</div>
		</div>
	);
};

export default Navbar;
