#!/bin/bash
# Context-Manager: Pre-commit Hook

# Detecta si hay cambios en archivos de código fuente (ajusta las extensiones según tu stack)
CODE_CHANGED=$(git diff --cached --name-only | grep -E '\.(js|ts|py|go|rs|java|cpp|c|h|cs)$')

# Detecta si se modificó el log de decisiones o algún spec
CONTEXT_CHANGED=$(git diff --cached --name-only | grep -E '^context/(decisions/log\.md|specs/)')

if [ -n "$CODE_CHANGED" ] && [ -z "$CONTEXT_CHANGED" ]; then
    echo "====================================================================="
    echo "CONTEXT MANAGER WARNING"
    echo "Estás a punto de hacer un commit con cambios de código, pero no has"
    echo "actualizado la carpeta /context."
    echo ""
    echo "¿Tomaste alguna decisión arquitectónica o avanzaste en un spec?"
    echo "-> Si es así, dile al agente que actualice /context/decisions/log.md"
    echo "-> Si es un cambio menor o un typo, usa: git commit --no-verify"
    echo "====================================================================="
    exit 1
fi

exit 0