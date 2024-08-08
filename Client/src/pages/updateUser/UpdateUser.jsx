import React, { useEffect, useRef } from 'react';
import styles from './UpdateProfileForm.module.css';
import axios from '../../axiosConfig';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUser } from '../../Context/UserContext';

function UpdateUser() {
	const { setUsername } = useUser();

	const [username, SetUsername] = useState('');
	const [firstname, SetFirstname] = useState('');
	const [lastname, SetLastname] = useState('');
	const [email, SetEmail] = useState('');
	const [currentPassword, SetCurrentPassword] = useState('');
	const [newPassword, SetNewPassword] = useState('');
	const [retypeNewPassword, SetRetypeNewPassword] = useState('');
	const [message, Setmessage] = useState('');
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showRetypeNewPassword, setShowRetypeNewPassword] = useState(false);

	const FormSubmitHandler = async (e) => {
		e.preventDefault();

		const profiledata = {
			username,
			firstname,
			lastname,
			email,
			currentPassword,
			newPassword,
			retypeNewPassword,
		};

		try {
			const response = await axios.put('/users/profile', profiledata);
			// console.log('Profile updated successfully', response.data);
			if (response.data.msg === 'Profile updated successfully') {
				setUsername(username);
				toast.success('Profile updated successfully');
			}
			if (response.data.msg === 'Password changed sucesfully') {
				toast.success('Password changed sucesfully');
			}
		} catch (error) {
			Setmessage(error.response.data.msg);
			console.error(
				'Error updating profile:',
				error.response ? error.response.data : error.message
			);
			if (
				error.response.data.msg ===
				'Please make sure you have entered all required fields.'
			) {
				toast.error('Please make sure you have entered all required fields.');
			}

			if (
				error.response.data.msg ===
				'Please make sure you have entered all required fields.'
			) {
				toast.error(
					'To change the password, provide current password, new password, and retype your new password.'
				);
			}

			if (
				error.response.data.msg ===
				'To change your password, please provide your new password.'
			) {
				toast.error(
					'To change your current password, please provide your new password.'
				);
			}

			if (
				error.response.data.msg ===
				'New password must be longer than 8 characters'
			) {
				toast.error('New password must be longer than 8 characters.');
			}

			if (
				error.response.data.msg ===
				'New password and retype new password do not match'
			) {
				toast.error('Your new password and retyped password does not match.');
			}

			if (error.response.data.msg === 'Current password is incorrect') {
				toast.error('Your current password is incorrect');
			}
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.profileUpdate}>
				<h2 className={`${styles.profileText} lg:text-2xl font-semibold pb-4`}>
					Update Profile
				</h2>

				<form className={styles.form} onSubmit={FormSubmitHandler}>
					<div className={styles.formGroup}>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => SetEmail(e.target.value)}
							className={styles.input}
						/>
					</div>
					<div className={styles.formGroup}>
						<input
							type="text"
							placeholder="First Name"
							value={firstname}
							onChange={(e) => SetFirstname(e.target.value)}
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							value={lastname}
							onChange={(e) => SetLastname(e.target.value)}
							className={styles.input}
						/>
					</div>
					<div className={styles.formGroup}>
						<input
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => SetUsername(e.target.value)}
							className={styles.input}
						/>
					</div>
					<button type="submit" className={`${styles.button} bg-orange-800 hover:bg-orange-700`}>
						Update
					</button>
				</form>
			</div>
			<div className={styles.passwordChange}>
				<h2
					className={`${styles.passwrodText} lg:text-2xl font-semibold pb-4 `}
				>
					Use this field if you would like to change your password
				</h2>
				<form className={styles.form} onSubmit={FormSubmitHandler}>
					<div className="relative">
						<input
							type={showCurrentPassword ? 'text' : 'password'}
							placeholder="Current Password"
							value={currentPassword}
							onChange={(e) => SetCurrentPassword(e.target.value)}
							className="w-full px-4 py-2 pr-12 border rounded-md"
						/>
						<button
							type="button"
							className="absolute inset-y-0 right-0 flex items-center px-3"
							onClick={() => setShowCurrentPassword(!showCurrentPassword)}
						>
							{showCurrentPassword ? (
								<FaEyeSlash size={20} />
							) : (
								<FaEye size={20} />
							)}
						</button>
					</div>
					<div className="relative mt-4">
						<input
							type={showNewPassword ? 'text' : 'password'}
							placeholder="New Password"
							value={newPassword}
							onChange={(e) => SetNewPassword(e.target.value)}
							className="w-full px-4 py-2 pr-12 border rounded-md"
						/>
						<button
							type="button"
							className="absolute inset-y-0 right-0 flex items-center px-3"
							onClick={() => setShowNewPassword(!showNewPassword)}
						>
							{showNewPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
						</button>
					</div>
					<div className="relative mt-4">
						<input
							type={showRetypeNewPassword ? 'text' : 'password'}
							placeholder="Retype New Password"
							value={retypeNewPassword}
							onChange={(e) => SetRetypeNewPassword(e.target.value)}
							className="w-full px-4 py-2 pr-12 border rounded-md"
						/>
						<button
							type="button"
							className="absolute inset-y-0 right-0 flex items-center px-3"
							onClick={() => setShowRetypeNewPassword(!showRetypeNewPassword)}
						>
							{showRetypeNewPassword ? (
								<FaEyeSlash size={20} />
							) : (
								<FaEye size={20} />
							)}
						</button>
					</div>
					<button type="submit" className={`${styles.button} bg-orange-800 bg-orange-700`}>
						Change Password
					</button>
				</form>
			</div>
			<ToastContainer />
		</div>
	);
}

export default UpdateUser;
