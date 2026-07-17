#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// La ruta original de tu skill (dentro del paquete npm/git)
const skillSourceDir = path.join(__dirname, '..');
// La ruta donde el usuario está ejecutando el comando
const targetDir = process.cwd();
const contextDir = path.join(targetDir, 'context-manager-skill');

console.log('Instalando Context-Manager Skill...');

// Función recursiva para copiar directorios
function copyDirectory(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    let entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        // Evitar copiar carpetas innecesarias como node_modules o .git
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'bin') continue;

        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

try {
    copyDirectory(skillSourceDir, contextDir);
    console.log('Archivos de la skill copiados exitosamente.');

    // Hacer ejecutables los hooks de git si existen
    const hooksDir = path.join(contextDir, 'assets', 'hooks');
    if (fs.existsSync(hooksDir)) {
        execSync(`chmod +x ${path.join(hooksDir, '*')}`);
        console.log('Git hooks configurados con permisos de ejecución.');
    }

    console.log('¡Context-Manager instalado! Pide a tu agente que lea el SKILL.md para comenzar.');
} catch (error) {
    console.error('Error durante la instalación:', error.message);
    process.exit(1);
}