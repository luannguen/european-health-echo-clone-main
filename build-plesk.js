import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting Plesk build process...');

try {  // Step 1: Fix any JSX syntax issues in problematic files
  console.log('Fixing JSX syntax issues in problematic files...');
  const filePath = path.join(__dirname, 'src', 'pages', 'publications', 'EnergyEfficiencyReport.tsx');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace problematic > characters with JSX expressions
    // This targets specifically the problem in line 123 with (>10,000m²)
    content = content.replace(/\(>(\s*\d+[,.]?\d*m²)\)/g, '({">"}$1)');
    
    // Also handle any other potential > characters that might cause JSX parsing issues
    content = content.replace(/(\s)>(\s*\d+)/g, '$1{">"}$2');
    
    fs.writeFileSync(filePath, content);
    console.log('Fixed JSX syntax issues in EnergyEfficiencyReport.tsx');
  }

  // Step 2: Run the build command
  console.log('Building the application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Step 3: Create web.config file for IIS/Plesk
  console.log('Creating web.config file for Plesk...');
  const webConfigContent = `<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <mimeMap fileExtension=".json" mimeType="application/json" />
      <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
      <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" />
    </staticContent>
  </system.webServer>
</configuration>`;
  
  fs.writeFileSync(path.join(__dirname, 'dist', 'web.config'), webConfigContent);
  
  console.log('Build completed successfully!');
  console.log('Files are ready in the dist/ directory for upload to Plesk.');
  console.log('Make sure to upload everything in the dist/ directory to the root of your Plesk website.');
  
} catch (error) {
  console.error('Error during build process:', error);
  process.exit(1);
}
