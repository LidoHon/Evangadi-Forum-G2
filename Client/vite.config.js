import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Joining and reading keys and certificate for the server
const privateKeyPath = path.join(__dirname, '../private-key-no-passphrase.pem');
const certificatePath = path.join(__dirname, '../certificate.pem');
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		https: false,
		port: 5173, // Port for Vite development server
		cors: {
			origin: 'https://localhost:5000', //  backend URL
			credentials: true,
		},
	},
});
