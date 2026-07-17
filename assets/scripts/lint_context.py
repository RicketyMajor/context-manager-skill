import os
import re
import sys

# La ruta asume que el script se ejecuta desde la raíz del proyecto
CONTEXT_DIR = "context"

def check_links():
    # Expresión regular para enlaces Markdown: [texto](ruta)
    link_pattern = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')
    errors_found = False

    for root, _, files in os.walk(CONTEXT_DIR):
        for file in files:
            if file.endswith(".md"):
                filepath = os.path.join(root, file)
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                links = link_pattern.findall(content)
                for text, link in links:
                    # Ignorar URLs de internet o anclajes internos de página
                    if link.startswith("http") or link.startswith("#"):
                        continue
                    
                    # Resolver la ruta relativa respecto al archivo actual
                    target_path = os.path.normpath(os.path.join(root, link))
                    
                    if not os.path.exists(target_path):
                        print(f"Enlace roto detectado en '{filepath}': [{text}]({link})")
                        errors_found = True

    if errors_found:
        print("\nContext-Linter: Se encontraron referencias rotas. El Agente debe corregirlas.")
        sys.exit(1)
    else:
        print("\nContext-Linter: Todos los enlaces internos de /context están intactos.")
        sys.exit(0)

if __name__ == "__main__":
    if not os.path.exists(CONTEXT_DIR):
        print(f"\nError: El directorio /{CONTEXT_DIR} no existe en la raíz.")
        sys.exit(1)
    check_links()