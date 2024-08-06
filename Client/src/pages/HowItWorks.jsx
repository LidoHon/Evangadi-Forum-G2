import React from 'react';

const HowItWorks = () => {
	return (
		<div className="container mx-auto bg-white rounded-md shadow-2xl mt-10 border-4 border-orange-700">
			<h1 style={styles.header}>How It Works</h1>
			<section style={styles.section}>
				<h2 style={styles.subheader}>Project Overview</h2>
				<p style={styles.paragraph}>
					Welcome to our Student Forum! This platform is designed to facilitate
					knowledge sharing among students. Here, students can ask questions,
					provide answers, and engage in meaningful discussions. Our goal is to
					create a collaborative environment where students can learn from each
					other and enhance their understanding of various topics.
				</p>
			</section>

			<section style={styles.section}>
				<h2 style={styles.subheader}>Features</h2>
				<ul style={styles.list}>
					<li>Browse and search through a list of questions.</li>
					<li>Save questions to your personal list for easy access later.</li>
					<li>Engage with the community by asking and answering questions.</li>
					<li>Receive updates as new questions and answers are posted.</li>
				</ul>
			</section>

			<section style={styles.section}>
				<h2 style={styles.subheader}>Contribute to Our Project</h2>
				<p style={styles.paragraph}>
					We welcome contributions from the community! If you're interested in
					helping us improve this platform, you can access our source code on
					GitHub and submit pull requests with your enhancements.
				</p>
				<a
					href="https://github.com/LidoHon/Evangadi-Forum-G2"
					target="_blank"
					rel="noopener noreferrer"
					style={styles.link}
				>
					View on GitHub
				</a>
			</section>

			<section style={styles.section}>
				<h2 style={styles.subheader}>Report Bugs and Issues</h2>
				<p style={styles.paragraph}>
					If you encounter any bugs or have suggestions for improvement, please
					reach out to us. Your feedback is invaluable in helping us enhance the
					platform.
				</p>
				<p style={styles.paragraph}>
					You can report issues or get in touch with us via email:
				</p>
				<ul style={styles.list}>
					<li>
						<a href="mailto:support@studentforum.com" style={styles.link}>
							support@studentforum.com
						</a>
					</li>
					<li>
						<a href="mailto:developer@studentforum.com" style={styles.link}>
							developer@studentforum.com
						</a>
					</li>
				</ul>
			</section>
		</div>
	);
};

const styles = {
	container: {
		padding: '20px',
		maxWidth: '800px',
		margin: '0 auto',
		fontFamily: 'Arial, sans-serif',
		lineHeight: '1.6',
	},
	header: {
		textAlign: 'center',
		fontSize: '36px',
		marginBottom: '20px',
	},
	subheader: {
		fontSize: '24px',
		marginBottom: '10px',
	},
	paragraph: {
		marginBottom: '10px',
	},
	list: {
		marginBottom: '20px',
	},
	link: {
		color: '#007BFF',
		textDecoration: 'none',
	},
};

export default HowItWorks;
