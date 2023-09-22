const FtpClient = require("basic-ftp");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

async function clearRemoteDirectory() {
  const client = new FtpClient.Client();

  try {
    const host = process.env.FTP_HOST;
    const username = process.env.FTP_USER;
    const password = process.env.FTP_PASS;

    await client.access({
      host,
      user: username,
      password,
      secure: false,
    });

    const remotePath = process.env.FTP_REMOTE_PATH;
    const buildPath = path.join(__dirname, 'build');

    await client.cd(remotePath);

    const currentRemoteDir = await client.pwd();
    console.log(`Huidige remote directory is: ${currentRemoteDir}`);

    await client.clearWorkingDir();
    console.log(`Inhoud van de remote directory ${remotePath} is verwijderd.`);
    
    await client.uploadFromDir(buildPath, process.env.FTP_REMOTE_PATH);
    console.log(`Upload klaar, geef mij een appel.`);

  } catch (error) {
    console.error("Er is een fout opgetreden:", error);
  } finally {
    client.close();
  }
}

clearRemoteDirectory();
