# Installing conversion tools on Windows

This guide covers installing the required CLI tools for Ultimate File Converter on Windows.

## Package managers

The easiest approach is to use **Chocolatey** or **Scoop** to install most dependencies.

### Using Chocolatey

```powershell
# Install Chocolatey first (if you don't have it)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install conversion tools
choco install imagemagick -y
choco install ffmpeg -y
choco install libreoffice-fresh -y
choco install poppler -y
choco install calibre -y
choco install 7zip -y
choco install tesseract -y
```

### Using Scoop

```powershell
# Install Scoop first (if you don't have it)
irm get.scoop.sh | iex

# Add extras bucket
scoop bucket add extras

# Install conversion tools
scoop install imagemagick
scoop install ffmpeg
scoop install libreoffice
scoop install poppler
scoop install calibre
scoop install 7zip
scoop install tesseract
```

## Redis

Redis is required for the job queue. You can:

1. **Use WSL2** (recommended):
   ```powershell
   wsl --install
   # Then inside WSL:
   sudo apt update
   sudo apt install redis-server
   redis-server
   ```

2. **Use Memurai** (Windows-native Redis alternative):
   ```powershell
   choco install memurai-developer -y
   ```

3. **Use a managed Redis service** (Redis Cloud, AWS ElastiCache, etc.) and set `REDIS_URL` in your `.env.local`.

## Verify installations

After installation, verify each tool is accessible:

```powershell
magick --version
ffmpeg -version
soffice --version
pdftotext -v
ebook-convert --version
7z
tesseract --version
```

## Troubleshooting

- **Path issues**: Ensure tools are added to your `PATH`. Restart your terminal after installation.
- **LibreOffice**: The command is `soffice` but may be located at `C:\Program Files\LibreOffice\program\soffice.exe`.
- **Tesseract**: Install language data packs if you need OCR for non-English text.

## Next steps

Once all tools are installed:

```powershell
npm install
npm run dev    # Terminal 1
npm run worker # Terminal 2
```

Visit http://localhost:3000 and start converting!
