import React from 'react';
import { FaLinkedin, FaGithub, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Teams = [
	{
		Name: 'Hailemariam',
		portfolio: 'https://www.technetworksite.com',
		github: 'https://github.com/Haileofficial',
		linkedin: 'https://www.linkedin.com/in/hailemariam-getachew-895b07246/',
		image:
			'https://t4.ftcdn.net/jpg/06/77/97/21/360_F_677972198_YWL97FgRrJE20ZNrf36LFGULuZccnxNT.jpg',
	},
	{
		Name: 'Henok',
		portfolio: 'https://www.johnsmith.tech',
		github: 'https://github.com/johnsmith',
		linkedin: 'https://www.linkedin.com/in/john-smith/',
		image: 'https://randomuser.me/api/portraits/men/2.jpg',
	},
	{
		Name: 'Kello',
		portfolio: 'https://www.johnsmith.tech',
		github: 'https://github.com/johnsmith',
		linkedin: 'https://www.linkedin.com/in/john-smith/',
		image: 'https://randomuser.me/api/portraits/men/2.jpg',
	},
	{
		Name: 'Lidet',
		portfolio: 'https://www.lidethonelign.com',
		github: 'https://github.com/LidoHon',
		linkedin: 'https://www.linkedin.com/in/lidet-honelign-00a8ba242/',
		image: 'https://randomuser.me/api/portraits/women/1.jpg',
	},
	{
		Name: 'Melat',
		portfolio: 'https://www.johnsmith.tech',
		github: 'https://github.com/johnsmith',
		linkedin: 'https://www.linkedin.com/in/john-smith/',
		image: 'https://randomuser.me/api/portraits/men/2.jpg',
	},
	{
		Name: 'Metadel',
		portfolio: 'https://www.johnsmith.tech',
		github: 'https://github.com/johnsmith',
		linkedin: 'https://www.linkedin.com/in/john-smith/',
		image: 'https://randomuser.me/api/portraits/men/2.jpg',
	},
	{
		Name: 'Nahom',
		portfolio: 'https://www.johnsmith.tech',
		github: 'https://github.com/johnsmith',
		linkedin: 'https://www.linkedin.com/in/john-smith/',
		image: 'https://randomuser.me/api/portraits/men/2.jpg',
	},
	{
		Name: 'Tsegaye',
		portfolio: 'https://www.johnsmith.tech',
		github: 'https://github.com/johnsmith',
		linkedin: 'https://www.linkedin.com/in/john-smith/',
		image: 'https://randomuser.me/api/portraits/men/2.jpg',
	},
	{
		Name: 'Abdi',
		portfolio: 'https://www.johnsmith.tech',
		github: 'https://github.com/johnsmith',
		linkedin: 'https://www.linkedin.com/in/john-smith/',
		image: 'https://randomuser.me/api/portraits/men/2.jpg',
	},
	{
		Name: 'Eduniya',
		portfolio: 'https://www.johnsmith.tech',
		github: 'https://github.com/johnsmith',
		linkedin: 'https://www.linkedin.com/in/john-smith/',
		image: 'https://randomuser.me/api/portraits/men/2.jpg',
	},
];

const HowItWorks = () => {
	return (
		<section className="container mx-auto bg-slate-50 py-10 px-6 md:px-12">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
					How It Works
				</h2>
				<p className="text-lg text-gray-600">
					Welcome to our Student Forum! This platform is designed to facilitate
					knowledge sharing among students. Here, students can ask questions,
					provide answers, and engage in meaningful discussions. Our goal is to
					create a collaborative environment where students can learn from each
					other and enhance their understanding of various topics.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
				<div className="space-y-4">
					<h3 className="text-2xl font-semibold text-gray-700">
						Project Overview
					</h3>
					<p className="text-gray-600">
						Welcome to our Student Forum! This platform is designed to
						facilitate knowledge sharing among students. Here, students can ask
						questions, provide answers, and engage in meaningful discussions.
						Our goal is to create a collaborative environment where students can
						learn from each other and enhance their understanding of various
						topics.
					</p>
				</div>

				<div className="space-y-4">
					<h3 className="text-2xl font-semibold text-gray-700">Features</h3>
					<ul className="list-disc list-inside space-y-2 text-gray-600">
						<li>Browse and search through a list of questions.</li>
						<li>Save questions to your personal list for easy access later.</li>
						<li>
							Engage with the community by asking and answering questions.
						</li>
						<li>Receive updates as new questions and answers are posted.</li>
					</ul>
				</div>
			</div>

			<div className="space-y-4 mb-12">
				<h3 className="text-2xl font-semibold text-gray-700">
					Contribute to Our Project
				</h3>
				<p className="text-gray-600">
					We welcome contributions from the community! If you're interested in
					helping us improve this platform, you can access our source code on
					GitHub and submit pull requests with your enhancements.
				</p>
				<a
					href="https://github.com/LidoHon/Evangadi-Forum-G2.git"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 hover:underline"
				>
					View on GitHub
				</a>
			</div>

			<div className="space-y-4">
				<h3 className="text-2xl font-semibold text-gray-700">
					Report Bugs and Issues
				</h3>
				<p className="text-gray-600">
					If you encounter any bugs or have suggestions for improvement, please
					reach out to us. Your feedback is invaluable in helping us enhance the
					platform.
				</p>
				<p className="text-gray-600">
					You can report issues or get in touch with us via email:
				</p>
				{/* <Link
					to="mailto:support@studentforum.com"
					className="text-blue-600 hover:underline"
				>
					support@studentforum.com
				</Link>
				<br />
				<a
					href="mailto:developer@studentforum.com"
					className="text-blue-600 hover:underline"
				>
					developer@studentforum.com
				</a> */}
			</div>

			<div className="flex flex-col ">
				<h1 className="text-center py-4 pt-5 font-bold text-gray-800 text-4xl">
					Meet The Team
				</h1>
				<p className="text-center text-gray-600 pb-5">
					Get to know the team behind this project.
				</p>

				<div className="max-w-5xl gap-5 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{Teams.map((team, index) => (
						<div key={index} className="bg-black/10 p-8 rounded-xl ">
							{/* <img
								className="h-20 mx-auto rounded-full"
								src={team.image}
								alt={`${team.Name}'s Profile`}
							/> */}
							<h4 className="text-xl font-light opacity-50 text-center mt-4">
								{team.Name}
							</h4>
							<div className="flex justify-center gap-4 mt-4">
								<a
									href={team.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-700 hover:text-blue-900"
								>
									<FaLinkedin size={24} />
								</a>
								<a
									href={team.github}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-700 hover:text-gray-900"
								>
									<FaGithub size={24} />
								</a>
								<a
									href={team.portfolio}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-600 hover:text-gray-800"
								>
									<FaUserTie size={24} />
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
