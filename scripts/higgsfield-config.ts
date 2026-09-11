/* Chave para a geração de imagens pelo Higgsfield, servindo como ponte entre os prompts dos editores e os workers de geração. */

import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const CONFIG_PATH = path.join(process.cwd(), 'scripts/.higgsfield-config.yaml');

export interface ImageConfig {
  style: string;
  formats: {
    webp: {
      lossless: boolean;
      q: number;
      width: number;
      height: number;
    };
  };
}

function loadConfig(): ImageConfig {
  if (!fs.existsSync(CONFIG_PATH)) {
    const defaultConfig: ImageConfig = {
      style: "0",
      formats: {
        webp: { lossless: true, q: 85, width: 1280, height: 720 }
      }
    };
    fs.writeFileSync(CONFIG_PATH, yaml.stringify(defaultConfig));
    return defaultConfig;
  }
  const content = fs.readFileSync(CONFIG_PATH, 'utf8');
  return yaml.parse(content);
}

function saveConfig(config: ImageConfig): void {
  fs.writeFileSync(CONFIG_PATH, yaml.stringify(config));
}

export { loadConfig, saveConfig };
