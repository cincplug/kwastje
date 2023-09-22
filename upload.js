const FtpClient = require('basic-ftp');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config(); // Laad omgevingsvariabelen uit het .env-bestand

async function uploadToFTP() {
  const client = new FtpClient.Client();

  try {
    const host = process.env.FTP_HOST;
    const username = process.env.FTP_USER;

    // Hier gebruiken we altijd het pad naar de build-map
    const buildPath = path.join(__dirname, 'build');

    await client.access({
      host,
      user: username,
      password: process.env.FTP_PASS, // Voeg FTP-wachtwoord toe aan je .env-bestand
      secure: false,
    });

    await client.uploadFromDir(buildPath, process.env.FTP_REMOTE_PATH);

    console.log('Upload voltooid!');
  } catch (error) {
    console.error('Er is een fout opgetreden:', error);
  } finally {
    client.close();
  }
}

uploadToFTP();
